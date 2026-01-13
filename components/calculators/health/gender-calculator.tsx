"use client"

import { useState, useCallback, useEffect } from "react"
import { Baby, Heart, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Çin Takvimi Cinsiyet Tablosu (Anne Yaşı x Gebe Kalma Ayı)
// true = Erkek, false = Kız
const chineseGenderChart: Record<number, Record<number, boolean>> = {
    18: { 1: true, 2: false, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true },
    19: { 1: false, 2: true, 3: false, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 10: false, 11: true, 12: false },
    20: { 1: true, 2: false, 3: true, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: true, 11: false, 12: false },
    21: { 1: false, 2: true, 3: true, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false },
    22: { 1: true, 2: false, 3: false, 4: true, 5: true, 6: false, 7: false, 8: true, 9: false, 10: false, 11: false, 12: true },
    23: { 1: false, 2: true, 3: true, 4: false, 5: true, 6: true, 7: false, 8: false, 9: false, 10: true, 11: true, 12: true },
    24: { 1: true, 2: false, 3: true, 4: true, 5: false, 6: false, 7: true, 8: true, 9: true, 10: true, 11: true, 12: false },
    25: { 1: false, 2: true, 3: false, 4: true, 5: true, 6: false, 7: false, 8: false, 9: true, 10: true, 11: true, 12: true },
    26: { 1: true, 2: false, 3: true, 4: false, 5: true, 6: true, 7: false, 8: false, 9: false, 10: true, 11: false, 12: false },
    27: { 1: false, 2: true, 3: false, 4: true, 5: false, 6: false, 7: true, 8: true, 9: true, 10: false, 11: true, 12: true },
    28: { 1: true, 2: false, 3: true, 4: false, 5: false, 6: true, 7: true, 8: true, 9: true, 10: true, 11: false, 12: true },
    29: { 1: false, 2: true, 3: false, 4: true, 5: true, 6: true, 7: true, 8: true, 9: false, 10: false, 11: false, 12: false },
    30: { 1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: true, 11: true, 12: true },
    31: { 1: true, 2: true, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: true, 12: true },
    32: { 1: true, 2: true, 3: true, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: true },
    33: { 1: false, 2: true, 3: true, 4: true, 5: false, 6: false, 7: false, 8: true, 9: false, 10: false, 11: false, 12: true },
    34: { 1: true, 2: false, 3: true, 4: true, 5: true, 6: false, 7: false, 8: false, 9: false, 10: false, 11: true, 12: true },
    35: { 1: true, 2: true, 3: false, 4: true, 5: true, 6: true, 7: false, 8: false, 9: true, 10: false, 11: true, 12: true },
    36: { 1: false, 2: true, 3: true, 4: false, 5: true, 6: true, 7: true, 8: true, 9: true, 10: true, 11: true, 12: true },
    37: { 1: true, 2: true, 3: false, 4: true, 5: false, 6: true, 7: true, 8: false, 9: true, 10: true, 11: false, 12: false },
    38: { 1: false, 2: true, 3: true, 4: false, 5: true, 6: false, 7: true, 8: true, 9: false, 10: true, 11: true, 12: false },
    39: { 1: true, 2: false, 3: true, 4: true, 5: false, 6: true, 7: false, 8: false, 9: true, 10: false, 11: false, 12: false },
    40: { 1: false, 2: true, 3: false, 4: true, 5: true, 6: false, 7: true, 8: false, 9: false, 10: true, 11: true, 12: true },
    41: { 1: true, 2: false, 3: true, 4: false, 5: true, 6: true, 7: false, 8: true, 9: true, 10: false, 11: false, 12: true },
    42: { 1: false, 2: true, 3: false, 4: true, 5: false, 6: true, 7: true, 8: false, 9: true, 10: true, 11: true, 12: false },
    43: { 1: true, 2: false, 3: true, 4: false, 5: true, 6: false, 7: false, 8: true, 9: false, 10: false, 11: true, 12: true },
    44: { 1: false, 2: true, 3: true, 4: true, 5: false, 6: true, 7: true, 8: true, 9: true, 10: true, 11: false, 12: false },
    45: { 1: true, 2: false, 3: false, 4: true, 5: true, 6: false, 7: true, 8: true, 9: false, 10: false, 11: true, 12: true }
}

const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]

export function GenderCalculator() {
    const [anneYasi, setAnneYasi] = useState<string>("28")
    const [gebelikAyi, setGebelikAyi] = useState<string>("6")
    const [result, setResult] = useState<{ cinsiyet: "erkek" | "kiz"; guvenilirlik: number } | null>(null)

    const calculate = useCallback(() => {
        const yas = parseInt(anneYasi)
        const ay = parseInt(gebelikAyi)

        if (yas >= 18 && yas <= 45 && ay >= 1 && ay <= 12) {
            const isMale = chineseGenderChart[yas]?.[ay]
            if (isMale !== undefined) {
                setResult({ cinsiyet: isMale ? "erkek" : "kiz", guvenilirlik: 50 })
            } else {
                setResult(null)
            }
        } else {
            setResult(null)
        }
    }, [anneYasi, gebelikAyi])

    useEffect(() => {
        calculate()
    }, [calculate])

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Baby className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Cinsiyet Hesaplama 2025</CardTitle>
                            <CardDescription className="text-pink-100">
                                Çin Takvimi ile bebek cinsiyeti tahmini
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <Heart className="h-4 w-4 text-pink-500" />
                                Annenin Ay Yaşı (Gebe Kalma Anında)
                            </Label>
                            <select
                                value={anneYasi}
                                onChange={(e) => setAnneYasi(e.target.value)}
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800"
                            >
                                {Array.from({ length: 28 }, (_, i) => i + 18).map(yas => (
                                    <option key={yas} value={yas}>{yas} yaş</option>
                                ))}
                            </select>
                            <p className="text-xs text-slate-500">Çin takvimine göre yaşınıza 1 yıl ekleyin</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-pink-500" />
                                Gebe Kalma Ayı (Ay Takvimi)
                            </Label>
                            <select
                                value={gebelikAyi}
                                onChange={(e) => setGebelikAyi(e.target.value)}
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800"
                            >
                                {months.map((ay, i) => (
                                    <option key={i} value={i + 1}>{ay}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className={`shadow-xl border-2 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 ${result.cinsiyet === "erkek" ? "border-blue-300" : "border-pink-300"}`}>
                    <CardContent className="p-8">
                        <div className={`text-center p-8 rounded-3xl ${result.cinsiyet === "erkek" ? "bg-gradient-to-br from-blue-400 to-blue-600" : "bg-gradient-to-br from-pink-400 to-rose-500"} text-white`}>
                            <div className="text-6xl mb-4">{result.cinsiyet === "erkek" ? "👶🏻💙" : "👶🏻💗"}</div>
                            <p className="text-xl text-white/80 mb-2">Çin Takvimi Tahmini</p>
                            <p className="text-5xl font-bold mb-2">
                                {result.cinsiyet === "erkek" ? "ERKEK" : "KIZ"}
                            </p>
                            <p className="text-white/70 text-sm mt-4">
                                ⚠️ Bu hesaplama bilimsel değildir, eğlence amaçlıdır.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
