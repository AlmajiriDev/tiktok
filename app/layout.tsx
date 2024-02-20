import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "TikTok Clone",
  description: "TikTok Clone by AlmajiriDev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
