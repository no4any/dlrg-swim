import type { Metadata } from "next";import "./globals.css";


export const metadata: Metadata = {
  title: "24 Stunden Schwimmer",
  description: "24 Stunden Schwimmen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`bg-red text-white font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
