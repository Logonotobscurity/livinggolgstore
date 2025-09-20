
import React from 'react';
import { Icons } from '@/components/icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  shareTitle: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareUrl, shareTitle }) => {
  const { toast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
        onClose();
      } catch (error: any) {
        // Do not show an error if the user cancels the share sheet
        if (error.name === 'AbortError') {
          return;
        }
        console.error('Error sharing:', error);
        toast({
            variant: 'destructive',
            title: 'Could not share',
            description: 'There was an error trying to share this product.',
        })
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
        toast({
            title: 'Link Copied!',
            description: 'Product link copied to your clipboard.',
        });
      onClose();
    }, (err) => {
        console.error('Could not copy text: ', err);
        toast({
            variant: 'destructive',
            title: 'Could not copy link',
            description: 'There was an error trying to copy the link.',
        })
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-secondary text-foreground max-w-sm p-8">
            <DialogHeader>
                <DialogTitle className="text-2xl font-headline text-center mb-6">Share This Product</DialogTitle>
            </DialogHeader>
            <div className="flex justify-around items-center gap-4">
                <Button variant="outline" onClick={handleShare} className="flex-1">
                    <Icons.share className="w-5 h-5 mr-2" />
                    <span>Share</span>
                </Button>
                <Button variant="outline" onClick={handleCopy} className="flex-1">
                    <Icons.copy className="w-5 h-5 mr-2" />
                    <span>Copy Link</span>
                </Button>
            </div>
             <DialogClose asChild>
                <Button variant="ghost" className="mt-4 w-full">Close</Button>
            </DialogClose>
        </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
