import CodeBlock from "./CodeBlock";
import styles from "./s.module.css";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

const components: {
  [key: string]: React.ComponentType<any>;
} = {
  h1: props => <h1 className={styles.h1} {...props} />,
  h2: props => <h2 className={styles.h2} {...props} />,
  h3: props => <h3 className={styles.h3} {...props} />,
  p: props => <p className={styles.p} {...props} />,
  wrapper: Layout,
  pre: CodeBlock,
  code: props => <code className={styles.code} {...props} />,
  ol: props => <ol className={styles.ol} {...props} />,
  ul: props => <ul className={styles.ul} {...props} />,
};

export default components;
