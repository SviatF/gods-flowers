import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Online | Freesia Academy",
  description: "Онлайн-навчання флористиці від Freesia Academy.",
  icons: { icon: "/assets/koFABjcAIxiD.png" },
  openGraph: {
    title: "Online | Freesia Academy",
    description: "Онлайн-навчання флористиці від Freesia Academy.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className="w-mod-js" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/assets/css/site.css" />
      </head>
      <body className="f3efed">{children}</body>
    </html>
  );
}
