import { MetadataRoute } from "next"
import { categories } from "@/config/site-data"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://hesaplamamakinesi.com"
    const currentDate = new Date("2026-01-27")

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/gizlilik-politikasi`,
            lastModified: new Date("2025-01-01"),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/kullanim-sartlari`,
            lastModified: new Date("2025-01-01"),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/iletisim`,
            lastModified: new Date("2025-01-01"),
            changeFrequency: "yearly",
            priority: 0.5,
        },
    ]

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${baseUrl}/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }))

    // Tool pages - higher priority for calculators (exclude external links)
    const toolPages: MetadataRoute.Sitemap = categories.flatMap((category) =>
        category.tools
            .filter((tool) => !tool.externalUrl)
            .map((tool) => ({
                url: `${baseUrl}/${category.slug}/${tool.slug}`,
                lastModified: currentDate,
                changeFrequency: "weekly" as const,
                priority: 0.8,
            }))
    )

    return [...staticPages, ...categoryPages, ...toolPages]
}
