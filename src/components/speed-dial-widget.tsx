
'use client';

import { useEffect, useRef, useState } from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { AIConsultant } from '@/components/ai-consultant';
import { Icons } from './icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { track } from '@/lib/analytics';
import { getStrings } from '@/lib/i18n';

type SpeedDialAction = {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  accent?: 'ai' | 'whatsapp' | 'support' | 'chatbot';
  badge?: string;
};

export default function SpeedDialWidget() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const { isMobile } = useResponsive();
  const businessPhoneNumber = '+2347011131333';
  const whatsappUrl = `https://wa.me/${businessPhoneNumber}?text=${encodeURIComponent("Hello Living Gold, I have a question.")}`;

  // One-time per-session intro hint for the trigger (already implemented below)
  const [hintOpen, setHintOpen] = useState(false);

  // Sequential, one-time guidance for action icons when the menu first opens
  const [guidanceActive, setGuidanceActive] = useState(false);
  const [guidanceIndex, setGuidanceIndex] = useState<number | null>(null);
  const GUIDANCE_KEY = 'speed_dial_guidance_done';

  const s = getStrings('en');

  const actions: SpeedDialAction[] = [
    {
      id: 'ai',
      label: s.actionAI,
      icon: <Icons.lightbulb className="h-6 w-6" />,
      action: () => setIsAiModalOpen(true),
      accent: 'ai',
    },
    {
      id: 'whatsapp',
      label: s.actionWhatsApp,
      icon: <Icons.whatsapp className="h-6 w-6" />,
      action: () => window.open(whatsappUrl, '_blank'),
      accent: 'whatsapp',
    },
    {
      id: 'support',
      label: s.actionSupport,
      icon: <Icons.helpCircle className="h-6 w-6" />,
      action: () => {
        window.location.href = '/contact';
      },
      accent: 'support',
    },
    {
      id: 'chatbot',
      label: s.actionChatbot,
      icon: <Icons.messageCircle className="h-6 w-6" />,
      action: () => {},
      accent: 'chatbot',
      badge: 'New',
    },
  ];

  const renderAIConsultantModal = () => (
    isMobile ? (
      <Drawer open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
        <DrawerContent className="bg-secondary text-foreground p-4">
          <AIConsultant />
        </DrawerContent>
      </Drawer>
    ) : (
      <Dialog open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
        <DialogContent className="bg-secondary text-foreground max-w-2xl p-0">
          <AIConsultant />
        </DialogContent>
      </Dialog>
    )
  );

  // Start the one-time guidance sequence when the menu opens, only once per session
  const startGuidance = () => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(GUIDANCE_KEY)) return;

    // Build the actual sequence in the same order we render, excluding hidden/future items
    const seq = (isMobile
      ? [...actions].sort((a, b) => (a.id === 'whatsapp' ? -1 : b.id === 'whatsapp' ? 1 : 0))
      : actions
    ).filter(a => a.id !== 'chatbot');

    if (seq.length === 0) return;

    setGuidanceActive(true);
    setGuidanceIndex(0);
    track('guidance.start');
    const timePer = isMobile ? 1200 : 1400; // ms per tooltip
    const timers: number[] = [];
    for (let i = 1; i <= seq.length; i++) {
      timers.push(window.setTimeout(() => {
        if (i < seq.length) {
          setGuidanceIndex(i);
          track('guidance.step', { index: i, id: seq[i].id });
        } else {
          setGuidanceActive(false);
          setGuidanceIndex(null);
          sessionStorage.setItem(GUIDANCE_KEY, 'true');
          track('guidance.complete', { steps: seq.map(a => a.id) });
        }
      }, i * timePer));
    }
  };

