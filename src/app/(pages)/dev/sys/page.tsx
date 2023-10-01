// "use client";
import components, { Layout } from "@/common/mdx";
import Content from "./content.mdx";

export default function Page() {
  return <Content components={components} layout={Layout} />;
}
