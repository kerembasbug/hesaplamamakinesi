"use client"

import { useState } from "react"
import { Plus, Minus, Calculator, CalendarDays } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function DateAddCalculator() {
    const [baseDate, setBaseDate] = useState("")
    const [days, setDays] = useState("")
    const [months, setMonths] = useState("")
    const [years, setYears] = useState("")
    const [operation, setOperation] = useState<"add" | "subtract">("add")
    const [result, setResult] = useState<string | null>(null)

    const calculate = () => {
        if (!baseDate) return

        const date = new Date(baseDate)
        if (isNaN(date.getTime())) return

        const daysNum = parseInt(days) || 0
        const monthsNum = parseInt(months) || 0
        const yearsNum = parseInt(years) || 0

        const multiplier = operation === "add" ? 1 : -1

        date.setFullYear(date.getFullYear() + yearsNum * multiplier)
        date.setMonth(date.getMonth() + monthsNum * multiplier)
        date.setDate(date.getDate() + daysNum * multiplier)

        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        setResult(date.toLocaleDateString('tr-TR', options))
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><CalendarDays className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Tarih Ekleme / Çıkarma</CardTitle>
                            <CardDescription className="text-emerald-100">Tarihe gün, ay veya yıl ekleyin veya çıkarın</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label>Başlangıç Tarihi</Label>
                        <Input
                            type="date"
                            value={baseDate}
                            onChange={(e) => setBaseDate(e.target.value)}
                            className="h-12"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            variant={operation === "add" ? "default" : "outline"}
                            className={operation === "add" ? "bg-emerald-600" : ""}
                            onClick={() => setOperation("add")}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Ekle
                        </Button>
                        <Button
                            variant={operation === "subtract" ? "default" : "outline"}
                            className={operation === "subtract" ? "bg-red-600" : ""}
                            onClick={() => setOperation("subtract")}
                        >
                            <Minus className="h-4 w-4 mr-2" />
                            Çıkar
                        </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Yıl</Label>
                            <Input
                                type="number"
                                min="0"
                                placeholder="0"
                                value={years}
                                onChange={(e) => setYears(e.target.value)}
                                className="h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Ay</Label>
                            <Input
                                type="number"
                                min="0"
                                placeholder="0"
                                value={months}
                                onChange={(e) => setMonths(e.target.value)}
                                className="h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Gün</Label>
                            <Input
                                type="number"
                                min="0"
                                placeholder="0"
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                                className="h-12"
                            />
                        </div>
                    </div>

                    <Button onClick={calculate} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700">
                        <Calculator className="h-4 w-4 mr-2" />
                        Hesapla
                    </Button>

                    {result && (
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-center">
                            <p className="text-sm text-emerald-600 dark:text-emerald-400">Sonuç Tarihi</p>
                            <p className="text-xl font-bold text-emerald-800 dark:text-emerald-200">{result}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
