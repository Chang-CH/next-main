import { Montserrat } from "next/font/google";
import "./global.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  //@ts-ignore
  weight: "variable",
});

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: { [key: string]: any };
}) {
  return (
    <main className={montserrat.className}>
      <Component {...pageProps} />
    </main>
  );
}
