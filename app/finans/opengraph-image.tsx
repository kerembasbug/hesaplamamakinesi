import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og"

export const alt = "Finans Hesaplayıcıları | HesaplamaMakinesi"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
    return renderOgCard({
        eyebrow: "HesaplamaMakinesi",
        title: "Finans Hesaplayıcıları",
        subtitle: "Kredi, mevduat, bileşik faiz, enflasyon ve yatırım araçları",
        plate: "finans",
    })
}
