import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DLRG Kreisgruppe Gießen e.V.",
  description: "DLRG Gießen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="bg-[url(/24h.jpg)] bg-cover bg-center bg-fixed">
        {children}
      </body>
    </html>
  );
}
