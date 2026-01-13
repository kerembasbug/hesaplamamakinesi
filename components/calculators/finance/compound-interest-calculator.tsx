"use client"

import { useState, useEffect, useCallback } from "react"
import { TrendingUp, Copy, Check, Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

type CompoundFrequency = "1" | "4" | "12" | "365"

interface CalculationResult {
    futureValue: number
    totalInterest: number
    effectiveRate: number
    yearlyBreakdown: { year: number; value: number; interest: number }[]
}

export function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState<string>("")
    const [rate, setRate] = useState<string>("")
    const [years, setYears] = useState<string>("")
    const [frequency, setFrequency] = useState<CompoundFrequency>("12")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState<string | null>(null)

    const calculateCompoundInterest = useCallback(() => {
        const p = parseFloat(principal.replace(/,/g, "."))
        const r = parseFloat(rate.replace(/,/g, ".")) / 100
        const t = parseInt(years)
        const n = parseInt(frequency)

        if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
            setResult(null)
            return
        }

        // A = P(1 + r/n)^(nt)
        const futureValue = p * Math.pow(1 + r / n, n * t)
        const totalInterest = futureValue - p

        // Effective annual rate = (1 + r/n)^n - 1
        const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100

        // Yearly breakdown
        const yearlyBreakdown: CalculationResult["yearlyBreakdown"] = []
        for (let year = 1; year <= t; year++) {
            const value = p * Math.pow(1 + r / n, n * year)
            const prevValue = year === 1 ? p : p * Math.pow(1 + r / n, n * (year - 1))
            yearlyBreakdown.push({
                year,
                value: Math.round(value * 100) / 100,
                interest: Math.round((value - prevValue) * 100) / 100
            })
        }

        setResult({
            futureValue: Math.round(futureValue * 100) / 100,
            totalInterest: Math.round(totalInterest * 100) / 100,
            effectiveRate: Math.round(effectiveRate * 100) / 100,
            yearlyBreakdown
        })
    }, [principal, rate, years, frequency])

    useEffect(() => {
        calculateCompoundInterest()
    }, [calculateCompoundInterest])

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

    const frequencyOptions = [
        { value: "1", label: "Yıllık" },
        { value: "4", label: "3 Aylık" },
        { value: "12", label: "Aylık" },
        { value: "365", label: "Günlük" }
    ]

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Bileşik Faiz Hesaplama</CardTitle>
                            <CardDescription className="text-purple-100">
                                Faizin faize eklenmesiyle oluşan toplam getiriyi hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="principal" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Anapara (₺)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₺</span>
                                <Input
                                    id="principal"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="10.000"
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pl-8 h-12 border-slate-300 focus:border-purple-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rate" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Yıllık Faiz (%)
                            </Label>
                            <div className="relative">
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                <Input
                                    id="rate"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="40"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pr-8 h-12 border-slate-300 focus:border-purple-500"
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
                                className="h-12 border-slate-300 focus:border-purple-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Bileşik Periyodu
                        </Label>
                        <RadioGroup
                            value={frequency}
                            onValueChange={(value) => setFrequency(value as CompoundFrequency)}
                            className="grid grid-cols-4 gap-2"
                        >
                            {frequencyOptions.map((option) => (
                                <Label
                                    key={option.value}
                                    htmlFor={`freq-${option.value}`}
                                    className={`
                    flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all
                    ${frequency === option.value
                                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                                        }
                  `}
                                >
                                    <RadioGroupItem value={option.value} id={`freq-${option.value}`} className="sr-only" />
                                    <span className={`text-sm font-medium ${frequency === option.value ? "text-purple-600" : "text-slate-700 dark:text-slate-300"}`}>
                                        {option.label}
                                    </span>
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-purple-500" />
                            Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                            <div>
                                <p className="text-sm text-purple-100">Gelecek Değer</p>
                                <p className="text-3xl font-bold">{formatCurrency(result.futureValue)}</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => copyToClipboard(result.futureValue.toFixed(2), "future")}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied === "future" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                                <div>
                                    <p className="text-sm text-green-600 dark:text-green-400">Toplam Faiz Kazancı</p>
                                    <p className="text-xl font-bold text-green-700 dark:text-green-300">
                                        {formatCurrency(result.totalInterest)}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.totalInterest.toFixed(2), "interest")} className="text-green-600">
                                    {copied === "interest" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Efektif Yıllık Oran</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                                        %{result.effectiveRate.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Yıllık Büyüme</p>
                            <div className="space-y-2">
                                {result.yearlyBreakdown.slice(0, 5).map((item) => (
                                    <div key={item.year} className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/50">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">{item.year}. Yıl</span>
                                        <div className="text-right">
                                            <span className="text-sm font-medium text-slate-900 dark:text-white">{formatCurrency(item.value)}</span>
                                            <span className="text-xs text-green-600 ml-2">+{formatCurrency(item.interest)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
