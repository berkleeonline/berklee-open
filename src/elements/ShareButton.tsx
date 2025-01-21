import React, { useState, useEffect } from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
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

// Helper to check if we're on a mobile device
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const ShareButton: FC<ShareButtonProps> = ({ headerId, type, hrefId, ...props }) => {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setShareUrl(`${window.location.origin}/${type}/${hrefId}`);
    // Only enable native sharing on mobile devices
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

  const handleMouseEnter = () => {
    if (!isOpen) {
      setShowTooltip(true);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (showTooltip) {
      setIsOpen(false);
      setShowTooltip(false);
    }
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (canShare && isMobileDevice()) {
      try {
        await navigator.share({
          title: `Check out this Berklee Open ${getSingularType(type)}`,
          url: shareUrl,
        });
      } catch (err) {
        // If user cancels share, don't show error
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
          // Fallback to popover if sharing fails
          setShowTooltip(false);
          setIsOpen(true);
        }
      }
    } else {
      // On desktop or when native sharing isn't available
      setShowTooltip(false);
      setIsOpen(true);
    }
  };

  return (
    <Popover 
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          setShowTooltip(false);
        }
        setIsOpen(open);
      }}
      placement="bottom"
      showArrow={true}
    >
      <PopoverTrigger>
        <Button
          isIconOnly
          className="p-2"
          radius="full"
          variant="bordered"
          color="default"
          aria-label="Share"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faShare} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {showTooltip ? (
          <div className="px-2 py-1">
            Share {getSingularType(type)}
          </div>
        ) : (
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
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ShareButton;