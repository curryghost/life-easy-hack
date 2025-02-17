import { LoaderCircle } from "lucide-react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        {children}
        <dialog
          className="absolute top-[calc(50%-50px)] left-[calc(50%-50px)] bg-background/0 overflow-hidden outline-0 backdrop:bg-black backdrop:opacity-70"
          id="spinner"
        >
          <LoaderCircle
            height={100}
            width={100}
            className="stroke-primary animate-spin"
          />
        </dialog>
      </body>
    </html>
  );
}
