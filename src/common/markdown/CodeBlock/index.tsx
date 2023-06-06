import { Highlight, themes } from "prism-react-renderer";
import React from "react";

const CodeBlock = (props: { children?: React.ReactNode }) => {
  if (
    !props?.children ||
    typeof props.children === "string" ||
    typeof props.children === "number" ||
    typeof props.children === "boolean"
  ) {
    return <pre>{props?.children ?? ""}</pre>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const childProps: {
    className?: string;
    children: string;
    [key: string]: any;
    // @ts-ignore
  } = props?.children?.props;
  const className: string = childProps?.className ?? "";
  const matches = className.match(/language-(?<lang>.*)/);

  const showLineNumbers = Boolean(childProps?.lineNumbers);
  return (
    <Highlight
      // {...defaultProps}
      code={childProps?.children?.trim()}
      language={
        matches && matches.groups && matches?.groups?.lang
          ? matches?.groups?.lang
          : ""
      }
      theme={themes.vsDark}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            ...style,
            padding: "20px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            width: "100%",
          }}
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
