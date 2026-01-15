import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HesaplamaMakinesi - Türkiye'nin Hesaplama Platformu",
    template: "%s | HesaplamaMakinesi"
  },
  description: "Türkiye'nin en kapsamlı online hesaplama platformu. Finans, vergi, sağlık, matematik ve daha fazlası için ücretsiz hesaplama araçları.",
  keywords: ["hesaplama", "kdv hesaplama", "kredi hesaplama", "vergi hesaplama", "hesap makinesi"],
  authors: [{ name: "HesaplamaMakinesi" }],
  creator: "HesaplamaMakinesi",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://hesaplamamakinesi.com",
    siteName: "HesaplamaMakinesi",
    title: "HesaplamaMakinesi - Türkiye'nin Hesaplama Platformu",
    description: "Türkiye'nin en kapsamlı online hesaplama platformu.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
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
