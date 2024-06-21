import React from 'react';
import { Button, Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/pro-light-svg-icons';

interface ShareButtonProps {
  headerId: string;
  type: string;
  href: string;
  [key: string]: any; // To accept any additional props
}

export const ShareButton: FC<ShareButtonProps> = ({ headerId, type, href, ...props }) => {
  return (
    <>
    <Tooltip client:load  placement="bottom" content="Share" color="default">
      <Button client:load isIconOnly className="p-2" radius="full" variant="bordered" color="default" aria-label="Share">
        <FontAwesomeIcon icon={faShare} />
      </Button>
    </Tooltip>
    </>
  );
};