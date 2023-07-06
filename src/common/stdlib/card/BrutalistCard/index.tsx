import styles from "./s.module.css";

const BrutalistCard = ({
  children,
  className,
  style,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  style?: {
    [key: string]: any;
  };
  rest?: {
    [key: string]: any;
  };
}) => {
  return (
    <div
      className={
        className ? `${styles.container} ${className}` : styles.container
      }
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

export default BrutalistCard;
