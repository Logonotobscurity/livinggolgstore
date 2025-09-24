
'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { EnhancedAIConsultant } from '@/components/enhanced-ai-consultant';
import { Icons } from './icons';
import { useResponsive } from '@/hooks/use-responsive';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Always use the enhanced AI for a consistent, superior experience.
const USE_ENHANCED_AI = true;

export default function AIConsultantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useResponsive();

  const renderContent = () => (
    <EnhancedAIConsultant onResults={() => setIsOpen(false)} />
  );
  
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsOpen(true)}
              className="ai-widget-button"
              aria-label="Open AI Lighting Consultant"
            >
              <div className="ai-widget-button-pulse-ring"></div>
              <div className="ai-widget-button-pulse-ring"></div>
              <div className="ai-widget-button-pulse-ring"></div>
              <Icons.lightbulb className="h-8 w-8 ai-widget-icon" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
              <p>AI Lighting Consultant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="bg-secondary text-foreground p-4">
            {renderContent()}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-secondary text-foreground max-w-2xl p-0">
            {renderContent()}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
