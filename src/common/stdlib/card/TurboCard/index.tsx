import styles from "./s.module.scss";

/**
 * Card with hover effect inspired by TurboRepo home page.
 */
const TurboCard = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  rest?: {
    [key: string]: any;
  };
}) => {
  return (
    <div
      className={
        className ? `${styles.container} ${className}` : styles.container
      }
      {...rest}
    >
      <div className={styles.edgeSpinner} />
      <div className={styles.divContent}>{children}</div>
    </div>
  );
};

export default TurboCard;