// Show one-time trigger hint
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const key = 'speed_dial_hint_shown';
    if (!sessionStorage.getItem(key)) {
      setHintOpen(true);
      sessionStorage.setItem(key, 'true');
      const t = setTimeout(() => setHintOpen(false), 2200);
      return () => clearTimeout(t);
    }
  }, []);

  // Key shortcut: toggle with "q"
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (e as any).isComposing) return;
      if (e.key.toLowerCase() === 'q') {
        setIsMenuOpen(prev => {
          const next = !prev;
          if (next) {
            track('speed_dial.open', { source: 'key' });
            startGuidance();
          } else {
            track('speed_dial.close');
          }
          return next;
        });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Mobile-only compact banner for discovery if user doesn't open menu
  const [bannerVisible, setBannerVisible] = useState(false);
  const BANNER_KEY = 'speed_dial_banner_shown';
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isMobile) return;
    if (sessionStorage.getItem(BANNER_KEY)) return;
    const t = window.setTimeout(() => {
      if (!isMenuOpen) {
        setBannerVisible(true);
        track('banner.impression');
      }
    }, 9000);
    return () => window.clearTimeout(t);
  }, [isMobile, isMenuOpen]);

  const openMenuWithGuidance = (source: 'trigger' | 'banner' | 'longpress' = 'trigger') => {
    if (source === 'banner') track('banner.open');
    setBannerVisible(false);
    sessionStorage.setItem(BANNER_KEY, 'true');
    const willOpen = !isMenuOpen;
    setIsMenuOpen(willOpen);
    if (willOpen) {
      track('speed_dial.open', { source });
      startGuidance();
    } else {
      track('speed_dial.close');
    }
  };

  // Determine menu order: prioritize WhatsApp on mobile
  const menuActions = isMobile
    ? [...actions].sort((a, b) => (a.id === 'whatsapp' ? -1 : b.id === 'whatsapp' ? 1 : 0))
    : actions;

  const menuOpen = isMenuOpen;

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.speed-dial-container')) {
        setIsMenuOpen(false);
        track('speed_dial.close');
      }
    };

    // Small delay to prevent immediate close on open
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <TooltipProvider>
        <div
          className="speed-dial-container"
          data-state={menuOpen ? 'open' : 'closed'}
        >
          <ul id="speed-dial-menu" className="speed-dial-menu">
            {menuActions.map((action, index) => {
              const controlled = guidanceActive ? { open: guidanceIndex === index } : {};
              return (
                <li key={action.id} className="speed-dial-item relative" style={{ '--i': index } as React.CSSProperties}>
                  <Tooltip {...controlled}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          track('action.click', { id: action.id });
                          action.action();
                          // Keep menu open after action
                        }}
                        aria-label={action.label}
                        data-accent={action.accent}
                      >
                        {action.icon}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side={isMobile ? 'top' : 'left'}>
                      <p>{action.label}</p>
                    </TooltipContent>
                  </Tooltip>
                  {isMobile && isMenuOpen && (
                    <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[10px] leading-none bg-background/80 px-2 py-1 rounded text-foreground border border-border shadow-sm whitespace-nowrap">
                      {action.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          {hintOpen ? (
            <Tooltip open onOpenChange={setHintOpen}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => openMenuWithGuidance('trigger')}
                  onTouchStart={(e) => {
                    // long-press to open
                    const target = e.currentTarget as HTMLButtonElement;
                    (target as any)._lp = window.setTimeout(() => openMenuWithGuidance('longpress'), 500);
                  }}
                  onTouchEnd={(e) => {
                    const target = e.currentTarget as any;
                    if (target._lp) window.clearTimeout(target._lp);
                  }}
                  onTouchMove={(e) => {
                    const target = e.currentTarget as any;
                    if (target._lp) window.clearTimeout(target._lp);
                  }}
                  className="speed-dial-button"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  aria-label={menuOpen ? s.triggerClose : s.triggerQuick}
                  aria-controls="speed-dial-menu"
                  aria-keyshortcuts="Q"
                >
                  {isMenuOpen && (
                    <div className="speed-dial-icon-container">
                      <Icons.xClose className="h-5 w-5" />
                    </div>
                  )}
                  <span className="text-sm font-medium tracking-wide">{menuOpen ? s.triggerClose : s.triggerQuick}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side={isMobile ? 'top' : 'left'}>
                <p>{s.triggerQuick}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => openMenuWithGuidance('trigger')}
                  onTouchStart={(e) => {
                    // long-press to open
                    const target = e.currentTarget as HTMLButtonElement;
                    (target as any)._lp = window.setTimeout(() => openMenuWithGuidance('longpress'), 500);
                  }}
                  onTouchEnd={(e) => {
                    const target = e.currentTarget as any;
                    if (target._lp) window.clearTimeout(target._lp);
                  }}
                  onTouchMove={(e) => {
                    const target = e.currentTarget as any;
                    if (target._lp) window.clearTimeout(target._lp);
                  }}
                  className="speed-dial-button"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  aria-label={menuOpen ? s.triggerClose : s.triggerQuick}
                  aria-controls="speed-dial-menu"
                  aria-keyshortcuts="Q"
                >
                  {isMenuOpen && (
                    <div className="speed-dial-icon-container">
                      <Icons.xClose className="h-5 w-5" />
                    </div>
                  )}
                  <span className="text-sm font-medium tracking-wide">{menuOpen ? s.triggerClose : s.triggerQuick}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side={isMobile ? 'top' : 'left'}>
                <p>{menuOpen ? s.triggerClose : s.triggerQuick}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TooltipProvider>

      {isMobile && bannerVisible && !isMenuOpen && (
        <div className="fixed left-1/2 -translate-x-1/2 z-40 bg-secondary text-foreground border border-border shadow-lg rounded-full px-4 py-2 flex items-center gap-3" style={{ bottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))' }}>
          <span className="text-xs">New: {s.triggerQuick}</span>
          <button className="text-xs underline" onClick={() => { setBannerVisible(false); sessionStorage.setItem(BANNER_KEY, 'true'); track('banner.dismiss'); }}>Dismiss</button>
          <button className="text-xs font-semibold" onClick={() => openMenuWithGuidance('banner')}>Open</button>
        </div>
      )}

      {renderAIConsultantModal()}
    </>
  );
}
