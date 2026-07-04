import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Race Planning Cockpit",
  description: "Technical foundation for the Race Planning Cockpit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
