"use client"

import { useState, useEffect, useCallback } from "react"
import { Coins, Copy, Check, ArrowRightLeft, RefreshCw, Loader2, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const currencyNames: Record<string, string> = {
    TRY: "Türk Lirası",
    USD: "Amerikan Doları",
    EUR: "Euro",
    GBP: "İngiliz Sterlini",
    CHF: "İsviçre Frangı",
    JPY: "Japon Yeni",
    AUD: "Avustralya Doları",
    CAD: "Kanada Doları",
    SAR: "Suudi Riyali",
    AED: "BAE Dirhemi",
    RUB: "Rus Rublesi",
    CNY: "Çin Yuanı",
    INR: "Hint Rupisi",
    KRW: "Güney Kore Wonu",
    BRL: "Brezilya Reali",
    MXN: "Meksika Pesosu",
    SEK: "İsveç Kronu",
    NOK: "Norveç Kronu",
    DKK: "Danimarka Kronu",
    PLN: "Polonya Zlotisi"
}

const currencySymbols: Record<string, string> = {
    TRY: "₺",
    USD: "$",
    EUR: "€",
    GBP: "£",
    CHF: "CHF",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    SAR: "SR",
    AED: "AED",
    RUB: "₽",
    CNY: "¥",
    INR: "₹",
    KRW: "₩",
    BRL: "R$",
    MXN: "MX$",
    SEK: "kr",
    NOK: "kr",
    DKK: "kr",
    PLN: "zł"
}

// Fallback rates in case API fails
const fallbackRates: Record<string, number> = {
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

export function CurrencyConverter() {
    const [amount, setAmount] = useState<string>("1")
    const [fromCurrency, setFromCurrency] = useState<string>("USD")
    const [toCurrency, setToCurrency] = useState<string>("TRY")
    const [result, setResult] = useState<number | null>(null)
    const [copied, setCopied] = useState(false)
    const [rates, setRates] = useState<Record<string, number>>(fallbackRates)
    const [loading, setLoading] = useState(true)
    const [lastUpdate, setLastUpdate] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [source, setSource] = useState<string>("")
    const [isLive, setIsLive] = useState(false)

    // Fetch exchange rates from our API
    const fetchRates = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/currency-rates", {
                cache: "no-store"
            })

            if (!response.ok) {
                throw new Error("API yanıt vermedi")
            }

            const data = await response.json()

            if (data.success && data.rates) {
                setRates(data.rates)
                setSource(data.source)
                setIsLive(data.source !== "fallback" && data.source !== "error-fallback")

                // Format last update time
                if (data.lastUpdate) {
                    const updateDate = new Date(data.lastUpdate)
                    setLastUpdate(updateDate.toLocaleString("tr-TR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }))
                }

                if (data.error) {
                    setError(data.error)
                }
            } else {
                throw new Error("Kur verisi alınamadı")
            }
        } catch (err) {
            console.error("Kur API hatası:", err)
            setError("Güncel kurlar alınamadı, tahmini kurlar gösteriliyor")
            setRates(fallbackRates)
            setLastUpdate("Tahmini kurlar")
            setIsLive(false)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchRates()
        // Refresh rates every 5 minutes
        const interval = setInterval(fetchRates, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [fetchRates])

    const convert = useCallback(() => {
        const numAmount = parseFloat(amount.replace(/,/g, "."))

        if (isNaN(numAmount) || numAmount <= 0) {
            setResult(null)
            return
        }

        // Convert to TRY first, then to target currency
        const fromRate = rates[fromCurrency] || 1
        const toRate = rates[toCurrency] || 1
        const inTRY = numAmount * fromRate
        const converted = inTRY / toRate

        setResult(Math.round(converted * 10000) / 10000)
    }, [amount, fromCurrency, toCurrency, rates])

    useEffect(() => {
        convert()
    }, [convert])

    const swapCurrencies = () => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }

    const copyToClipboard = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText(result.toFixed(2))
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error("Kopyalama başarısız:", err)
            }
        }
    }

    const formatNumber = (value: number): string => {
        return new Intl.NumberFormat("tr-TR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4
        }).format(value)
    }

    const currencies = Object.keys(currencyNames)

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Coins className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Döviz Çevirici</CardTitle>
                                <CardDescription className="text-amber-100 flex items-center gap-2">
                                    {isLive ? (
                                        <>
                                            <CheckCircle className="h-3 w-3" />
                                            Canlı kurlar
                                        </>
                                    ) : (
                                        <>
                                            <AlertTriangle className="h-3 w-3" />
                                            Tahmini kurlar
                                        </>
                                    )}
                                </CardDescription>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={fetchRates}
                            disabled={loading}
                            className="text-white hover:bg-white/20"
                            title="Kurları yenile"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <RefreshCw className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    {error && (
                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-sm flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="grid gap-4">
                        {/* From Currency */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Kaynak Para Birimi
                            </Label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                                        {currencySymbols[fromCurrency]}
                                    </span>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="1"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value.replace(/[^0-9.,]/g, ""))}
                                        className="pl-10 h-12 text-lg font-medium border-slate-300 focus:border-amber-500"
                                    />
                                </div>
                                <select
                                    value={fromCurrency}
                                    onChange={(e) => setFromCurrency(e.target.value)}
                                    className="h-12 px-4 rounded-md border border-slate-300 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
                                >
                                    {currencies.map((currency) => (
                                        <option key={currency} value={currency}>
                                            {currency} - {currencyNames[currency]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Swap Button */}
                        <div className="flex justify-center">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={swapCurrencies}
                                className="rounded-full h-10 w-10 border-amber-300 hover:bg-amber-50"
                            >
                                <ArrowRightLeft className="h-4 w-4 text-amber-600" />
                            </Button>
                        </div>

                        {/* To Currency */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Hedef Para Birimi
                            </Label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                                        {currencySymbols[toCurrency]}
                                    </span>
                                    <Input
                                        type="text"
                                        readOnly
                                        value={result ? formatNumber(result) : ""}
                                        className="pl-10 h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-300"
                                    />
                                </div>
                                <select
                                    value={toCurrency}
                                    onChange={(e) => setToCurrency(e.target.value)}
                                    className="h-12 px-4 rounded-md border border-slate-300 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-amber-500 focus:ring-amber-500"
                                >
                                    {currencies.map((currency) => (
                                        <option key={currency} value={currency}>
                                            {currency} - {currencyNames[currency]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {result && (
                        <div className="p-4 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-amber-100">Sonuç</p>
                                    <p className="text-2xl font-bold">
                                        {currencySymbols[fromCurrency]}{amount} = {currencySymbols[toCurrency]}{formatNumber(result)}
                                    </p>
                                </div>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={copyToClipboard}
                                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Exchange Rates Table */}
            <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                            {isLive ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                                <AlertTriangle className="h-5 w-5 text-amber-500" />
                            )}
                            Güncel Döviz Kurları (TRY)
                        </CardTitle>
                        {lastUpdate && (
                            <span className="text-xs text-slate-500">
                                {lastUpdate}
                            </span>
                        )}
                    </div>
                    {source && source !== "fallback" && source !== "error-fallback" && (
                        <p className="text-xs text-slate-500">Kaynak: {source}</p>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {currencies.filter(c => c !== "TRY" && rates[c]).map((currency) => (
                            <div key={currency} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-center">
                                <p className="text-lg font-bold text-slate-900 dark:text-white">
                                    {currencySymbols[currency]}1
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    = ₺{rates[currency]?.toFixed(2) || "—"}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">{currency}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-4 text-center">
                        * Kurlar gösterge niteliğindedir. İşlem kurları için bankanıza danışın.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
