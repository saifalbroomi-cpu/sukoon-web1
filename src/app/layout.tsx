import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sukoon — Coming Soon",
  description:
    "Sukoon is a modern clothing brand from Oman. Something worth waiting for.",
  openGraph: {
    title: "Sukoon — Coming Soon",
    description:
      "Sukoon is a modern clothing brand from Oman. Something worth waiting for.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sukoon — Coming Soon",
    description:
      "Sukoon is a modern clothing brand from Oman. Something worth waiting for.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
