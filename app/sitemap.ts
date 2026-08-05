import { MetadataRoute } from "next"
import { categories } from "@/config/site-data"
import { SITE_URL } from "@/lib/site-config"
import { LEGAL_UPDATED_AT, updatedAtFor } from "@/lib/content-meta"
import { allUnitPaths, hubPath } from "@/lib/units/routes"
import { pairs } from "@/lib/units/pairs"

type Entry = MetadataRoute.Sitemap[number]

function entry(
    path: string,
    priority: number,
    changeFrequency: Entry["changeFrequency"],
    lastModified = updatedAtFor(path)
): Entry {
    return {
        url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
        lastModified: new Date(lastModified),
        changeFrequency,
        priority,
    }
}

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages: MetadataRoute.Sitemap = [
        entry("/", 1, "daily"),
        entry("/iletisim", 0.4, "yearly", LEGAL_UPDATED_AT),
        entry("/gizlilik-politikasi", 0.2, "yearly", LEGAL_UPDATED_AT),
        entry("/kullanim-sartlari", 0.2, "yearly", LEGAL_UPDATED_AT),
    ]

    const categoryPages = categories.map((category) => entry(`/${category.slug}`, 0.9, "weekly"))

    const toolPages = categories.flatMap((category) =>
        category.tools
            .filter((tool) => !tool.externalUrl)
            .map((tool) => entry(`/${category.slug}/${tool.slug}`, 0.8, "weekly"))
    )

    // Programatik birim dönüşüm sayfaları
    const unitIndex = entry("/birim", 0.8, "weekly")
    const hubPaths = new Set(pairs.map((pair) => hubPath(pair)))
    const unitPages = allUnitPaths().map((path) => entry(path, hubPaths.has(path) ? 0.7 : 0.6, "monthly"))

    return [...staticPages, ...categoryPages, ...toolPages, unitIndex, ...unitPages]
}
