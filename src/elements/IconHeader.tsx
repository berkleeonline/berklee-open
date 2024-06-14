import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './IconHeader.module.scss'; // Import the CSS module


interface IconHeaderProps {
  headerId: string;
  icon: string;
  label: string;
  [key: string]: any; // To accept any additional props
}

export const IconHeader: FC<IconHeaderProps> = ({ headerId, icon, label, ...props }) => {
  return (
    <h2 id={headerId} className={`text-xl font-bold mb-4 iconHeader ${styles.iconHeader}`}><FontAwesomeIcon icon={icon} /> {label}</h2>
  );
};