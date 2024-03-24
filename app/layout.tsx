/* eslint-disable @next/next/no-img-element */
import "./globals.css";
import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import Navbar from "./components/navbar";
import EmojisParser from "./components/7tvEmojis";
import Copyright from "@/app/components/copyright";

export const font = Source_Sans_3({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Richard's blog",
  description: "Funny blog about funny things",
  creator: "richardscull",
  openGraph: {
    images: [
      {
        url: "https://github.com/richardscull/RichardsBlog/blob/master/public/images/HuTaoLogo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <img
          src="/images/bg.png"
          alt="logo"
          width={1920}
          height={1080}
          className="-z-50 bg-cover w-full absolute background-img"
        />
        <EmojisParser />
        <Navbar />
        {children}
        <Copyright />
      </body>
    </html>
  );
}
