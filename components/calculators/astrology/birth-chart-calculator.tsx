"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type ZodiacSign = {
    name: string
    symbol: string
    element: string
    dates: string
}

const zodiacSigns: ZodiacSign[] = [
    { name: "Koç", symbol: "♈", element: "Ateş", dates: "21 Mart - 19 Nisan" },
    { name: "Boğa", symbol: "♉", element: "Toprak", dates: "20 Nisan - 20 Mayıs" },
    { name: "İkizler", symbol: "♊", element: "Hava", dates: "21 Mayıs - 20 Haziran" },
    { name: "Yengeç", symbol: "♋", element: "Su", dates: "21 Haziran - 22 Temmuz" },
    { name: "Aslan", symbol: "♌", element: "Ateş", dates: "23 Temmuz - 22 Ağustos" },
    { name: "Başak", symbol: "♍", element: "Toprak", dates: "23 Ağustos - 22 Eylül" },
    { name: "Terazi", symbol: "♎", element: "Hava", dates: "23 Eylül - 22 Ekim" },
    { name: "Akrep", symbol: "♏", element: "Su", dates: "23 Ekim - 21 Kasım" },
    { name: "Yay", symbol: "♐", element: "Ateş", dates: "22 Kasım - 21 Aralık" },
    { name: "Oğlak", symbol: "♑", element: "Toprak", dates: "22 Aralık - 19 Ocak" },
    { name: "Kova", symbol: "♒", element: "Hava", dates: "20 Ocak - 18 Şubat" },
    { name: "Balık", symbol: "♓", element: "Su", dates: "19 Şubat - 20 Mart" },
]

