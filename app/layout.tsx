import type { Metadata } from "next";
import ScrollToTopOnReload from "./components/ScrollToTopOnReload";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://wellof.com.br"),
  title: "Well Of Hangar | FBO e Hangaragem no Campo de Marte",
  description:
    "Hangaragem, FBO e atendimento executivo no Campo de Marte, em São Paulo, com acesso alinhado junto a equipe Well Of.",
  openGraph: {
    title: "Well Of Hangar | Campo de Marte",
    description:
      "Hangaragem, FBO e atendimento executivo no Campo de Marte, em São Paulo.",
    images: ["/hero/wellof-hero-hangar-night.webp"],
  },
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
        <WhatsAppButton />
      </body>
    </html>
  );
}
