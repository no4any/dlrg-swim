import type { Metadata } from "next";
import "./print.scss";

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
      <body>{children}</body>
    </html>
  );
}
