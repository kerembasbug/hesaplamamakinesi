"use client"

import { useState, useCallback, useEffect } from "react"
import { Briefcase, Copy, Check, Calculator, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function WageDifferenceCalculator() {
    const [currentWage, setCurrentWage] = useState<string>("50000")
    const [newWage, setNewWage] = useState<string>("60000")
    const [result, setResult] = useState<{
        maasFarki: number
        toplamOdeme: number
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const cw = parseFloat(currentWage.replace(",", "."))
        const nw = parseFloat(newWage.replace(",", "."))

        if (isNaN(cw) || isNaN(nw) || cw <= 0 || nw <= 0) {
            setResult(null)
            return
        }

        const maasFarki = (nw - cw) / 2

        setResult({
            maasFarki: Math.round(maasFarki * 100) / 100,
            toplamOdeme: Math.round(maasFarki * 100) / 100
        })
    }, [currentWage, newWage])

    useEffect(() => {
        calculate()
    }, [calculate])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(value)
    }

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`15 Günlük Maaş Farkı: ${formatCurrency(result.maasFarki)}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-700 to-cyan-700 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Briefcase className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">15 Günlük Maaş Farkı</CardTitle>
                            <CardDescription className="text-blue-100">
                                Memur ve kamu personeli zam farkı hesaplayıcı
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Eski Brüt/Net Maaş (₺)</Label>
                            <Input
                                type="text"
                                placeholder="Örn: 50.000"
                                value={currentWage}
                                onChange={(e) => setCurrentWage(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-12 text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Yeni Brüt/Net Maaş (₺)</Label>
                            <Input
                                type="text"
                                placeholder="Örn: 60.000"
                                value={newWage}
                                onChange={(e) => setNewWage(e.target.value.replace(/[^0-9.,]/g, ""))}
                                className="h-12 text-lg"
                            />
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 text-sm">
                        <Info className="h-4 w-4 inline mr-2 text-blue-600" />
                        Memurlar maaşlarını peşin alır. Ocak ve Temmuz aylarındaki zamlı maaşların 15 günlük farkı bu şekilde hesaplanır.
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                Hesaplanan Fark
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 text-center">
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900">
                            <p className="text-sm text-slate-500 mb-2 uppercase font-bold tracking-wider">Maaş Farkı Tutarı</p>
                            <p className="text-5xl font-black text-indigo-600 dark:text-indigo-400">{formatCurrency(result.maasFarki)}</p>
                            <div className="mt-6 flex justify-center gap-4 text-sm text-slate-500">
                                <span>Zam Oranı: <strong>%{((parseFloat(newWage) - parseFloat(currentWage)) / parseFloat(currentWage) * 100).toFixed(2)}</strong></span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
