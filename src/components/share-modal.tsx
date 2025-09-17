
import React from 'react';
import { Icons } from '@/components/icons';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  shareTitle: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareUrl, shareTitle }) => {
  if (!isOpen) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
        onClose();
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert(`Share this link: ${shareUrl}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link copied to clipboard!');
      onClose();
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
         onClick={onClose}>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm text-white"
           onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-4">Share This Product</h3>
        <div className="flex justify-around items-center">
          <button onClick={handleShare} className="flex flex-col items-center space-y-2">
            <Icons.share className="w-8 h-8" />
            <span>Share</span>
          </button>
          <button onClick={handleCopy} className="flex flex-col items-center space-y-2">
            <Icons.copy className="w-8 h-8" />
            <span>Copy Link</span>
          </button>
          <button onClick={onClose} className="flex flex-col items-center space-y-2">
            <Icons.close className="w-8 h-8" />
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
