import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip } from '@nextui-org/chip';
import styles from './IconChip.module.scss'; // Import the CSS module

interface IconChipProps {
  icon: string;
  label: string;
  contentType?: string;
  size?: string;
  href?: string; // Adding href to props for the link
  [key: string]: any; // To accept any additional props
}

export const IconChip: FC<IconChipProps> = ({ icon, label, contentType, size = 'sm', href, ...props }) => {
  const chipContent = (
    <Chip {...props} className={styles.iconChip} type={contentType}>
      <FontAwesomeIcon icon={icon} size={size} />
      <div>{label}</div>
    </Chip>
  );

  return href ? (
    <a href={href} className="no-underline">
      {chipContent}
    </a>
  ) : (
    chipContent
  );
};
