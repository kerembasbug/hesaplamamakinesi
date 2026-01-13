"use client"

import { useState, useEffect, useCallback } from "react"
import { Banknote, Copy, Check, Calculator, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface CalculationResult {
    futureNominalValue: number
    realValue: number
    purchasingPowerLoss: number
    purchasingPowerLossPercent: number
    yearlyBreakdown: { year: number; nominal: number; real: number }[]
}

export function InflationCalculator() {
    const [amount, setAmount] = useState<string>("")
    const [inflationRate, setInflationRate] = useState<string>("50")
    const [years, setYears] = useState<string>("5")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState<string | null>(null)

    const calculateInflation = useCallback(() => {
        const a = parseFloat(amount.replace(/,/g, "."))
        const rate = parseFloat(inflationRate.replace(/,/g, ".")) / 100
        const y = parseInt(years)

        if (isNaN(a) || isNaN(rate) || isNaN(y) || a <= 0 || rate < 0 || y <= 0) {
            setResult(null)
            return
        }

        // Future nominal value stays the same (it's just the amount)
        const futureNominalValue = a

        // Real value after inflation = amount / (1 + rate)^years
        const realValue = a / Math.pow(1 + rate, y)

        const purchasingPowerLoss = a - realValue
        const purchasingPowerLossPercent = (purchasingPowerLoss / a) * 100

        // Yearly breakdown
        const yearlyBreakdown: CalculationResult["yearlyBreakdown"] = []
        for (let year = 0; year <= y; year++) {
            yearlyBreakdown.push({
                year,
                nominal: a,
                real: Math.round((a / Math.pow(1 + rate, year)) * 100) / 100
            })
        }

        setResult({
            futureNominalValue: Math.round(futureNominalValue * 100) / 100,
            realValue: Math.round(realValue * 100) / 100,
            purchasingPowerLoss: Math.round(purchasingPowerLoss * 100) / 100,
            purchasingPowerLossPercent: Math.round(purchasingPowerLossPercent * 100) / 100,
            yearlyBreakdown
        })
    }, [amount, inflationRate, years])

    useEffect(() => {
        calculateInflation()
    }, [calculateInflation])

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 2
        }).format(value)
    }

    const copyToClipboard = async (value: string, type: string) => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(type)
            setTimeout(() => setCopied(null), 2000)
        } catch (err) {
            console.error("Kopyalama başarısız:", err)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Banknote className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Enflasyon Hesaplama</CardTitle>
                            <CardDescription className="text-rose-100">
                                Paranızın enflasyona göre satın alma gücü kaybını hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Tutar (₺)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₺</span>
                                <Input
                                    id="amount"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="100.000"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pl-8 h-12 border-slate-300 focus:border-rose-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="inflationRate" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Yıllık Enflasyon (%)
                            </Label>
                            <div className="relative">
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                <Input
                                    id="inflationRate"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="50"
                                    value={inflationRate}
                                    onChange={(e) => setInflationRate(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pr-8 h-12 border-slate-300 focus:border-rose-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="years" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Süre (Yıl)
                            </Label>
                            <Input
                                id="years"
                                type="number"
                                placeholder="5"
                                value={years}
                                onChange={(e) => setYears(e.target.value)}
                                className="h-12 border-slate-300 focus:border-rose-500"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-rose-500" />
                            Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Nominal Değer (Şimdi)</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {formatCurrency(result.futureNominalValue)}
                                </p>
                            </div>

                            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                                <p className="text-sm text-red-600 dark:text-red-400">
                                    Reel Değer ({years} yıl sonra)
                                </p>
                                <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                                    {formatCurrency(result.realValue)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                            <div className="flex items-center gap-3">
                                <TrendingDown className="h-8 w-8" />
                                <div>
                                    <p className="text-sm text-rose-100">Satın Alma Gücü Kaybı</p>
                                    <p className="text-3xl font-bold">
                                        -{formatCurrency(result.purchasingPowerLoss)}
                                    </p>
                                    <p className="text-sm text-rose-100">
                                        (%{result.purchasingPowerLossPercent.toFixed(1)} kayıp)
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => copyToClipboard(result.purchasingPowerLoss.toFixed(2), "loss")}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied === "loss" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <Separator />

                        <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Yıllık Değer Kaybı</p>
                            <div className="space-y-2">
                                {result.yearlyBreakdown.map((item) => (
                                    <div key={item.year} className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/50">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">
                                            {item.year === 0 ? "Bugün" : `${item.year}. Yıl`}
                                        </span>
                                        <div className="text-right">
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">{formatCurrency(item.real)}</span>
                                            {item.year > 0 && (
                                                <span className="text-xs text-red-600 ml-2">
                                                    -{((1 - item.real / result.futureNominalValue) * 100).toFixed(0)}%
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Enflasyon ve Satın Alma Gücü</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Enflasyon, para biriminin zaman içinde değer kaybetmesidir. Bugün 100 TL ile alabileceğiniz
                        ürünleri, enflasyon devam ettikçe aynı parayla alamazsınız. Bu hesaplama, paranızın
                        gelecekteki &quot;gerçek&quot; değerini gösterir.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
