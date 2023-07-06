import "./global.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  //@ts-ignore
  weight: "variable",
});

export const metadata = {
  title: "C2H",
  description: "C2H",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable}`}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          minWidth: "100vw",
          position: "relative",
          fontFamily: "var(--font-montserrat)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
