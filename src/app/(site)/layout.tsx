import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.css";
import NavBar from "@/src/components/ui/navBar";
import StarField from "@/src/components/StarField";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Carolina Mauro",
  description:
    "Portfolio personal de Carolina Mauro con proyectos, intereses técnicos y blog de aprendizaje.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StarField />
        <NavBar />
          {children}
      </body>
    </html>
  );
}
