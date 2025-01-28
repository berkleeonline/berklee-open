import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { Button, Tooltip } from "@heroui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faHeart } from '@fortawesome/pro-light-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/pro-solid-svg-icons';

import { addFavorite, favoriteStore, removeFavorite } from '../stores/favorites';

interface AddToLibraryButtonProps {
  headerId: string;
  type: string;
  hrefId: string;
  [key: string]: any; // To accept any additional props
}

export const AddToLibraryButton: FC<AddToLibraryButtonProps> = ({ headerId, type, hrefId }) => {
  const $favorites = useStore(favoriteStore);

  const [icon, setIcon] = useState<IconDefinition>(faHeart);
  const [tooltip, setTooltip] = useState<string>('Add to Library');

  useEffect(() => {
    if (hrefId in $favorites) {
      setIcon(faHeartSolid);
      setTooltip('Remove from Library');
    }
  }, [$favorites]);

  const onClickAddToLibrary = async ({ headerId, type, hrefId }: AddToLibraryButtonProps) => {
    if (hrefId in $favorites) {
      await removeFavorite(hrefId);
      setIcon(faHeart);
      setTooltip('Add to Library');
    } else {
      await addFavorite(hrefId, type.endsWith('s') ? type.substring(0, type.length - 1) : type);
      setIcon(faHeartSolid);
      setTooltip('Remove from Library');
    }
  };

  return (
    <div className="bg-white rounded-full shadow-xl">
      <Tooltip client:load  placement="bottom" content={tooltip} color="default">
        <Button client:load isIconOnly className="p-2" radius="full" variant="bordered" color="default" aria-label={tooltip} onClick={() => onClickAddToLibrary({ headerId, type, hrefId })}>
          <FontAwesomeIcon icon={icon} />
        </Button>
      </Tooltip>
    </div>
  );
};
