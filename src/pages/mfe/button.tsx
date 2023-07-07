// @ts-nocheck
import dynamic from "next/dynamic";

const ReactButton = dynamic(
  () =>
    // eslint-disable-next-line import/no-unresolved
    import("reactButton/ReactButton").then(
      (r: { ReactButton: React.ReactNode }) => r.ReactButton
    ),
  {
    ssr: false,
  }
);

export default function Button() {
  console.log("button", ReactButton);
  return <ReactButton />;
}
