import CodeBlock from "./CodeBlock";
import InlineCode from "./InlineCode";

export const mdxComponents = ({
  path = "",
  url = "",
}: {
  path: string;
  url: string;
}) => {
  return {
    pre: CodeBlock,
    code: InlineCode,
  };
};
