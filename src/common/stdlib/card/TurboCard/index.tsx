import styles from "./s.module.scss";

/**
 * Card with hover effect inspired by TurboRepo home page.
 */
const TurboCard = ({
  children,
  className,
  link,
  style,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  link?: string;
  style?: {
    [key: string]: any;
  };
  rest?: {
    [key: string]: any;
  };
}) => {
  return (
    <a href={link}>
      <div
        className={
          className ? `${styles.container} ${className}` : styles.container
        }
        style={style}
        {...rest}
      >
        <div className={styles.edgeSpinner} />
        <div className={styles.divContent}>{children}</div>
      </div>
    </a>
  );
};

export default TurboCard;
