import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, webSiteSchema } from "@/lib/schema";
import { METADATA_BASE } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site-config";

// Google AdSense (Auto ads). Loaded only in production builds so local dev and
// previews never generate impressions on the publisher account.
const ADSENSE_CLIENT = "ca-pub-2275530363739994";
const ADSENSE_ENABLED = process.env.NODE_ENV === "production";

// GA4 (mülk 546077767). Yalnız üretimde; bot korumalı: otomasyon tarayıcısı
// (navigator.webdriver), başsız Chrome ya da kare/anormal ekranda (1280x1200,
// 1366x1366, 1600x1600) etiket hiç yüklenmez — 24 Ekim 2026 raporunun bot bulgusu.
const GA4_ID = "G-QHFE6YQXWV";
const GA4_ENABLED = process.env.NODE_ENV === "production";
const GA4_SNIPPET = `(function(){var id='${GA4_ID}';var w=screen.width,h=screen.height;if(navigator.webdriver||w===h||(w===1280&&h===1200)||/HeadlessChrome/i.test(navigator.userAgent))return;window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config',id);var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s);})();`;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default: `${SITE_NAME} - ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: ["hesaplama", "kdv hesaplama", "kredi hesaplama", "vergi hesaplama", "hesap makinesi"],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        {GA4_ENABLED && <script dangerouslySetInnerHTML={{ __html: GA4_SNIPPET }} />}
        {ADSENSE_ENABLED && (
          <>
            <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
              crossOrigin="anonymous"
            />
          </>
        )}
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 dark:bg-slate-950`}>
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1">
              <div className="container mx-auto px-4 py-8">
                {children}
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
