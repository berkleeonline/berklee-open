import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { Button, Tooltip } from "@heroui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faHeart, faBookmark } from '@fortawesome/pro-light-svg-icons';
import { faHeart as faHeartSolid, faBookmark as faBookmarkSolid } from '@fortawesome/pro-solid-svg-icons';

import { addFavorite, favoriteStore, removeFavorite } from '../stores/favorites';

interface AddToLibraryButtonProps {
  headerId: string;
  type: string;
  hrefId: string;
  [key: string]: any; // To accept any additional props
}

export const AddToLibraryButton: FC<AddToLibraryButtonProps> = ({ headerId, type, hrefId }) => {
  const $favorites = useStore(favoriteStore);

  const [icon, setIcon] = useState<IconDefinition>(faBookmark);
  const [tooltip, setTooltip] = useState<string>('Add to Library');

  useEffect(() => {
    if (hrefId in $favorites) {
      setIcon(faBookmarkSolid);
      setTooltip('Remove from Library');
    }
  }, [$favorites]);

  const onClickAddToLibrary = async ({ headerId, type, hrefId }: AddToLibraryButtonProps) => {
    if (hrefId in $favorites) {
      await removeFavorite(hrefId);
      setIcon(faBookmark);
      setTooltip('Add to Library');
    } else {
      await addFavorite(hrefId, type);
      setIcon(faBookmarkSolid);
      setTooltip('Remove from Library');
    }
  };

  return (
    <div className="bg-white rounded-full shadow-xl">
      <Tooltip client:load  placement="bottom" content={tooltip} color="default">
        <Button client:load isIconOnly className="p-2" radius="full" variant="bordered" color="default" aria-label={tooltip} onPress={() => onClickAddToLibrary({ headerId, type, hrefId })}>
          <FontAwesomeIcon icon={icon} />
        </Button>
      </Tooltip>
    </div>
  );
};
