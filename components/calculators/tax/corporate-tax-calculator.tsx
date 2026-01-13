"use client"

import { useState, useEffect, useCallback } from "react"
import { Building2, Copy, Check, Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface CalculationResult {
    annualProfit: number
    taxRate: number
    corporateTax: number
    netProfit: number
}

export function CorporateTaxCalculator() {
    const [annualProfit, setAnnualProfit] = useState<string>("")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState<string | null>(null)

    const calculateCorporateTax = useCallback(() => {
        const profit = parseFloat(annualProfit.replace(/,/g, "."))

        if (isNaN(profit) || profit <= 0) {
            setResult(null)
            return
        }

        // 2024 Kurumlar Vergisi Oranı: %25
        const taxRate = 0.25
        const corporateTax = profit * taxRate
        const netProfit = profit - corporateTax

        setResult({
            annualProfit: profit,
            taxRate: taxRate * 100,
            corporateTax: Math.round(corporateTax * 100) / 100,
            netProfit: Math.round(netProfit * 100) / 100
        })
    }, [annualProfit])

    useEffect(() => {
        calculateCorporateTax()
    }, [calculateCorporateTax])

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
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
                <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Kurumlar Vergisi Hesaplama</CardTitle>
                            <CardDescription className="text-slate-300">
                                Şirket kazancı üzerinden ödenecek kurumlar vergisini hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="annualProfit" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Yıllık Kurum Kazancı (₺)
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₺</span>
                            <Input
                                id="annualProfit"
                                type="text"
                                inputMode="decimal"
                                placeholder="1.000.000"
                                value={annualProfit}
                                onChange={(e) => setAnnualProfit(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="pl-8 h-12 text-lg border-slate-300 focus:border-slate-500"
                            />
                        </div>
                        <p className="text-xs text-slate-500">Vergi matrahını (indirimler düşüldükten sonra) girin</p>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-slate-500" />
                            Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Yıllık Kazanç</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">
                                    {formatCurrency(result.annualProfit)}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Vergi Oranı</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">
                                    %{result.taxRate}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                            <div>
                                <p className="text-sm text-red-600 dark:text-red-400">Kurumlar Vergisi</p>
                                <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                                    {formatCurrency(result.corporateTax)}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(result.corporateTax.toFixed(0), "tax")}
                                className="text-red-600 hover:bg-red-100"
                            >
                                {copied === "tax" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                            <div>
                                <p className="text-sm text-green-100">Vergi Sonrası Net Kazanç</p>
                                <p className="text-3xl font-bold">{formatCurrency(result.netProfit)}</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => copyToClipboard(result.netProfit.toFixed(0), "net")}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied === "net" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Kurumlar Vergisi Hakkında</h3>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li>• 2024 yılı için kurumlar vergisi oranı <strong>%25</strong>&apos;tir</li>
                        <li>• İhracat, Ar-Ge ve teknoloji geliştirme bölgelerinde indirimli oranlar uygulanabilir</li>
                        <li>• Beyanname Nisan ayının son gününe kadar verilmelidir</li>
                        <li>• Geçici vergi üçer aylık dönemlerde beyan edilir</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}
