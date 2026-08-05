import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site-config"

/** JSON-LD düğümü. Şemalar iç içe geçtiği için gevşek tipleniyor. */
export type JsonLdNode = Record<string, unknown>

const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`

export function organizationSchema(): JsonLdNode {
    return {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        description: SITE_DESCRIPTION,
        logo: {
            "@type": "ImageObject",
            url: absoluteUrl("/gorseller/marka/logo.svg"),
            width: 512,
            height: 512,
        },
        areaServed: {
            "@type": "Country",
            name: "Türkiye",
        },
    }
}

export function webSiteSchema(): JsonLdNode {
    return {
        "@type": "WebSite",
        "@id": SITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "tr-TR",
        publisher: { "@id": ORG_ID },
    }
}

export type BreadcrumbItem = {
    name: string
    /** Kök göreli yol. Son öğede genelde verilmez (mevcut sayfa). */
    path?: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdNode {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            ...(item.path ? { item: absoluteUrl(item.path) } : {}),
        })),
    }
}

export type CalculatorSchemaInput = {
    name: string
    description: string
    path: string
    /** Örn. "FinanceApplication", "HealthApplication", "UtilitiesApplication". */
    applicationCategory?: string
    /** Öne çıkan özellikler — rich result'ta değil ama entity anlayışında işe yarar. */
    featureList?: string[]
    updatedAt?: string
}

/**
 * Hesaplayıcılar için WebApplication şeması. Ücretsiz araç olduğu için
 * `offers.price` 0 verilir — Google bunu "free tool" sinyali olarak okur.
 */
export function calculatorSchema({
    name,
    description,
    path,
    applicationCategory = "UtilitiesApplication",
    featureList,
    updatedAt,
}: CalculatorSchemaInput): JsonLdNode {
    return {
        "@type": "WebApplication",
        "@id": `${absoluteUrl(path)}#app`,
        name,
        description,
        url: absoluteUrl(path),
        applicationCategory,
        operatingSystem: "Tüm platformlar (web tarayıcısı)",
        browserRequirements: "JavaScript etkin bir tarayıcı gerektirir",
        inLanguage: "tr-TR",
        isAccessibleForFree: true,
        offers: {
            "@type": "Offer",
            price: 0,
            priceCurrency: "TRY",
        },
        publisher: { "@id": ORG_ID },
        ...(featureList ? { featureList } : {}),
        ...(updatedAt ? { dateModified: updatedAt } : {}),
    }
}

export type FaqItem = {
    question: string
    answer: string
}

export function faqSchema(items: FaqItem[]): JsonLdNode {
    return {
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    }
}

export type HowToStep = {
    name: string
    text: string
}

export function howToSchema(name: string, steps: HowToStep[], totalTime = "PT1M"): JsonLdNode {
    return {
        "@type": "HowTo",
        name,
        totalTime,
        inLanguage: "tr-TR",
        step: steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.name,
            text: step.text,
        })),
    }
}

export type CollectionItem = {
    name: string
    path: string
    description?: string
}

export function collectionPageSchema(
    name: string,
    description: string,
    path: string,
    items: CollectionItem[]
): JsonLdNode {
    return {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl(path)}#collection`,
        name,
        description,
        url: absoluteUrl(path),
        inLanguage: "tr-TR",
        isPartOf: { "@id": SITE_ID },
        mainEntity: {
            "@type": "ItemList",
            numberOfItems: items.length,
            itemListElement: items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                url: absoluteUrl(item.path),
                ...(item.description ? { description: item.description } : {}),
            })),
        },
    }
}

/** Ölçüm/dönüşüm sonucunu makine okunur şekilde işaretler. */
export function quantitativeValueSchema(value: number, unitText: string): JsonLdNode {
    return {
        "@type": "QuantitativeValue",
        value,
        unitText,
    }
}
