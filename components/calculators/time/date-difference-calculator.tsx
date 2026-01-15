"use client"

import { useState } from "react"
import { CalendarRange, Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function DateDifferenceCalculator() {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [result, setResult] = useState<{
        days: number
        weeks: number
        months: number
        years: number
        hours: number
        minutes: number
        weekdays: number
    } | null>(null)

    const calculate = () => {
        if (!startDate || !endDate) return

        const start = new Date(startDate)
        const end = new Date(endDate)

        if (isNaN(start.getTime()) || isNaN(end.getTime())) return

        const diffMs = Math.abs(end.getTime() - start.getTime())
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        const hours = Math.floor(diffMs / (1000 * 60 * 60))
        const minutes = Math.floor(diffMs / (1000 * 60))

        // Calculate weekdays
        let weekdays = 0
        const current = new Date(Math.min(start.getTime(), end.getTime()))
        const endTime = new Date(Math.max(start.getTime(), end.getTime()))
        while (current < endTime) {
            const dayOfWeek = current.getDay()
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                weekdays++
            }
            current.setDate(current.getDate() + 1)
        }

        // Calculate approximate months and years
        const years = Math.floor(days / 365.25)
        const months = Math.floor(days / 30.44)
        const weeks = Math.floor(days / 7)

        setResult({
            days,
            weeks,
            months,
            years,
            hours,
            minutes,
            weekdays
        })
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><CalendarRange className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Gün Farkı Hesaplama</CardTitle>
                            <CardDescription className="text-blue-100">İki tarih arasındaki farkı hesaplayın</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Başlangıç Tarihi</Label>
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Bitiş Tarihi</Label>
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="h-12"
                            />
                        </div>
                    </div>

                    <Button onClick={calculate} className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                        <Calculator className="h-4 w-4 mr-2" />
                        Hesapla
                    </Button>

                    {result && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                                <p className="text-sm text-blue-600 dark:text-blue-400">Gün</p>
                                <p className="text-xl font-bold text-blue-800 dark:text-blue-200">{result.days}</p>
                            </div>
                            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
                                <p className="text-sm text-indigo-600 dark:text-indigo-400">Hafta</p>
                                <p className="text-xl font-bold text-indigo-800 dark:text-indigo-200">{result.weeks}</p>
                            </div>
                            <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg text-center">
                                <p className="text-sm text-violet-600 dark:text-violet-400">Ay</p>
                                <p className="text-xl font-bold text-violet-800 dark:text-violet-200">{result.months}</p>
                            </div>
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                                <p className="text-sm text-purple-600 dark:text-purple-400">Yıl</p>
                                <p className="text-xl font-bold text-purple-800 dark:text-purple-200">{result.years}</p>
                            </div>
                            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg text-center">
                                <p className="text-sm text-cyan-600 dark:text-cyan-400">İş Günü</p>
                                <p className="text-xl font-bold text-cyan-800 dark:text-cyan-200">{result.weekdays}</p>
                            </div>
                            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-center">
                                <p className="text-sm text-teal-600 dark:text-teal-400">Saat</p>
                                <p className="text-xl font-bold text-teal-800 dark:text-teal-200">{result.hours.toLocaleString()}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
