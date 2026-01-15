import { NextResponse } from "next/server"

// Multiple API sources for reliability
const EXCHANGE_RATE_APIS = [
    // Primary: ExchangeRate-API (free tier, very reliable)
    {
        name: "exchangerate-api",
        url: "https://open.er-api.com/v6/latest/TRY",
        parseRates: (data: { rates: Record<string, number> }) => {
            if (data.rates) {
                const rates: Record<string, number> = { TRY: 1 }
                // Invert rates since API returns TRY -> other
                for (const [currency, rate] of Object.entries(data.rates)) {
                    if (rate > 0) {
                        rates[currency] = 1 / rate
                    }
                }
                return rates
            }
            return null
        }
    },
    // Fallback 1: Frankfurter API (free, ECB data)
    {
        name: "frankfurter",
        url: "https://api.frankfurter.app/latest?from=TRY",
        parseRates: (data: { rates: Record<string, number> }) => {
            if (data.rates) {
                const rates: Record<string, number> = { TRY: 1 }
                for (const [currency, rate] of Object.entries(data.rates)) {
                    if (rate > 0) {
                        rates[currency] = 1 / rate
                    }
                }
                return rates
            }
            return null
        }
    },
    // Fallback 2: Fawaz Ahmed's API (free, community maintained)
    {
        name: "fawazahmed",
        url: "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/try.json",
        parseRates: (data: { try: Record<string, number> }) => {
            if (data.try) {
                const rates: Record<string, number> = { TRY: 1 }
                for (const [currency, rate] of Object.entries(data.try)) {
                    if (rate > 0) {
                        rates[currency.toUpperCase()] = 1 / rate
                    }
                }
                return rates
            }
            return null
        }
    }
]

// Fallback rates (updated regularly, used only as last resort)
const FALLBACK_RATES: Record<string, number> = {
    TRY: 1,
    USD: 35.50,
    EUR: 38.20,
    GBP: 44.80,
    CHF: 41.00,
    JPY: 0.24,
    AUD: 23.50,
    CAD: 25.80,
    SAR: 9.45,
    AED: 9.66,
    RUB: 0.38,
    CNY: 4.95,
    INR: 0.42,
    KRW: 0.025,
    BRL: 6.10,
    MXN: 1.95,
    SEK: 3.40,
    NOK: 3.25,
    DKK: 5.10,
    PLN: 8.70
}

// Currencies to include in the response
const CURRENCIES = [
    "USD", "EUR", "GBP", "CHF", "JPY", "AUD", "CAD", "SAR", "AED",
    "RUB", "CNY", "INR", "KRW", "BRL", "MXN", "SEK", "NOK", "DKK", "PLN"
]

// Cache for storing rates (simple in-memory cache)
let cachedRates: { rates: Record<string, number>; timestamp: number; source: string } | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function fetchWithTimeout(url: string, timeout = 5000): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            next: { revalidate: 300 } // Cache for 5 minutes
        })
        return response
    } finally {
        clearTimeout(timeoutId)
    }
}

async function fetchRatesFromAPIs(): Promise<{ rates: Record<string, number>; source: string }> {
    for (const api of EXCHANGE_RATE_APIS) {
        try {
            console.log(`[Currency API] Trying ${api.name}...`)
            const response = await fetchWithTimeout(api.url)

            if (!response.ok) {
                console.log(`[Currency API] ${api.name} returned ${response.status}`)
                continue
            }

            const data = await response.json()
            const rates = api.parseRates(data)

            if (rates && Object.keys(rates).length > 1) {
                console.log(`[Currency API] ${api.name} success, got ${Object.keys(rates).length} currencies`)

                // Filter to only include currencies we want
                const filteredRates: Record<string, number> = { TRY: 1 }
                for (const currency of CURRENCIES) {
                    if (rates[currency]) {
                        filteredRates[currency] = rates[currency]
                    }
                }

                return { rates: filteredRates, source: api.name }
            }
        } catch (error) {
            console.log(`[Currency API] ${api.name} failed:`, error)
        }
    }

    // All APIs failed, return fallback
    console.log("[Currency API] All APIs failed, using fallback rates")
    return { rates: FALLBACK_RATES, source: "fallback" }
}

export async function GET() {
    try {
        const now = Date.now()

        // Check cache
        if (cachedRates && now - cachedRates.timestamp < CACHE_DURATION) {
            return NextResponse.json({
                success: true,
                rates: cachedRates.rates,
                source: cachedRates.source,
                cached: true,
                lastUpdate: new Date(cachedRates.timestamp).toISOString()
            })
        }

        // Fetch fresh rates
        const { rates, source } = await fetchRatesFromAPIs()

        // Update cache
        cachedRates = { rates, timestamp: now, source }

        return NextResponse.json({
            success: true,
            rates,
            source,
            cached: false,
            lastUpdate: new Date(now).toISOString()
        })
    } catch (error) {
        console.error("[Currency API] Error:", error)

        // Return fallback if everything fails
        return NextResponse.json({
            success: true,
            rates: FALLBACK_RATES,
            source: "error-fallback",
            cached: false,
            lastUpdate: new Date().toISOString(),
            error: "Güncel kurlar alınamadı, tahmini kurlar gösteriliyor"
        })
    }
}
