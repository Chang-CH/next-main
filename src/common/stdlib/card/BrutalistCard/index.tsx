import styles from "./s.module.css";

const BrutalistCard = ({
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
      {children}
    </div>
  );
};

export default BrutalistCard;
