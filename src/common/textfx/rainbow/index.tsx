import styles from "./styles.module.css";

const RainbowText = ({ children }: { children: React.ReactNode }) => {
  return <p className={styles.gradientText}>{children}</p>;
};

export default RainbowText;
