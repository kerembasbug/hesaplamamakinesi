"use client"

import { useState, useCallback, useEffect } from "react"
import { Clock, Copy, Check, Calculator, ArrowRightLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function TimeCalculator() {
    const [startTime, setStartTime] = useState<string>("09:00")
    const [endTime, setEndTime] = useState<string>("17:30")
    const [result, setResult] = useState<{
        hours: number
        minutes: number
        totalMinutes: number
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const [startH, startM] = startTime.split(":").map(Number)
        const [endH, endM] = endTime.split(":").map(Number)

        if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) {
            setResult(null)
            return
        }

        let startTotal = (startH * 60) + startM
        let endTotal = (endH * 60) + endM

        // Gece vardiyası kontrolü (Bitiş zamanı başlangıçtan küçükse ertesi gün kabul et)
        if (endTotal < startTotal) {
            endTotal += 24 * 60
        }

        const diff = endTotal - startTotal
        const h = Math.floor(diff / 60)
        const m = diff % 60

        setResult({
            hours: h,
            minutes: m,
            totalMinutes: diff
        })
    }, [startTime, endTime])

    useEffect(() => {
        calculate()
    }, [calculate])

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`Süre: ${result.hours} saat ${result.minutes} dakika`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Clock className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Saat Hesaplama</CardTitle>
                            <CardDescription className="text-blue-100">
                                İki zaman arası farkı (çalışma süresi vb.) hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-[1fr,auto,1fr] items-center">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Başlangıç Zamanı</Label>
                            <Input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="h-12 text-lg text-center font-mono"
                            />
                        </div>
                        <div className="flex justify-center pt-6">
                            <ArrowRightLeft className="text-slate-400 rotate-90 sm:rotate-0" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Bitiş Zamanı</Label>
                            <Input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="h-12 text-lg text-center font-mono"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                Toplam Süre
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                Kopyala
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-2 gap-8 items-center">
                            <div className="text-center border-r">
                                <p className="text-sm text-slate-500 mb-2">Saat Cinsinden</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <p className="text-6xl font-black">{result.hours}</p>
                                    <p className="text-xl font-bold text-slate-400">saat</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-slate-500 mb-2">Dakika Cinsinden</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <p className="text-6xl font-black">{result.minutes}</p>
                                    <p className="text-xl font-bold text-slate-400">dk</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
                            <p className="text-slate-500">Toplam Dakika: <strong>{result.totalMinutes} dk</strong></p>
                            <p className="text-slate-500">Ondalık Saat: <strong>{(result.totalMinutes / 60).toFixed(2)} saat</strong></p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
