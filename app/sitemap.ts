import { MetadataRoute } from "next"
import { categories } from "@/config/site-data"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://hesaplamamakinesi.com"

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/gizlilik-politikasi`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/kullanim-sartlari`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/iletisim`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ]

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${baseUrl}/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }))

    // Tool pages
    const toolPages: MetadataRoute.Sitemap = categories.flatMap((category) =>
        category.tools.map((tool) => ({
            url: `${baseUrl}/${category.slug}/${tool.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }))
    )

    return [...staticPages, ...categoryPages, ...toolPages]
}
