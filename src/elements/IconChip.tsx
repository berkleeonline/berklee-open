import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip } from '@nextui-org/chip';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import styles from './IconChip.module.scss'; // Import the CSS module

interface IconChipProps {
  icon: IconProp;
  label: string;
  contentType?: string;
  size?: SizeProp;
  [key: string]: any; // To accept any additional props
}

export const IconChip: FC<IconChipProps> = ({ icon, label, contentType, size = 'sm', ...props }) => {
  return (
    <Chip {...props} className={styles.iconChip} type={contentType}>
      <FontAwesomeIcon icon={icon} size={size} /> 
      <div>{label}</div>
    </Chip>
  );
};
