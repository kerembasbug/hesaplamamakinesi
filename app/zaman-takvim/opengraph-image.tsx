import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og"

export const alt = "Zaman ve Takvim | HesaplamaMakinesi"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
    return renderOgCard({
        eyebrow: "HesaplamaMakinesi",
        title: "Zaman ve Takvim",
        subtitle: "Tarih farkı, yaş, gebelik, iş günü ve saat hesaplayıcıları",
        plate: "zaman-takvim",
    })
}