export function BirthChartCalculator() {
    const [birthDate, setBirthDate] = useState<string>("")
    const [birthTime, setBirthTime] = useState<string>("")
    const [birthCity, setBirthCity] = useState<string>("")
    const [result, setResult] = useState<{
        sunSign: ZodiacSign
        moonSign: ZodiacSign
        ascendant: ZodiacSign
        mercurySign: ZodiacSign
        venusSign: ZodiacSign
    } | null>(null)

    const getSunSign = (month: number, day: number): ZodiacSign => {
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return zodiacSigns[0] // Koç
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return zodiacSigns[1] // Boğa
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return zodiacSigns[2] // İkizler
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return zodiacSigns[3] // Yengeç
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return zodiacSigns[4] // Aslan
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return zodiacSigns[5] // Başak
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return zodiacSigns[6] // Terazi
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return zodiacSigns[7] // Akrep
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return zodiacSigns[8] // Yay
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return zodiacSigns[9] // Oğlak
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return zodiacSigns[10] // Kova
        return zodiacSigns[11] // Balık
    }

    const getAscendant = (hour: number, sunSignIndex: number): ZodiacSign => {
        // Basitleştirilmiş yükselen hesabı (yaklaşık)
        // Her 2 saatte bir yükselen değişir
        const ascendantOffset = Math.floor(hour / 2)
        const ascendantIndex = (sunSignIndex + ascendantOffset) % 12
        return zodiacSigns[ascendantIndex]
    }

    const calculate = () => {
        if (!birthDate) return

        const date = new Date(birthDate)
        const month = date.getMonth() + 1
        const day = date.getDate()

        const sunSign = getSunSign(month, day)
        const sunSignIndex = zodiacSigns.findIndex(z => z.name === sunSign.name)

        // Doğum saatine göre yükselen hesaplama
        let hour = 12 // Varsayılan
        if (birthTime) {
            const [h] = birthTime.split(":")
            hour = parseInt(h) || 12
        }
        const ascendant = getAscendant(hour, sunSignIndex)

        // Diğer gezegenler için basitleştirilmiş hesaplama
        // Gerçek hesaplama için astronomik tablolar gerekir
        const moonOffset = Math.floor((day + month) % 12)
        const moonSign = zodiacSigns[(sunSignIndex + moonOffset) % 12]

        const mercuryOffset = Math.floor(day % 3)
        const mercurySign = zodiacSigns[(sunSignIndex + mercuryOffset) % 12]

        const venusOffset = Math.floor((month + 2) % 4)
        const venusSign = zodiacSigns[(sunSignIndex + venusOffset) % 12]

        setResult({
            sunSign,
            moonSign,
            ascendant,
            mercurySign,
            venusSign
        })
    }

    const getElementColor = (element: string) => {
        switch (element) {
            case "Ateş": return "text-red-600 bg-red-50 dark:bg-red-950"
            case "Toprak": return "text-amber-700 bg-amber-50 dark:bg-amber-950"
            case "Hava": return "text-sky-600 bg-sky-50 dark:bg-sky-950"
            case "Su": return "text-blue-600 bg-blue-50 dark:bg-blue-950"
            default: return ""
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Doğum Haritası Hesaplama</CardTitle>
                    <CardDescription>
                        Güneş, Ay, yükselen burç ve gezegen yerleşimlerinizi öğrenin
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="birthDate">Doğum Tarihi</Label>
                            <Input
                                id="birthDate"
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="birthTime">Doğum Saati (opsiyonel)</Label>
                            <Input
                                id="birthTime"
                                type="time"
                                value={birthTime}
                                onChange={(e) => setBirthTime(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="birthCity">Doğum Yeri (opsiyonel)</Label>
                        <Input
                            id="birthCity"
                            type="text"
                            placeholder="İstanbul"
                            value={birthCity}
                            onChange={(e) => setBirthCity(e.target.value)}
                        />
                    </div>

                    <Button onClick={calculate} className="w-full">
                        Haritayı Hesapla
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950">
                    <CardHeader>
                        <CardTitle className="text-purple-800 dark:text-purple-200">
                            🌟 Doğum Haritanız
                        </CardTitle>
                        <CardDescription>
                            Temel gezegen yerleşimleriniz
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div className={`rounded-lg p-4 ${getElementColor(result.sunSign.element)}`}>
                                <div className="text-3xl mb-2">{result.sunSign.symbol}</div>
                                <p className="text-sm opacity-80">☀️ Güneş Burcu</p>
                                <p className="text-xl font-bold">{result.sunSign.name}</p>
                                <p className="text-xs mt-1">{result.sunSign.element} elementi</p>
                            </div>

                            <div className={`rounded-lg p-4 ${getElementColor(result.moonSign.element)}`}>
                                <div className="text-3xl mb-2">{result.moonSign.symbol}</div>
                                <p className="text-sm opacity-80">🌙 Ay Burcu</p>
                                <p className="text-xl font-bold">{result.moonSign.name}</p>
                                <p className="text-xs mt-1">{result.moonSign.element} elementi</p>
                            </div>

                            <div className={`rounded-lg p-4 ${getElementColor(result.ascendant.element)}`}>
                                <div className="text-3xl mb-2">{result.ascendant.symbol}</div>
                                <p className="text-sm opacity-80">⬆️ Yükselen Burç</p>
                                <p className="text-xl font-bold">{result.ascendant.name}</p>
                                <p className="text-xs mt-1">{result.ascendant.element} elementi</p>
                            </div>

                            <div className={`rounded-lg p-4 ${getElementColor(result.mercurySign.element)}`}>
                                <div className="text-3xl mb-2">{result.mercurySign.symbol}</div>
                                <p className="text-sm opacity-80">☿ Merkür</p>
                                <p className="text-xl font-bold">{result.mercurySign.name}</p>
                                <p className="text-xs mt-1">İletişim & Düşünce</p>
                            </div>

                            <div className={`rounded-lg p-4 ${getElementColor(result.venusSign.element)}`}>
                                <div className="text-3xl mb-2">{result.venusSign.symbol}</div>
                                <p className="text-sm opacity-80">♀ Venüs</p>
                                <p className="text-xl font-bold">{result.venusSign.name}</p>
                                <p className="text-xs mt-1">Aşk & Güzellik</p>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                <strong>Not:</strong> Bu hesaplama yaklaşık değerlerdir. Kesin doğum haritası için
                                astronomik efemeris tabloları ve doğum koordinatları gereklidir.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
