"use client"

import { useState, useEffect, useCallback } from "react"
import { Coins, Copy, Check, ArrowRightLeft, RefreshCw, Loader2 } from "lucide-react"
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
    AED: "BAE Dirhemi"
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
    AED: "AED"
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
    AED: 9.66
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

    // Fetch exchange rates from API
    const fetchRates = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            // Using exchangerate.host API (free, no key required)
            const response = await fetch(
                `https://api.exchangerate.host/latest?base=TRY&symbols=USD,EUR,GBP,CHF,JPY,AUD,CAD,SAR,AED`
            )

            if (!response.ok) {
                throw new Error("API yanıt vermedi")
            }

            const data = await response.json()

            if (data.success === false) {
                throw new Error("Kur bilgisi alınamadı")
            }

            // API returns rates relative to TRY, we need to invert them
            const newRates: Record<string, number> = { TRY: 1 }

            if (data.rates) {
                Object.keys(data.rates).forEach((currency) => {
                    // Invert the rate: if 1 TRY = 0.028 USD, then 1 USD = 1/0.028 = ~35.7 TRY
                    newRates[currency] = 1 / data.rates[currency]
                })

                setRates(newRates)
                setLastUpdate(new Date().toLocaleString("tr-TR"))
            } else {
                throw new Error("Kur verisi bulunamadı")
            }
        } catch (err) {
            console.error("Kur API hatası:", err)
            setError("Güncel kurlar alınamadı, tahmini kurlar gösteriliyor")
            // Keep using fallback rates
            setRates(fallbackRates)
            setLastUpdate("Tahmini kurlar")
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
        const inTRY = numAmount * rates[fromCurrency]
        const converted = inTRY / rates[toCurrency]

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
                                <CardDescription className="text-amber-100">
                                    Güncel kurlar ile döviz çevirisi
                                </CardDescription>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={fetchRates}
                            disabled={loading}
                            className="text-white hover:bg-white/20"
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
                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-sm">
                            ⚠️ {error}
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
                            <RefreshCw className="h-5 w-5 text-amber-500" />
                            Güncel Döviz Kurları (TRY)
                        </CardTitle>
                        {lastUpdate && (
                            <span className="text-xs text-slate-500">
                                {lastUpdate}
                            </span>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                        {currencies.filter(c => c !== "TRY").map((currency) => (
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
