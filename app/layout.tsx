import type { Metadata } from "next";
import ScrollToTopOnReload from "./components/ScrollToTopOnReload";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://wellof.com.br"),
  title: "Well Of Hangar | FBO e Hangaragem no Campo de Marte",
  description:
    "Hangaragem, FBO e atendimento executivo no Campo de Marte, em São Paulo, com acesso alinhado junto à equipe Well Of.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Well Of Hangar",
    title: "Well Of Hangar | Campo de Marte",
    description:
      "Hangaragem, FBO e atendimento executivo no Campo de Marte, em São Paulo.",
    images: [
      {
        url: "/hero/wellof-hero-hangar-night.webp",
        width: 1200,
        height: 630,
        alt: "Hangar Well Of no Campo de Marte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Well Of Hangar | Campo de Marte",
    description:
      "Hangaragem, FBO e atendimento executivo no Campo de Marte, em São Paulo.",
    images: ["/hero/wellof-hero-hangar-night.webp"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Well Of Hangar",
  image: "https://wellof.com.br/hero/wellof-hero-hangar-night.webp",
  url: "https://wellof.com.br",
  telephone: "+55 11 94089-5758",
  email: "contato@wellof.com.br",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Olavo Fontoura, 1078 - Santana",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "02012-021",
    addressCountry: "BR",
  },
  areaServed: "São Paulo",
  description:
    "Hangaragem, FBO e atendimento executivo no Campo de Marte, em São Paulo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ScrollToTopOnReload />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
