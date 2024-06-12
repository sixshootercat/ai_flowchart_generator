import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/app/components/header";

export const metadata = {
  title: "FlowchartAI",
  description:
    "Draw flowchart, sequence diagram, class diagram, user journey, gantt, C4C diagram with nature language.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-white font-sans text-slate-900 antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
