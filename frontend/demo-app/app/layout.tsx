import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Developer Standards Showcase",
  description: "Interactive walkthrough of the design token system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" data-theme="default">
      <body className="bg-background text-foreground" data-density="comfortable">
        {children}
      </body>
    </html>
  );
}
