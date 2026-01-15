"use client"

import { useState } from "react"
import { Sun, Copy, Check, Calculator, Sparkles, Moon, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function AstrologyCalculator() {
    const [birthDate, setBirthDate] = useState<string>("1995-01-01")
    const [birthTime, setBirthTime] = useState<string>("12:00")
    const [result, setResult] = useState<{
        sunSign: string
        junoSign: string
        lilithSign: string
        summary: string
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const signs = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"]

    const calculate = () => {
        if (!birthDate) return

        const date = new Date(birthDate)
        const day = date.getDate()
        const month = date.getMonth() + 1 // 1-12

        // Basit Güneş Burcu Belirleme
        let sunIndex = 0
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sunIndex = 0
        else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sunIndex = 1
        else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sunIndex = 2
        else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sunIndex = 3
        else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sunIndex = 4
        else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sunIndex = 5
        else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sunIndex = 6
        else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sunIndex = 7
        else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sunIndex = 8
        else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sunIndex = 9
        else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sunIndex = 10
        else sunIndex = 11

        // Juno ve Lilith için gerçek ephemeris verisi olmadan sadece demonstratif/algoritmik bir tahmin
        // Günü ve yılı baz alarak sembolik bir hesaplama
        const yearMod = (date.getFullYear() % 12)
        const junoIndex = (sunIndex + yearMod) % 12
        const lilithIndex = (sunIndex + day) % 12

        setResult({
            sunSign: signs[sunIndex],
            junoSign: signs[junoIndex],
            lilithSign: signs[lilithIndex],
            summary: `${signs[sunIndex]} burcuysanız, Juno'nuz ${signs[junoIndex]} ve Lilith'iniz ${signs[lilithIndex]} olarak hesaplanmıştır.`
        })
    }

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`Astroloji Analizi: Güneş: ${result.sunSign}, Juno: ${result.junoSign}, Lilith: ${result.lilithSign}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Sparkles className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Astroloji (Solar, Juno, Lilith) Hesaplama</CardTitle>
                            <CardDescription className="text-purple-100">
                                Doğum haritanızdaki kritik noktaları öğrenin
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-500 uppercase tracking-tighter">Doğum Tarihi</Label>
                            <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="h-11" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-500 uppercase tracking-tighter">Doğum Saati</Label>
                            <Input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} className="h-11" />
                        </div>
                    </div>
                    <Button onClick={calculate} className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95">
                        Haritayı Çıkar
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 border-amber-200">
                            <CardContent className="p-4 text-center">
                                <Sun className="h-8 w-8 mx-auto text-amber-600 mb-2" />
                                <p className="text-xs text-slate-500 font-bold uppercase">Güneş Burcu</p>
                                <p className="text-2xl font-black text-amber-700 dark:text-amber-400">{result.sunSign}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 border-indigo-200">
                            <CardContent className="p-4 text-center">
                                <Star className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
                                <p className="text-xs text-slate-500 font-bold uppercase">Juno Burcu</p>
                                <p className="text-2xl font-black text-indigo-700 dark:text-indigo-400">{result.junoSign}</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 border-slate-300">
                            <CardContent className="p-4 text-center">
                                <Moon className="h-8 w-8 mx-auto text-slate-700 dark:text-slate-300 mb-2" />
                                <p className="text-xs text-slate-500 font-bold uppercase">Lilith Burcu</p>
                                <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{result.lilithSign}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="overflow-hidden border-purple-200">
                        <CardHeader className="bg-purple-600 text-white py-3">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-sm font-bold uppercase">Özet Yorum</CardTitle>
                                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-white hover:bg-white/10 h-8 px-2">
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                                {result.summary} Juno aşkta sadakati ve evlilik tarzınızı temsil ederken, Lilith içsel gücünüzü ve bastırılmış arzularınızı temsil eder. Bu yerleşimler sizin karakter derinliğinizi belirler.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
