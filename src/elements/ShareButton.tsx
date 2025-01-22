import React, { useState, useEffect } from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faCheck, faCopy } from '@fortawesome/pro-light-svg-icons';

interface ShareButtonProps {
  headerId?: string;
  type: string;
  hrefId: string;
  [key: string]: any;
}

const getSingularType = (type: string): string => {
  return type.endsWith('s') ? type.slice(0, -1) : type;
};

const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const ShareButton: React.FC<ShareButtonProps> = ({ headerId, type, hrefId, ...props }) => {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setShareUrl(`${window.location.origin}/${type}/${hrefId}`);
    setCanShare(
      typeof navigator !== 'undefined' && 
      !!navigator.share && 
      isMobileDevice()
    );
  }, [type, hrefId]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation by the parent <AuthLink>
    e.stopPropagation(); // Stop event propagation to the parent
    setIsOpen((prev) => !prev); // Toggle popover
  };

  return (
    <div className="bg-white rounded-full relative">
      <Popover
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        placement="bottom"
        showArrow={true}
      >
        <PopoverTrigger>
          <Button
            isIconOnly
            className="p-2 shadow-xl"
            radius="full"
            variant="bordered"
            color="default"
            aria-label="Share"
            onMouseEnter={() => setShowTooltip(true)} // Show tooltip on hover
            onMouseLeave={() => setShowTooltip(false)} // Hide tooltip on mouse leave
            onPress={handleButtonClick} 
          >
            <FontAwesomeIcon icon={faShare} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4 w-80">
            <h3 className="text-lg font-semibold mb-2 text-left">
              Share {getSingularType(type)}
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 border rounded-md"
              />
              <Button
                onPress={handleCopy}
                isIconOnly
                className="p-2"
                radius="full"
                variant="bordered"
                color={copied ? "success" : "default"}
                aria-label={copied ? "Copied!" : "Copy link"}
              >
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {showTooltip && !isOpen && ( // Tooltip is shown only when hovering and popover is not open
        <div
          className="absolute z-50 px-2 py-1 bg-slate-800 text-white rounded-md whitespace-nowrap shadow-xl"
          style={{ top: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: 5000 }}
        >
          Share {getSingularType(type)}
        </div>
      )}
    </div>
  );
};

export default ShareButton;
