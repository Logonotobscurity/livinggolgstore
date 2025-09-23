
'use client';

import { useState } from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { AIConsultant } from '@/components/ai-consultant';
import { Icons } from './icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type SpeedDialAction = {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
};

export default function SpeedDialWidget() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const { isMobile } = useResponsive();
  const businessPhoneNumber = '+2347011131333';
  const whatsappUrl = `https://wa.me/${businessPhoneNumber}?text=${encodeURIComponent("Hello Living Gold, I have a question.")}`;

  const actions: SpeedDialAction[] = [
    {
      id: 'ai',
      label: 'AI Lighting Consultant',
      icon: <Icons.lightbulb className="h-6 w-6" />,
      action: () => setIsAiModalOpen(true),
    },
    {
      id: 'whatsapp',
      label: 'Chat on WhatsApp',
      icon: <Icons.whatsapp className="h-6 w-6" />,
      action: () => window.open(whatsappUrl, '_blank'),
    },
    {
      id: 'support',
      label: 'Contact Support',
      icon: <Icons.helpCircle className="h-6 w-6" />,
      action: () => {
        // This requires Next.js navigation, which is a bit tricky from a non-component function
        // For now, we'll use window location, but for a real app, use Next's router
        window.location.href = '/contact';
      },
    },
    // The chatbot icon is included but has no action for now
    {
      id: 'chatbot',
      label: 'Chatbot (Coming Soon)',
      icon: <Icons.messageCircle className="h-6 w-6" />,
      action: () => {},
    },
  ];

  const renderAIConsultantModal = () => (
    isMobile ? (
      <Drawer open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
        <DrawerContent className="bg-secondary text-foreground p-4">
          <AIConsultant onResults={() => setIsAiModalOpen(false)} />
        </DrawerContent>
      </Drawer>
    ) : (
      <Dialog open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
        <DialogContent className="bg-secondary text-foreground max-w-2xl p-0">
          <AIConsultant onResults={() => setIsAiModalOpen(false)} />
        </DialogContent>
      </Dialog>
    )
  );

  return (
    <>
      <TooltipProvider>
        <div
          className="speed-dial-container"
          data-state={isMenuOpen ? 'open' : 'closed'}
        >
          <ul className="speed-dial-menu">
            {actions.map((action) => (
              <li key={action.id} className="speed-dial-item">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        action.action();
                        setIsMenuOpen(false);
                      }}
                      aria-label={action.label}
                    >
                      {action.icon}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{action.label}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="speed-dial-button"
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
          >
            <div className="speed-dial-icon-container">
              <Icons.plus className="h-6 w-6" />
            </div>
          </button>
        </div>
      </TooltipProvider>
      {renderAIConsultantModal()}
    </>
  );
}

// Add the new messageCircle icon to the Icons object
(Icons as any).messageCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
