/**
 * Site geneli sabitler. URL, marka ve iletişim bilgileri tek kaynaktan okunur;
 * metadata, schema, sitemap ve OG görselleri hep buradan beslenir.
 */

export const SITE_URL = "https://hesaplamamakinesi.com"

export const SITE_NAME = "HesaplamaMakinesi"

export const SITE_TAGLINE = "Türkiye'nin Hesaplama Platformu"

export const SITE_DESCRIPTION =
    "Türkiye'nin en kapsamlı online hesaplama platformu. Finans, vergi, sağlık, matematik ve birim dönüşümü için ücretsiz hesaplama araçları."

export const SITE_LOCALE = "tr_TR"

export const SITE_LANG = "tr"

export const CONTACT_EMAIL = "iletisim@hesaplamamakinesi.com"

/** Mutlak URL üretir. Baştaki "/" opsiyoneldir. */
export function absoluteUrl(path = "/"): string {
    if (!path || path === "/") return SITE_URL
    return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
