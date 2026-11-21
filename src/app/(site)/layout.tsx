import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "../../styles/globals.css";
import NavBar from "@/src/components/ui/navBar";
import SiteFooter from "@/src/components/ui/SiteFooter";
import SiteExtras from "@/src/components/extras/SiteExtras";
import { langFromPathname } from "@/src/lib/i18n";
import { getAllPostsMeta } from "@/src/lib/posts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Caro Mauro — Software Engineer",
  description:
    "Portfolio y blog de Carolina (Caro) Mauro: Software Engineer en Innovid, Ingeniera en Informática, tenista y nunca quieta.",
};

/* Runs before first paint so the saved theme never flashes. */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "/";
  const lang = langFromPathname(pathname);
  const posts = getAllPostsMeta().map(({ slug, title, category }) => ({ slug, title, category }));

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased`}
      >
        <NavBar />
        {children}
        <SiteFooter lang={lang} />
        <SiteExtras posts={posts} />
      </body>
    </html>
  );
}
