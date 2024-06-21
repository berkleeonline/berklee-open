import React from 'react';
import { Button, Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShare } from '@fortawesome/pro-light-svg-icons';

interface AddToLibraryButtonProps {
  headerId: string;
  type: string;
  hrefId: string;
  [key: string]: any; // To accept any additional props
}

export const AddToLibraryButton: FC<AddToLibraryButtonProps> = ({ headerId, type, hrefId, ...props }) => {
  return (
    <>
      <Tooltip client:load  placement="bottom" content={`${type} ${hrefId}`} color="default">
        <Button client:load isIconOnly className="p-2" radius="full" variant="bordered" color="default" aria-label="Save to Library">
          <FontAwesomeIcon icon={faHeart} />
        </Button>
     </Tooltip>
    </>
  );
};