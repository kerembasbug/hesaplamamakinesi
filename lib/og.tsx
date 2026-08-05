import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { SITE_NAME } from "@/lib/site-config"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

/**
 * Arka plan plakaları `scripts/generate-og-plates.mjs` ile bir kez üretiliyor.
 * Build sırasında dosyadan okunup data URI olarak gömülüyor; ImageResponse
 * harici URL çekemediği için bu gerekli.
 */
const plateCache = new Map<string, string>()

function plateDataUri(plate: string): string {
    const cached = plateCache.get(plate)
    if (cached) return cached

    let buffer: Buffer
    try {
        buffer = readFileSync(join(process.cwd(), "public", "gorseller", "og", `${plate}.jpg`))
    } catch {
        buffer = readFileSync(join(process.cwd(), "public", "gorseller", "og", "default.jpg"))
    }

    const uri = `data:image/jpeg;base64,${buffer.toString("base64")}`
    plateCache.set(plate, uri)
    return uri
}

export type OgCardInput = {
    /** Kartın büyük başlığı — sayfanın odak kelimesini içermeli. */
    title: string
    /** Başlığın altındaki tek satır bağlam. */
    subtitle?: string
    /** Sol üstteki küçük kategori etiketi. */
    eyebrow?: string
    /** public/gorseller/og altındaki plaka adı. */
    plate?: string
}

export function renderOgCard({ title, subtitle, eyebrow, plate = "default" }: OgCardInput) {
    const background = plateDataUri(plate)
    // Uzun başlıklarda punto küçülsün ki taşma olmasın.
    const titleSize = title.length > 58 ? 58 : title.length > 40 ? 68 : 80

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    position: "relative",
                    fontFamily: "sans-serif",
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={background}
                    alt=""
                    width={OG_SIZE.width}
                    height={OG_SIZE.height}
                    style={{ position: "absolute", inset: 0, objectFit: "cover" }}
                />
                {/* Metin kontrastını garanti eden koyu perde */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(100deg, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.82) 55%, rgba(2,6,23,0.45) 100%)",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "64px 72px",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {eyebrow ? (
                            <div
                                style={{
                                    display: "flex",
                                    fontSize: 26,
                                    letterSpacing: 4,
                                    textTransform: "uppercase",
                                    color: "#a5b4fc",
                                    marginBottom: 20,
                                }}
                            >
                                {eyebrow}
                            </div>
                        ) : null}
                        <div
                            style={{
                                display: "flex",
                                fontSize: titleSize,
                                fontWeight: 700,
                                lineHeight: 1.12,
                                color: "#ffffff",
                                maxWidth: 980,
                            }}
                        >
                            {title}
                        </div>
                        {subtitle ? (
                            <div
                                style={{
                                    display: "flex",
                                    marginTop: 26,
                                    fontSize: 32,
                                    color: "#cbd5e1",
                                    maxWidth: 900,
                                }}
                            >
                                {subtitle}
                            </div>
                        ) : null}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 52,
                                height: 52,
                                borderRadius: 14,
                                background: "#4f46e5",
                                color: "#ffffff",
                                fontSize: 30,
                                fontWeight: 700,
                            }}
                        >
                            H
                        </div>
                        <div style={{ display: "flex", fontSize: 30, color: "#e2e8f0", fontWeight: 600 }}>
                            {SITE_NAME}
                        </div>
                        <div style={{ display: "flex", fontSize: 26, color: "#94a3b8" }}>
                            hesaplamamakinesi.com
                        </div>
                    </div>
                </div>
            </div>
        ),
        OG_SIZE
    )
}
