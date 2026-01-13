"use client"

import { useState, useEffect, useCallback } from "react"
import { Cake, Copy, Check, Star, Heart, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface CalculationResult {
    ageYears: number
    ageMonths: number
    ageDays: number
    totalDays: number
    totalWeeks: number
    totalHours: number
    nextBirthday: Date
    daysUntilBirthday: number
    zodiacSign: string
    chineseZodiac: string
}

const zodiacSigns = [
    { name: "Oğlak", start: [12, 22], end: [1, 19] },
    { name: "Kova", start: [1, 20], end: [2, 18] },
    { name: "Balık", start: [2, 19], end: [3, 20] },
    { name: "Koç", start: [3, 21], end: [4, 19] },
    { name: "Boğa", start: [4, 20], end: [5, 20] },
    { name: "İkizler", start: [5, 21], end: [6, 20] },
    { name: "Yengeç", start: [6, 21], end: [7, 22] },
    { name: "Aslan", start: [7, 23], end: [8, 22] },
    { name: "Başak", start: [8, 23], end: [9, 22] },
    { name: "Terazi", start: [9, 23], end: [10, 22] },
    { name: "Akrep", start: [10, 23], end: [11, 21] },
    { name: "Yay", start: [11, 22], end: [12, 21] }
]

const chineseZodiacs = ["Maymun", "Horoz", "Köpek", "Domuz", "Fare", "Öküz", "Kaplan", "Tavşan", "Ejderha", "Yılan", "At", "Koyun"]

export function AgeCalculator() {
    const [birthDate, setBirthDate] = useState<string>("")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState(false)

    const getZodiacSign = (month: number, day: number): string => {
        for (const sign of zodiacSigns) {
            const [startMonth, startDay] = sign.start
            const [endMonth, endDay] = sign.end
            if (startMonth === endMonth) {
                if (month === startMonth && day >= startDay && day <= endDay) return sign.name
            } else if (startMonth > endMonth) {
                if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) return sign.name
            } else {
                if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay) || (month > startMonth && month < endMonth)) return sign.name
            }
        }
        return "Oğlak"
    }

    const calculate = useCallback(() => {
        if (!birthDate) { setResult(null); return }
        const birth = new Date(birthDate)
        if (isNaN(birth.getTime())) { setResult(null); return }

        const today = new Date()
        const diffTime = today.getTime() - birth.getTime()
        const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

        let years = today.getFullYear() - birth.getFullYear()
        let months = today.getMonth() - birth.getMonth()
        let days = today.getDate() - birth.getDate()

        if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate() }
        if (months < 0) { years--; months += 12 }

        const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
        if (nextBirthday <= today) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
        const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

        const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate())
        const chineseZodiac = chineseZodiacs[birth.getFullYear() % 12]

        setResult({
            ageYears: years, ageMonths: months, ageDays: days, totalDays, totalWeeks: Math.floor(totalDays / 7),
            totalHours: totalDays * 24, nextBirthday, daysUntilBirthday, zodiacSign, chineseZodiac
        })
    }, [birthDate])

    useEffect(() => { calculate() }, [calculate])

    const copyToClipboard = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText(`${result.ageYears} yaş ${result.ageMonths} ay ${result.ageDays} gün`)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) { console.error("Kopyalama başarısız:", err) }
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Cake className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Yaş Hesaplama</CardTitle>
                            <CardDescription className="text-amber-100">Doğum tarihinize göre yaşınızı hesaplayın</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Doğum Tarihi</Label>
                        <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="h-12" />
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                            <div>
                                <p className="text-sm text-amber-100">Yaşınız</p>
                                <p className="text-3xl font-bold">{result.ageYears} yıl {result.ageMonths} ay {result.ageDays} gün</p>
                            </div>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{result.totalDays.toLocaleString("tr-TR")}</p>
                                <p className="text-xs text-slate-500">Gün</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{result.totalWeeks.toLocaleString("tr-TR")}</p>
                                <p className="text-xs text-slate-500">Hafta</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800">
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{result.totalHours.toLocaleString("tr-TR")}</p>
                                <p className="text-xs text-slate-500">Saat</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center gap-3">
                                <Calendar className="h-6 w-6 text-amber-600" />
                                <div>
                                    <p className="text-xs text-amber-600">Sonraki Doğum Günü</p>
                                    <p className="font-semibold text-amber-700">{result.daysUntilBirthday} gün sonra</p>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center gap-3">
                                <Star className="h-6 w-6 text-purple-600" />
                                <div>
                                    <p className="text-xs text-purple-600">Burç</p>
                                    <p className="font-semibold text-purple-700">{result.zodiacSign}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
