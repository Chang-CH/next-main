import styles from "./s.module.css";
import DotsBg from "@/common/backgrounds/BackgroundDots";

const InnerPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>{children}</div>
      <DotsBg dotColour="#444" bgColour="#111" />
    </div>
  );
};

export default InnerPage;
