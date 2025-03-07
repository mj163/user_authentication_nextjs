import type { Metadata } from "next";
import { siteConfig } from '@/data/config/site.settings';
import { Geist, Geist_Mono } from "next/font/google";
import "@/css/globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";


const displayFont = Geist({
    subsets: ['latin'],
    display: 'swap',
    variable: "--font-geist-sans",
})

const baseFont = Geist_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: "--font-geist-mono",
});

const style: string[] = [];

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`,
    },
    description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          className={`${baseFont.variable} ${displayFont.variable} scroll-smooth`}
          lang={siteConfig.language}
      >
      <head>
          <meta charSet="UTF-8"/>
          <meta content="#000000" name="msapplication-TileColor" />
          <title>{siteConfig.title}</title>
          <style>
              {`
          :root, :before, :after {
            ${style.join(';')}
          }
        `}
          </style>
          <link
              href="/static/favicons/apple-touch-icon.png"
              rel="apple-touch-icon"
              sizes="76x76"
          />
          <link
              href="/static/favicons/favicon-32x32.png"
              rel="icon"
              sizes="32x32"
              type="image/png"
          />
          <link
              href="/static/favicons/favicon-16x16.png"
              rel="icon"
              sizes="16x16"
              type="image/png"
          />
          <link href="/static/favicons/manifest.webmanifest" rel="manifest" />

      </head>
      <body
      >
      <Header/>
      <main className="pt-16">
          {children}
      </main>
      <Footer/>
      </body>
      </html>
  );
}
