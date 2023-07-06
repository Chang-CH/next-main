import { MDXProvider } from "@mdx-js/react";

const components = {
  p: Text,
};

export default function Post(props) {
  return (
    <MDXProvider components={components}>
      <main {...props} />
    </MDXProvider>
  );
}
