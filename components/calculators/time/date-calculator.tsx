"use client"

import { useState, useEffect, useCallback } from "react"
import { Calendar, Copy, Check, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CalculationResult {
    years: number
    months: number
    weeks: number
    days: number
    hours: number
    minutes: number
    totalDays: number
}

export function DateCalculator() {
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        if (!startDate || !endDate) {
            setResult(null)
            return
        }

        const start = new Date(startDate)
        const end = new Date(endDate)

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            setResult(null)
            return
        }

        const diffTime = Math.abs(end.getTime() - start.getTime())
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        // Years, months, days breakdown
        let years = end.getFullYear() - start.getFullYear()
        let months = end.getMonth() - start.getMonth()
        let days = end.getDate() - start.getDate()

        if (days < 0) {
            months--
            const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0)
            days += prevMonth.getDate()
        }

        if (months < 0) {
            years--
            months += 12
        }

        const weeks = Math.floor(totalDays / 7)
        const hours = totalDays * 24
        const minutes = hours * 60

        setResult({
            years: Math.abs(years),
            months: Math.abs(months),
            weeks,
            days: Math.abs(days),
            hours,
            minutes,
            totalDays
        })
    }, [startDate, endDate])

    useEffect(() => {
        calculate()
    }, [calculate])

    const setToday = (field: "start" | "end") => {
        const today = new Date().toISOString().split("T")[0]
        if (field === "start") setStartDate(today)
        else setEndDate(today)
    }

    const copyToClipboard = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText(`${result.totalDays} gün`)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) { console.error("Kopyalama başarısız:", err) }
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Calendar className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Tarih Hesaplama</CardTitle>
                            <CardDescription className="text-blue-100">İki tarih arasındaki farkı hesaplayın</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label className="text-sm font-medium">Başlangıç Tarihi</Label>
                                <Button variant="link" size="sm" className="h-auto p-0 text-blue-600" onClick={() => setToday("start")}>Bugün</Button>
                            </div>
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label className="text-sm font-medium">Bitiş Tarihi</Label>
                                <Button variant="link" size="sm" className="h-auto p-0 text-blue-600" onClick={() => setToday("end")}>Bugün</Button>
                            </div>
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="h-12"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Clock className="h-5 w-5 text-blue-500" />Tarih Farkı</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                            <div>
                                <p className="text-sm text-blue-100">Toplam Gün</p>
                                <p className="text-4xl font-bold">{result.totalDays.toLocaleString("tr-TR")}</p>
                            </div>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <p className="text-lg font-semibold text-slate-900 dark:text-white">
                                {result.years > 0 && `${result.years} yıl `}
                                {result.months > 0 && `${result.months} ay `}
                                {result.days > 0 && `${result.days} gün`}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.weeks.toLocaleString("tr-TR")}</p>
                                <p className="text-xs text-slate-500">Hafta</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.totalDays.toLocaleString("tr-TR")}</p>
                                <p className="text-xs text-slate-500">Gün</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.hours.toLocaleString("tr-TR")}</p>
                                <p className="text-xs text-slate-500">Saat</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.minutes.toLocaleString("tr-TR")}</p>
                                <p className="text-xs text-slate-500">Dakika</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
