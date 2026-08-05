import { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"

/**
 * NOT: Cloudflare "managed robots.txt" özelliği açıkken kendi bloğunu bu
 * çıktının ÖNÜNE ekliyor ve GPTBot / Google-Extended / PerplexityBot /
 * ClaudeBot / CCBot'u Disallow ediyor. Buradaki izinler ancak Cloudflare
 * panelinden (Security → Bots → AI Scrapers and Crawlers) o özellik
 * kapatıldığında geçerli olur.
 */

/** İçeriği AI arama sonuçlarında göstermesini istediğimiz botlar. */
const AI_SEARCH_AGENTS = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "Google-Extended",
    "PerplexityBot",
    "Perplexity-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "Applebot-Extended",
    "Bingbot",
    "cohere-ai",
]

const DISALLOWED_PATHS = ["/api/", "/_next/", "/static/"]

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: DISALLOWED_PATHS,
            },
            ...AI_SEARCH_AGENTS.map((userAgent) => ({
                userAgent,
                allow: "/",
                disallow: DISALLOWED_PATHS,
            })),
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    }
}
