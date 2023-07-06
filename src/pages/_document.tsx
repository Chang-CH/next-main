import { Head, Html, Main, NextScript } from "next/document";

export const metadata = {
  title: "C2H",
  description: "C2H",
};

export default function Document() {
  return (
    <Html lang="en">
      <Head title={metadata.title}></Head>
      <body
        className={`font-sans flex flex-col min-h-screen min-w-full relative`}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
