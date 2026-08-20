import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online | Freesia Academy",
  description: "Онлайн-навчання флористиці від Freesia Academy.",
  openGraph: {
    title: "Online | Freesia Academy",
    description: "Онлайн-навчання флористиці від Freesia Academy.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.prod.website-files.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.prod.website-files.com/6883334a2c2e5c0d3344a5e4/css/D76lzFt38IJM.css"
          crossOrigin="anonymous"
        />
        <link
          rel="icon"
          href="https://cdn.prod.website-files.com/6883334a2c2e5c0d3344a5e4/koFABjcAIxiD.png"
        />
      </head>
      <body className="f3efed">{children}</body>
    </html>
  );
}
