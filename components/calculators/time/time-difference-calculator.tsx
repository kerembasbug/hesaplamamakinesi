"use client"

import { useState } from "react"
import { Clock, Calculator } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function TimeDifferenceCalculator() {
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [result, setResult] = useState<{
        hours: number
        minutes: number
        totalMinutes: number
        decimal: number
    } | null>(null)

    const calculate = () => {
        if (!startTime || !endTime) return

        const [startHour, startMin] = startTime.split(':').map(Number)
        const [endHour, endMin] = endTime.split(':').map(Number)

        let startTotalMin = startHour * 60 + startMin
        let endTotalMin = endHour * 60 + endMin

        // Handle overnight (e.g., 22:00 to 06:00)
        if (endTotalMin < startTotalMin) {
            endTotalMin += 24 * 60
        }

        const diffMinutes = endTotalMin - startTotalMin
        const hours = Math.floor(diffMinutes / 60)
        const minutes = diffMinutes % 60
        const decimal = diffMinutes / 60

        setResult({
            hours,
            minutes,
            totalMinutes: diffMinutes,
            decimal
        })
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Clock className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Saat Farkı Hesaplama</CardTitle>
                            <CardDescription className="text-fuchsia-100">İki saat arasındaki farkı hesaplayın</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Başlangıç Saati</Label>
                            <Input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Bitiş Saati</Label>
                            <Input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="h-12"
                            />
                        </div>
                    </div>

                    <Button onClick={calculate} className="w-full h-12 bg-fuchsia-600 hover:bg-fuchsia-700">
                        <Calculator className="h-4 w-4 mr-2" />
                        Hesapla
                    </Button>

                    {result && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg text-center col-span-2">
                                <p className="text-sm text-fuchsia-600 dark:text-fuchsia-400">Süre</p>
                                <p className="text-3xl font-bold text-fuchsia-800 dark:text-fuchsia-200">
                                    {result.hours} saat {result.minutes} dakika
                                </p>
                            </div>
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                                <p className="text-sm text-purple-600 dark:text-purple-400">Toplam Dakika</p>
                                <p className="text-xl font-bold text-purple-800 dark:text-purple-200">{result.totalMinutes}</p>
                            </div>
                            <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg text-center">
                                <p className="text-sm text-violet-600 dark:text-violet-400">Ondalık Saat</p>
                                <p className="text-xl font-bold text-violet-800 dark:text-violet-200">{result.decimal.toFixed(2)}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
