"use client";

import { Highlight } from "prism-react-renderer";
import React from "react";
import styles from "./s.module.scss";

const CodeBlock = (props: {
  children?: React.ReactElement<HTMLElement & { children: string }>;
}) => {
  if (
    !props?.children ||
    typeof props.children === "string" ||
    typeof props.children === "number" ||
    typeof props.children === "boolean"
  ) {
    return <pre>{props?.children}</pre>;
  }

  const CodeElement = props.children;
  const className: string = CodeElement.props?.className || "";
  const matches = className.match(/language-(?<lang>.*)/);

  const showLineNumbers = false;

  return (
    <Highlight
      code={CodeElement.props?.children?.trim()}
      language={
        matches && matches.groups && matches?.groups?.lang
          ? matches?.groups?.lang
          : ""
      }
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} ${styles.pre}`}
          style={style}
          //   width="80"
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {showLineNumbers && <span className="line-number">{i + 1}</span>}
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
