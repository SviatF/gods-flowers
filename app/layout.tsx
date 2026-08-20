import type { Metadata } from "next";
import "./styles/webflow-1.css";
import "./styles/webflow-2.css";
import "./styles/webflow-3.css";
import "./styles/webflow-4.css";
import "./styles/webflow-5.css";
import "./styles/webflow-6.css";
import "./styles/webflow-7.css";
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
        <link rel="icon" type="image/png" href="/assets/gods-flowers-logo.png" />
        <link rel="apple-touch-icon" href="/assets/gods-flowers-logo.png" />
      </head>
      <body className="f3efed">{children}</body>
    </html>
  );
}
