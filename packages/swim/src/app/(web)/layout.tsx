import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "DLRG Gießen: 24 Stunden Schwimmen",
  description: "Verwaltungsseite für das 24 Stunden schwimmen der DLRG Gießen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="font-sans bg-gradient-to-r from-dlrg-red from-25% via-dlrg-red to-dlrg-blue">{children}</body>
    </html>
  );
}
