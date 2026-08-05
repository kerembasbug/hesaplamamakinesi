import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og"

export const alt = "Birim Dönüştürücüler | HesaplamaMakinesi"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
    return renderOgCard({
        eyebrow: "HesaplamaMakinesi",
        title: "Birim Dönüştürücüler",
        subtitle: "Uzunluk, ağırlık, alan, hacim, sıcaklık ve veri dönüşümü",
        plate: "donusturuculer",
    })
}
