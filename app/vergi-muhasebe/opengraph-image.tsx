import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og"

export const alt = "Vergi ve Muhasebe | HesaplamaMakinesi"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
    return renderOgCard({
        eyebrow: "HesaplamaMakinesi",
        title: "Vergi ve Muhasebe",
        subtitle: "KDV, gelir vergisi, MTV, ÖTV ve kurumlar vergisi hesaplayıcıları",
        plate: "vergi-muhasebe",
    })
}
