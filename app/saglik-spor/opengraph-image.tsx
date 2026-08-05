import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og"

export const alt = "Sağlık ve Spor | HesaplamaMakinesi"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
    return renderOgCard({
        eyebrow: "HesaplamaMakinesi",
        title: "Sağlık ve Spor",
        subtitle: "VKİ, kalori, ideal kilo, makro ve su ihtiyacı hesaplayıcıları",
        plate: "saglik-spor",
    })
}
