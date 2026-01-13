"use client"

import { useState, useEffect, useCallback } from "react"
import { PiggyBank, Copy, Check, Calculator, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

type TermType = "30" | "60" | "90" | "180" | "365"

interface CalculationResult {
    grossInterest: number
    taxAmount: number
    netInterest: number
    maturityAmount: number
}

export function DepositCalculator() {
    const [principal, setPrincipal] = useState<string>("")
    const [rate, setRate] = useState<string>("")
    const [termDays, setTermDays] = useState<TermType>("90")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState<string | null>(null)

    const calculateDeposit = useCallback(() => {
        const p = parseFloat(principal.replace(/,/g, "."))
        const annualRate = parseFloat(rate.replace(/,/g, "."))
        const days = parseInt(termDays)

        if (isNaN(p) || isNaN(annualRate) || p <= 0 || annualRate <= 0) {
            setResult(null)
            return
        }

        // Simple interest calculation: I = P * r * t
        const grossInterest = (p * (annualRate / 100) * days) / 365
        const taxRate = 0.15 // 15% stopaj
        const taxAmount = grossInterest * taxRate
        const netInterest = grossInterest - taxAmount
        const maturityAmount = p + netInterest

        setResult({
            grossInterest: Math.round(grossInterest * 100) / 100,
            taxAmount: Math.round(taxAmount * 100) / 100,
            netInterest: Math.round(netInterest * 100) / 100,
            maturityAmount: Math.round(maturityAmount * 100) / 100
        })
    }, [principal, rate, termDays])

    useEffect(() => {
        calculateDeposit()
    }, [calculateDeposit])

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

    const termOptions = [
        { value: "30", label: "1 Ay", description: "30 gün" },
        { value: "60", label: "2 Ay", description: "60 gün" },
        { value: "90", label: "3 Ay", description: "90 gün" },
        { value: "180", label: "6 Ay", description: "180 gün" },
        { value: "365", label: "1 Yıl", description: "365 gün" }
    ]

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <PiggyBank className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Mevduat Faizi Hesaplama</CardTitle>
                            <CardDescription className="text-emerald-100">
                                Vadeli mevduat getirinizi hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
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
                                    placeholder="50.000"
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pl-8 h-12 border-slate-300 focus:border-emerald-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rate" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Yıllık Faiz Oranı (%)
                            </Label>
                            <div className="relative">
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                <Input
                                    id="rate"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="45"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pr-8 h-12 border-slate-300 focus:border-emerald-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Vade Süresi
                        </Label>
                        <RadioGroup
                            value={termDays}
                            onValueChange={(value) => setTermDays(value as TermType)}
                            className="grid grid-cols-5 gap-2"
                        >
                            {termOptions.map((option) => (
                                <Label
                                    key={option.value}
                                    htmlFor={`term-${option.value}`}
                                    className={`
                    flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all
                    ${termDays === option.value
                                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30"
                                            : "border-slate-200 hover:border-slate-300 dark:border-slate-700"
                                        }
                  `}
                                >
                                    <RadioGroupItem value={option.value} id={`term-${option.value}`} className="sr-only" />
                                    <span className={`text-sm font-bold ${termDays === option.value ? "text-emerald-600" : "text-slate-700 dark:text-slate-300"}`}>
                                        {option.label}
                                    </span>
                                    <span className="text-xs text-slate-500">{option.description}</span>
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
                            <Calculator className="h-5 w-5 text-emerald-500" />
                            Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Brüt Faiz</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                                        {formatCurrency(result.grossInterest)}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.grossInterest.toFixed(2), "gross")}>
                                    {copied === "gross" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                                <div>
                                    <p className="text-sm text-red-600 dark:text-red-400">Stopaj (%15)</p>
                                    <p className="text-xl font-bold text-red-700 dark:text-red-300">
                                        -{formatCurrency(result.taxAmount)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
                            <div>
                                <p className="text-sm text-emerald-600 dark:text-emerald-400">Net Faiz Getirisi</p>
                                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                                    {formatCurrency(result.netInterest)}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(result.netInterest.toFixed(2), "net")}
                                className="text-emerald-600 hover:bg-emerald-100"
                            >
                                {copied === "net" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                            <div>
                                <p className="text-sm text-emerald-100">Vade Sonu Toplam</p>
                                <p className="text-3xl font-bold">{formatCurrency(result.maturityAmount)}</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => copyToClipboard(result.maturityAmount.toFixed(2), "total")}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied === "total" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            <p className="font-medium text-slate-900 dark:text-white mb-1">Stopaj Hakkında</p>
                            <p>Vadeli mevduat faiz gelirlerinden %15 oranında stopaj (vergi kesintisi) yapılmaktadır.
                                Hesaplanan net faiz tutarı, stopaj düşüldükten sonraki tutardır.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
