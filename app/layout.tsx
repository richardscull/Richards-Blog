import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/navbar";

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
      <body className="bg-neutral-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
