"use client"

import { useState, useEffect, useCallback } from "react"
import { CreditCard, Copy, Check, Calculator, TrendingUp, PiggyBank } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface CalculationResult {
    monthlyPayment: number
    totalPayment: number
    totalInterest: number
    schedule: { month: number; payment: number; principal: number; interest: number; balance: number }[]
}

export function LoanCalculator() {
    const [principal, setPrincipal] = useState<string>("")
    const [rate, setRate] = useState<string>("")
    const [term, setTerm] = useState<string>("")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState<string | null>(null)
    const [showSchedule, setShowSchedule] = useState(false)

    const calculateLoan = useCallback(() => {
        const p = parseFloat(principal.replace(/,/g, "."))
        const annualRate = parseFloat(rate.replace(/,/g, "."))
        const months = parseInt(term)

        if (isNaN(p) || isNaN(annualRate) || isNaN(months) || p <= 0 || annualRate <= 0 || months <= 0) {
            setResult(null)
            return
        }

        const monthlyRate = annualRate / 100 / 12
        const monthlyPayment = (p * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
        const totalPayment = monthlyPayment * months
        const totalInterest = totalPayment - p

        // Generate amortization schedule
        const schedule: CalculationResult["schedule"] = []
        let balance = p
        for (let month = 1; month <= Math.min(months, 12); month++) {
            const interest = balance * monthlyRate
            const principalPart = monthlyPayment - interest
            balance -= principalPart
            schedule.push({
                month,
                payment: Math.round(monthlyPayment * 100) / 100,
                principal: Math.round(principalPart * 100) / 100,
                interest: Math.round(interest * 100) / 100,
                balance: Math.max(0, Math.round(balance * 100) / 100)
            })
        }

        setResult({
            monthlyPayment: Math.round(monthlyPayment * 100) / 100,
            totalPayment: Math.round(totalPayment * 100) / 100,
            totalInterest: Math.round(totalInterest * 100) / 100,
            schedule
        })
    }, [principal, rate, term])

    useEffect(() => {
        calculateLoan()
    }, [calculateLoan])

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
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <CreditCard className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Kredi Hesaplama</CardTitle>
                            <CardDescription className="text-indigo-100">
                                Aylık taksit ve toplam geri ödeme tutarını hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="principal" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Kredi Tutarı (₺)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₺</span>
                                <Input
                                    id="principal"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="100.000"
                                    value={principal}
                                    onChange={(e) => setPrincipal(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pl-8 h-12 border-slate-300 focus:border-indigo-500"
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
                                    placeholder="2.49"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pr-8 h-12 border-slate-300 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="term" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Vade (Ay)
                            </Label>
                            <Input
                                id="term"
                                type="number"
                                placeholder="36"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                className="h-12 border-slate-300 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-indigo-500" />
                            Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
                            <div>
                                <p className="text-sm text-indigo-100">Aylık Taksit</p>
                                <p className="text-3xl font-bold">{formatCurrency(result.monthlyPayment)}</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => copyToClipboard(result.monthlyPayment.toFixed(2), "monthly")}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied === "monthly" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Toplam Geri Ödeme</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                                        {formatCurrency(result.totalPayment)}
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => copyToClipboard(result.totalPayment.toFixed(2), "total")}
                                >
                                    {copied === "total" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                                <div>
                                    <p className="text-sm text-red-600 dark:text-red-400">Toplam Faiz</p>
                                    <p className="text-xl font-bold text-red-700 dark:text-red-300">
                                        {formatCurrency(result.totalInterest)}
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => copyToClipboard(result.totalInterest.toFixed(2), "interest")}
                                    className="text-red-600 hover:bg-red-100"
                                >
                                    {copied === "interest" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <Button
                                variant="outline"
                                onClick={() => setShowSchedule(!showSchedule)}
                                className="w-full"
                            >
                                {showSchedule ? "Ödeme Planını Gizle" : "Ödeme Planını Göster (İlk 12 Ay)"}
                            </Button>

                            {showSchedule && (
                                <div className="mt-4 overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                                <th className="py-2 px-3 text-left font-medium text-slate-600 dark:text-slate-400">Ay</th>
                                                <th className="py-2 px-3 text-right font-medium text-slate-600 dark:text-slate-400">Taksit</th>
                                                <th className="py-2 px-3 text-right font-medium text-slate-600 dark:text-slate-400">Anapara</th>
                                                <th className="py-2 px-3 text-right font-medium text-slate-600 dark:text-slate-400">Faiz</th>
                                                <th className="py-2 px-3 text-right font-medium text-slate-600 dark:text-slate-400">Kalan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.schedule.map((row) => (
                                                <tr key={row.month} className="border-b border-slate-100 dark:border-slate-800">
                                                    <td className="py-2 px-3 text-slate-900 dark:text-white">{row.month}</td>
                                                    <td className="py-2 px-3 text-right text-slate-900 dark:text-white">{formatCurrency(row.payment)}</td>
                                                    <td className="py-2 px-3 text-right text-green-600">{formatCurrency(row.principal)}</td>
                                                    <td className="py-2 px-3 text-right text-red-600">{formatCurrency(row.interest)}</td>
                                                    <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-400">{formatCurrency(row.balance)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                    <div className="grid sm:grid-cols-3 gap-4 text-center">
                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <PiggyBank className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                            <p className="text-xs text-slate-600 dark:text-slate-400">İhtiyaç Kredisi</p>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">%2.49 - %4.99</p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                            <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
                            <p className="text-xs text-slate-600 dark:text-slate-400">Konut Kredisi</p>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">%1.89 - %2.79</p>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                            <CreditCard className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                            <p className="text-xs text-slate-600 dark:text-slate-400">Taşıt Kredisi</p>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">%2.29 - %3.49</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
