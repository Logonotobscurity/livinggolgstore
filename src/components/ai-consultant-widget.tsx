
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { AIConsultant } from '@/components/ai-consultant';
import { Icons } from './icons';
import { useResponsive } from '@/hooks/use-responsive';

export default function AIConsultantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useResponsive();

  const renderContent = () => (
    <AIConsultant onResults={() => setIsOpen(false)} />
  );

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 h-16 w-16 rounded-full shadow-2xl"
        aria-label="Open AI Lighting Consultant"
      >
        <Icons.lightbulb className="h-8 w-8" />
      </Button>

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
