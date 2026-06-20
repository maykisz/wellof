import type { Metadata } from "next";
import ScrollToTopOnReload from "./components/ScrollToTopOnReload";
import "./globals.css";

export const metadata: Metadata = {
  title: "Well Of Hangar | Campo de Marte",
  description: "Landing page da Well Of no Campo de Marte, junto à CASP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ScrollToTopOnReload />
        {children}
      </body>
    </html>
  );
}
