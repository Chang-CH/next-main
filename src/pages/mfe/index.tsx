// @ts-nocheck
import dynamic from "next/dynamic";

// const ReactRemoteComponent = dynamic(() => import('remote/Nav'), {
//   ssr: false,
// });

// eslint-disable-next-line import/no-unresolved
const ReactButton = dynamic(() => import("reactButton/ReactButton"), {
  ssr: false,
});

export default function Home() {
  console.log(ReactButton);
  return (
    <div>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <p>be</p>
      {/* <ReactRemoteComponent></ReactRemoteComponent> */}
      <ReactButton></ReactButton>
      <p>aft</p>
    </div>
  );
}
