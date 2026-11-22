import type { Metadata } from "next"
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic, Noto_Kufi_Arabic } from "next/font/google"

import { SiteFooter, SiteHeader } from "@/components/site-header"
import { site } from "@/lib/site"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic",
})
const kufi = Noto_Kufi_Arabic({ subsets: ["arabic"], variable: "--font-noto-kufi-arabic" })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: RTL and Arabic components for shadcn/ui`, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.author.name, url: site.author.url }],
  openGraph: { title: site.name, description: site.description, url: site.url, type: "website" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${plexArabic.variable} ${kufi.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  )
}
