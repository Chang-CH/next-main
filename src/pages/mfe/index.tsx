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

export default function Home() {
  console.log("button", ReactButton);
  return (
    <div>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <p>be</p>
      {/* <ReactRemoteComponent></ReactRemoteComponent> */}
      <ReactButton />
      <p>aft</p>
    </div>
  );
}
