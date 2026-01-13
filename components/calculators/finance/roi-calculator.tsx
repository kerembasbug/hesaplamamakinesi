"use client"

import { useState, useEffect, useCallback } from "react"
import { TrendingUp, Copy, Check, Calculator, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface CalculationResult {
    roi: number
    profit: number
    isProfit: boolean
}

export function RoiCalculator() {
    const [investment, setInvestment] = useState<string>("")
    const [finalValue, setFinalValue] = useState<string>("")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState<string | null>(null)

    const calculateROI = useCallback(() => {
        const inv = parseFloat(investment.replace(/,/g, "."))
        const final = parseFloat(finalValue.replace(/,/g, "."))

        if (isNaN(inv) || isNaN(final) || inv <= 0) {
            setResult(null)
            return
        }

        const profit = final - inv
        const roi = (profit / inv) * 100

        setResult({
            roi: Math.round(roi * 100) / 100,
            profit: Math.round(profit * 100) / 100,
            isProfit: profit >= 0
        })
    }, [investment, finalValue])

    useEffect(() => {
        calculateROI()
    }, [calculateROI])

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
                <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Yatırım Getirisi (ROI) Hesaplama</CardTitle>
                            <CardDescription className="text-cyan-100">
                                Yatırımınızın getirisini yüzde olarak hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="investment" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Yatırım Tutarı (₺)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₺</span>
                                <Input
                                    id="investment"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="10.000"
                                    value={investment}
                                    onChange={(e) => setInvestment(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pl-8 h-12 border-slate-300 focus:border-cyan-500"
                                />
                            </div>
                            <p className="text-xs text-slate-500">Başlangıç yatırımı</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="finalValue" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Son Değer (₺)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₺</span>
                                <Input
                                    id="finalValue"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="15.000"
                                    value={finalValue}
                                    onChange={(e) => setFinalValue(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pl-8 h-12 border-slate-300 focus:border-cyan-500"
                                />
                            </div>
                            <p className="text-xs text-slate-500">Mevcut veya satış değeri</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-cyan-500" />
                            Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className={`flex items-center justify-between p-4 rounded-lg ${result.isProfit
                                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                : "bg-gradient-to-r from-red-500 to-rose-500"
                            } text-white`}>
                            <div className="flex items-center gap-3">
                                {result.isProfit ? (
                                    <ArrowUpRight className="h-8 w-8" />
                                ) : (
                                    <ArrowDownRight className="h-8 w-8" />
                                )}
                                <div>
                                    <p className="text-sm opacity-90">Yatırım Getirisi (ROI)</p>
                                    <p className="text-4xl font-bold">
                                        {result.isProfit ? "+" : ""}{result.roi.toFixed(2)}%
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => copyToClipboard(result.roi.toFixed(2), "roi")}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied === "roi" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className={`flex items-center justify-between p-4 rounded-lg ${result.isProfit
                                ? "bg-green-50 dark:bg-green-900/20"
                                : "bg-red-50 dark:bg-red-900/20"
                            }`}>
                            <div>
                                <p className={`text-sm ${result.isProfit ? "text-green-600" : "text-red-600"}`}>
                                    {result.isProfit ? "Kar" : "Zarar"}
                                </p>
                                <p className={`text-2xl font-bold ${result.isProfit ? "text-green-700" : "text-red-700"}`}>
                                    {result.isProfit ? "+" : ""}{formatCurrency(result.profit)}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(result.profit.toFixed(2), "profit")}
                                className={result.isProfit ? "text-green-600 hover:bg-green-100" : "text-red-600 hover:bg-red-100"}
                            >
                                {copied === "profit" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3">ROI Nedir?</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        ROI (Return on Investment), yatırımın getirisini ölçen bir finansal metriktir.
                        Yatırımdan elde edilen karın, yatırım maliyetine oranını yüzde olarak gösterir.
                    </p>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <p className="text-sm font-mono text-center text-slate-700 dark:text-slate-300">
                            ROI = ((Son Değer - Yatırım) / Yatırım) × 100
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
