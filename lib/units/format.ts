/** Türkçe sayı biçimlendirme yardımcıları (binlik ayracı nokta, ondalık virgül). */

export function trNumber(value: number, maximumFractionDigits = 2): string {
    return value.toLocaleString("tr-TR", { maximumFractionDigits, minimumFractionDigits: 0 })
}

/**
 * Dönüşüm sonucunu okunabilir hassasiyette biçimlendirir.
 * Büyük sayılarda ondalık gereksizdir, 1'in altındaki sonuçlarda ise anlamlı
 * basamakları korumak gerekir (0,0254 gibi).
 */
export function formatResult(value: number): string {
    const abs = Math.abs(value)
    if (abs === 0) return "0"
    if (abs >= 10000) return trNumber(value, 0)
    if (abs >= 100) return trNumber(value, 2)
    if (abs >= 1) return trNumber(value, 4)
    if (abs >= 0.001) return trNumber(value, 6)
    return trNumber(value, 9)
}

/** Meta description gibi yerlerde kullanılan kısa sonuç (en fazla 2 ondalık). */
export function formatShort(value: number): string {
    const abs = Math.abs(value)
    if (abs >= 100) return trNumber(value, 1)
    if (abs >= 1) return trNumber(value, 2)
    return trNumber(value, 4)
}
