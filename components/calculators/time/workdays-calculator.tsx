"use client"

import { useState } from "react"
import { Calendar, Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function WorkdaysCalculator() {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [excludeSaturday, setExcludeSaturday] = useState(true)
    const [excludeSunday, setExcludeSunday] = useState(true)
    const [result, setResult] = useState<{
        totalDays: number
        workdays: number
        weekends: number
    } | null>(null)

    const calculate = () => {
        if (!startDate || !endDate) return

        const start = new Date(startDate)
        const end = new Date(endDate)

        if (isNaN(start.getTime()) || isNaN(end.getTime())) return
        if (end < start) return

        let workdays = 0
        let weekends = 0
        let totalDays = 0

        const current = new Date(start)
        while (current <= end) {
            totalDays++
            const dayOfWeek = current.getDay()
            const isSaturday = dayOfWeek === 6
            const isSunday = dayOfWeek === 0

            if ((isSaturday && excludeSaturday) || (isSunday && excludeSunday)) {
                weekends++
            } else {
                workdays++
            }
            current.setDate(current.getDate() + 1)
        }

        setResult({
            totalDays,
            workdays,
            weekends
        })
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Calendar className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Çalışma Günleri Hesaplama</CardTitle>
                            <CardDescription className="text-teal-100">İş günlerini hesaplayın</CardDescription>
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

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="saturday"
                                checked={excludeSaturday}
                                onChange={(e) => setExcludeSaturday(e.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <Label htmlFor="saturday" className="text-sm cursor-pointer">Cumartesi hariç tut</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="sunday"
                                checked={excludeSunday}
                                onChange={(e) => setExcludeSunday(e.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <Label htmlFor="sunday" className="text-sm cursor-pointer">Pazar hariç tut</Label>
                        </div>
                    </div>

                    <Button onClick={calculate} className="w-full h-12 bg-teal-600 hover:bg-teal-700">
                        <Calculator className="h-4 w-4 mr-2" />
                        Hesapla
                    </Button>

                    {result && (
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-center">
                                <p className="text-sm text-teal-600 dark:text-teal-400">Toplam Gün</p>
                                <p className="text-2xl font-bold text-teal-800 dark:text-teal-200">{result.totalDays}</p>
                            </div>
                            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg text-center">
                                <p className="text-sm text-cyan-600 dark:text-cyan-400">İş Günü</p>
                                <p className="text-2xl font-bold text-cyan-800 dark:text-cyan-200">{result.workdays}</p>
                            </div>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                                <p className="text-sm text-blue-600 dark:text-blue-400">Hafta Sonu</p>
                                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{result.weekends}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
