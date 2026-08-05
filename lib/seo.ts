import type { Metadata } from "next"
import { SITE_DESCRIPTION, SITE_LOCALE, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site-config"

export type BuildMetadataInput = {
    /** Sayfa başlığı — layout template'i " | HesaplamaMakinesi" ekler. 15-70 karakter tutun. */
    title: string
    /** Meta description — 120-160 karakter tutun. */
    description: string
    /** Odak kelime ve varyasyonları. */
    keywords?: string[]
    /** Kök göreli yol, örn. "/vergi-muhasebe/kdv-hesaplama". Canonical bundan üretilir. */
    path: string
    /** İçerik güncelleme tarihi (ISO). Article/OG published_time yerine kullanılır. */
    updatedAt?: string
    /** Arama sonuçlarından gizlenmesi gereken sayfalar için. */
    noIndex?: boolean
}

/**
 * Her sayfanın metadata'sını tek yerden üretir: canonical, OG ve Twitter kartı
 * dahil. Sayfalarda elle `alternates` veya `openGraph` yazılmamalı.
 */
export function buildMetadata({
    title,
    description,
    keywords,
    path,
    updatedAt,
    noIndex = false,
}: BuildMetadataInput): Metadata {
    const canonical = absoluteUrl(path)

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical,
        },
        // OG görseli bilerek burada verilmiyor: Next.js dosya konvansiyonu
        // (opengraph-image.tsx) en yakın segmentteki görseli otomatik bağlar,
        // böylece /birim/* sayfaları kendi dinamik kartlarını alır.
        openGraph: {
            type: "website",
            locale: SITE_LOCALE,
            url: canonical,
            siteName: SITE_NAME,
            title,
            description,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        robots: noIndex
            ? { index: false, follow: true }
            : {
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
        ...(updatedAt ? { other: { "article:modified_time": updatedAt } } : {}),
    }
}

/** metadataBase — layout'ta bir kez tanımlanır, göreli OG URL'lerini mutlaklaştırır. */
export const METADATA_BASE = new URL(SITE_URL)

export const DEFAULT_DESCRIPTION = SITE_DESCRIPTION
