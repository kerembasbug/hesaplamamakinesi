"use client"

import { useState, useEffect, useCallback } from "react"
import { FileText, Copy, Check, Calculator, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// 2024 Gelir Vergisi Dilimleri
const taxBrackets2024 = [
    { limit: 110000, rate: 0.15 },
    { limit: 230000, rate: 0.20 },
    { limit: 580000, rate: 0.27 },
    { limit: 3000000, rate: 0.35 },
    { limit: Infinity, rate: 0.40 }
]

interface CalculationResult {
    grossSalary: number
    sgkEmployee: number
    unemploymentEmployee: number
    stampTax: number
    incomeTax: number
    netSalary: number
    taxBracket: number
    cumulativeTax: number
}

export function IncomeTaxCalculator() {
    const [grossSalary, setGrossSalary] = useState<string>("")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState<string | null>(null)

    const calculateIncomeTax = useCallback(() => {
        const gross = parseFloat(grossSalary.replace(/,/g, "."))

        if (isNaN(gross) || gross <= 0) {
            setResult(null)
            return
        }

        // SGK İşçi Payı (%14)
        const sgkEmployee = gross * 0.14

        // İşsizlik Sigortası İşçi Payı (%1)
        const unemploymentEmployee = gross * 0.01

        // SGK Matrahı (brüt - sgk kesintileri)
        const sgkBase = gross - sgkEmployee - unemploymentEmployee

        // Damga Vergisi (%0.759)
        const stampTax = gross * 0.00759

        // Gelir Vergisi Matrahı
        const taxableIncome = sgkBase

        // Kümülatif yıllık gelir için basitleştirilmiş hesaplama (aylık)
        // Gerçek hesaplamada yıllık kümülatif gelir takip edilmelidir
        let incomeTax = 0
        let remainingIncome = taxableIncome * 12 // Yıllık varsayım
        let currentBracket = 0

        for (const bracket of taxBrackets2024) {
            if (remainingIncome <= 0) break

            const prevLimit = currentBracket === 0 ? 0 : taxBrackets2024[currentBracket - 1].limit
            const taxableInBracket = Math.min(remainingIncome, bracket.limit - prevLimit)

            if (taxableInBracket > 0) {
                incomeTax += taxableInBracket * bracket.rate
                remainingIncome -= taxableInBracket
            }
            currentBracket++
        }

        // Aylık gelir vergisi
        const monthlyIncomeTax = incomeTax / 12

        // Hangi dilimde
        const yearlyIncome = taxableIncome * 12
        let bracketRate = 15
        for (let i = 0; i < taxBrackets2024.length; i++) {
            if (yearlyIncome <= taxBrackets2024[i].limit) {
                bracketRate = taxBrackets2024[i].rate * 100
                break
            }
        }

        // Net Maaş
        const netSalary = gross - sgkEmployee - unemploymentEmployee - stampTax - monthlyIncomeTax

        setResult({
            grossSalary: gross,
            sgkEmployee: Math.round(sgkEmployee * 100) / 100,
            unemploymentEmployee: Math.round(unemploymentEmployee * 100) / 100,
            stampTax: Math.round(stampTax * 100) / 100,
            incomeTax: Math.round(monthlyIncomeTax * 100) / 100,
            netSalary: Math.round(netSalary * 100) / 100,
            taxBracket: bracketRate,
            cumulativeTax: Math.round(incomeTax * 100) / 100
        })
    }, [grossSalary])

    useEffect(() => {
        calculateIncomeTax()
    }, [calculateIncomeTax])

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
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Gelir Vergisi Hesaplama</CardTitle>
                            <CardDescription className="text-blue-100">
                                Brüt maaşınızdan net maaşınızı ve vergi kesintilerinizi hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="grossSalary" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Brüt Maaş (₺)
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₺</span>
                            <Input
                                id="grossSalary"
                                type="text"
                                inputMode="decimal"
                                placeholder="50.000"
                                value={grossSalary}
                                onChange={(e) => setGrossSalary(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="pl-8 h-12 text-lg border-slate-300 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-blue-500" />
                            Maaş Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-600 dark:text-slate-400">Brüt Maaş</span>
                                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(result.grossSalary)}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-red-600">
                                    <span>SGK İşçi Payı (%14)</span>
                                    <span>-{formatCurrency(result.sgkEmployee)}</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span>İşsizlik Sigortası (%1)</span>
                                    <span>-{formatCurrency(result.unemploymentEmployee)}</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span>Damga Vergisi (%0.759)</span>
                                    <span>-{formatCurrency(result.stampTax)}</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span>Gelir Vergisi (%{result.taxBracket} dilimi)</span>
                                    <span>-{formatCurrency(result.incomeTax)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                            <div>
                                <p className="text-sm text-green-100">Net Maaş (Ele Geçen)</p>
                                <p className="text-3xl font-bold">{formatCurrency(result.netSalary)}</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => copyToClipboard(result.netSalary.toFixed(2), "net")}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied === "net" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                <strong>Vergi Dilimi:</strong> Yıllık geliriniz %{result.taxBracket} vergi dilimine karşılık gelmektedir.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            <p className="font-medium text-slate-900 dark:text-white mb-1">2024 Gelir Vergisi Dilimleri</p>
                            <ul className="space-y-1">
                                <li>0 - 110.000 TL: %15</li>
                                <li>110.000 - 230.000 TL: %20</li>
                                <li>230.000 - 580.000 TL: %27</li>
                                <li>580.000 - 3.000.000 TL: %35</li>
                                <li>3.000.000 TL üzeri: %40</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
