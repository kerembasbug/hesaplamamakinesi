"use client"

import { useState, useEffect, useCallback } from "react"
import { Baby, Copy, Check, Heart, CalendarCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CalculationResult {
    dueDate: Date
    currentWeek: number
    currentDay: number
    remainingDays: number
    trimester: number
    progress: number
}

export function PregnancyCalculator() {
    const [lastPeriod, setLastPeriod] = useState<string>("")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        if (!lastPeriod) {
            setResult(null)
            return
        }

        const lmp = new Date(lastPeriod)
        if (isNaN(lmp.getTime())) {
            setResult(null)
            return
        }

        // Gebelik süresi: Son adet tarihinden 280 gün (40 hafta)
        const dueDate = new Date(lmp)
        dueDate.setDate(dueDate.getDate() + 280)

        const today = new Date()
        const daysSinceLMP = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24))

        const currentWeek = Math.floor(daysSinceLMP / 7)
        const currentDay = daysSinceLMP % 7
        const remainingDays = Math.max(0, 280 - daysSinceLMP)
        const progress = Math.min(100, (daysSinceLMP / 280) * 100)

        let trimester = 1
        if (currentWeek >= 13 && currentWeek < 27) trimester = 2
        else if (currentWeek >= 27) trimester = 3

        setResult({
            dueDate,
            currentWeek: Math.max(0, Math.min(40, currentWeek)),
            currentDay,
            remainingDays,
            trimester,
            progress
        })
    }, [lastPeriod])

    useEffect(() => {
        calculate()
    }, [calculate])

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
    }

    const copyToClipboard = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText(formatDate(result.dueDate))
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) { console.error("Kopyalama başarısız:", err) }
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Baby className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Gebelik Hesaplama</CardTitle>
                            <CardDescription className="text-pink-100">Tahmini doğum tarihini ve gebelik haftasını hesaplayın</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Son Adet Tarihi (SAT)</Label>
                        <Input
                            type="date"
                            value={lastPeriod}
                            onChange={(e) => setLastPeriod(e.target.value)}
                            className="h-12"
                        />
                        <p className="text-xs text-slate-500">Son adet döngünüzün ilk günü</p>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Heart className="h-5 w-5 text-pink-500" />Gebelik Bilgileri</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-pink-400 to-rose-400 text-white">
                            <div>
                                <p className="text-sm text-pink-100">Tahmini Doğum Tarihi</p>
                                <p className="text-2xl font-bold">{formatDate(result.dueDate)}</p>
                            </div>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className="p-4 rounded-lg bg-pink-50 dark:bg-pink-900/20">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-pink-600 font-semibold">Gebelik Haftası</span>
                                <span className="text-2xl font-bold text-pink-700">{result.currentWeek} hafta {result.currentDay} gün</span>
                            </div>
                            <div className="w-full bg-pink-200 rounded-full h-3">
                                <div className="bg-pink-500 h-3 rounded-full transition-all" style={{ width: `${result.progress}%` }}></div>
                            </div>
                            <div className="flex justify-between text-xs text-pink-500 mt-1">
                                <span>0 hafta</span>
                                <span>40 hafta</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.trimester}</p>
                                <p className="text-xs text-slate-500">Trimester</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.remainingDays}</p>
                                <p className="text-xs text-slate-500">Kalan Gün</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{Math.round(result.progress)}%</p>
                                <p className="text-xs text-slate-500">Tamamlandı</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
