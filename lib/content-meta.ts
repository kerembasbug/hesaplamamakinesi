/**
 * Sayfa bazlı içerik güncelleme tarihleri.
 *
 * Sitemap `lastModified` ve schema `dateModified` buradan okunur. Bir sayfanın
 * içeriğini gerçekten güncellediğinde buradaki tarihi de güncelle — sitemap'te
 * her sayfaya aynı sahte tarihi vermek Google'ın lastModified sinyaline
 * güvenmeyi bırakmasına yol açar.
 */

/** Bu tarihten sonra dokunulmamış sayfalar için varsayılan. */
export const DEFAULT_UPDATED_AT = "2026-01-27"

/** Rota → ISO tarih (YYYY-MM-DD). Sadece gerçekten güncellenen sayfalar. */
export const CONTENT_UPDATED_AT: Record<string, string> = {
    "/": "2026-08-05",

    // 2026 vergi/ücret verileriyle güncellenen sayfalar
    "/vergi-muhasebe": "2026-08-05",
    "/vergi-muhasebe/gelir-vergisi-hesaplama": "2026-08-05",
    "/vergi-muhasebe/kdv-hesaplama": "2026-08-05",
    "/vergi-muhasebe/kurumlar-vergisi": "2026-08-05",
    "/finans": "2026-08-05",
    "/finans/maas-hesaplama": "2026-08-05",
    "/finans/tazminat-hesaplama": "2026-08-05",

    // Yeni programatik birim dönüşüm bölümü
    "/birim": "2026-08-05",
    "/donusturuculer": "2026-08-05",
}

export function updatedAtFor(path: string): string {
    return CONTENT_UPDATED_AT[path] ?? DEFAULT_UPDATED_AT
}

/** Yasal sayfalar nadiren değişir; ayrı tutuluyor. */
export const LEGAL_UPDATED_AT = "2026-01-13"
