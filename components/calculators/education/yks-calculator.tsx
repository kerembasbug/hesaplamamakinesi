"use client"

import { useState, useCallback, useEffect } from "react"
import { GraduationCap, Copy, Check, Calculator, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SubjectScore {
    correct: string
    wrong: string
}

// TYT Soru Sayıları
const tytQuestions = {
    turkce: 40,
    sosyal: 20,
    matematik: 40,
    fen: 20
}

// AYT Soru Sayıları (Alan bazlı)
const aytQuestions = {
    sayisal: { matematik: 40, fizik: 14, kimya: 13, biyoloji: 13 },
    sozel: { edebiyat: 24, tarih1: 10, cografya1: 6, tarih2: 11, cografya2: 11, felsefe: 12, din: 6 },
    esitagirlik: { edebiyat: 24, tarih1: 10, cografya1: 6, matematik: 40 },
    dil: { yabanciDil: 80 }
}

export function YksCalculator() {
    const [examType, setExamType] = useState<"tyt" | "ayt-sayisal" | "ayt-sozel">("tyt")

    const [tytScores, setTytScores] = useState({
        turkce: { correct: "", wrong: "" },
        sosyal: { correct: "", wrong: "" },
        matematik: { correct: "", wrong: "" },
        fen: { correct: "", wrong: "" }
    })

    const [aytScores, setAytScores] = useState({
        matematik: { correct: "", wrong: "" },
        fizik: { correct: "", wrong: "" },
        kimya: { correct: "", wrong: "" },
        biyoloji: { correct: "", wrong: "" }
    })

    const [result, setResult] = useState<{
        toplamNet: number
        detaylar: { ders: string; net: number }[]
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculateNet = (correct: string, wrong: string): number => {
        const c = parseInt(correct) || 0
        const w = parseInt(wrong) || 0
        return Math.max(0, c - (w * 0.25))
    }

    const calculate = useCallback(() => {
        const detaylar: { ders: string; net: number }[] = []
        let toplamNet = 0

        if (examType === "tyt") {
            const turkcNet = calculateNet(tytScores.turkce.correct, tytScores.turkce.wrong)
            const sosyalNet = calculateNet(tytScores.sosyal.correct, tytScores.sosyal.wrong)
            const matNet = calculateNet(tytScores.matematik.correct, tytScores.matematik.wrong)
            const fenNet = calculateNet(tytScores.fen.correct, tytScores.fen.wrong)

            detaylar.push({ ders: "Türkçe", net: turkcNet })
            detaylar.push({ ders: "Sosyal Bilimler", net: sosyalNet })
            detaylar.push({ ders: "Temel Matematik", net: matNet })
            detaylar.push({ ders: "Fen Bilimleri", net: fenNet })
            toplamNet = turkcNet + sosyalNet + matNet + fenNet
        } else if (examType === "ayt-sayisal") {
            const matNet = calculateNet(aytScores.matematik.correct, aytScores.matematik.wrong)
            const fizikNet = calculateNet(aytScores.fizik.correct, aytScores.fizik.wrong)
            const kimyaNet = calculateNet(aytScores.kimya.correct, aytScores.kimya.wrong)
            const biyoNet = calculateNet(aytScores.biyoloji.correct, aytScores.biyoloji.wrong)

            detaylar.push({ ders: "Matematik", net: matNet })
            detaylar.push({ ders: "Fizik", net: fizikNet })
            detaylar.push({ ders: "Kimya", net: kimyaNet })
            detaylar.push({ ders: "Biyoloji", net: biyoNet })
            toplamNet = matNet + fizikNet + kimyaNet + biyoNet
        }

        setResult({ toplamNet: Math.round(toplamNet * 100) / 100, detaylar })
    }, [examType, tytScores, aytScores])

    useEffect(() => {
        calculate()
    }, [calculate])

    const handleTytChange = (ders: keyof typeof tytScores, type: "correct" | "wrong", value: string) => {
        const numValue = value.replace(/\D/g, "")
        const max = tytQuestions[ders]
        const limited = numValue && parseInt(numValue) > max ? max.toString() : numValue
        setTytScores(prev => ({ ...prev, [ders]: { ...prev[ders], [type]: limited } }))
    }

    const handleAytChange = (ders: keyof typeof aytScores, type: "correct" | "wrong", value: string) => {
        const numValue = value.replace(/\D/g, "")
        const max = aytQuestions.sayisal[ders as keyof typeof aytQuestions.sayisal] || 40
        const limited = numValue && parseInt(numValue) > max ? max.toString() : numValue
        setAytScores(prev => ({ ...prev, [ders]: { ...prev[ders], [type]: limited } }))
    }

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`Toplam Net: ${result.toplamNet}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <GraduationCap className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">YKS Net Hesaplama 2025</CardTitle>
                            <CardDescription className="text-orange-100">
                                TYT ve AYT net hesaplayıcı
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    {/* Exam Type Selector */}
                    <div className="flex flex-wrap gap-2">
                        {[
                            { value: "tyt", label: "TYT (120 Soru)" },
                            { value: "ayt-sayisal", label: "AYT Sayısal (80 Soru)" }
                        ].map((opt) => (
                            <Button
                                key={opt.value}
                                variant={examType === opt.value ? "default" : "outline"}
                                onClick={() => setExamType(opt.value as typeof examType)}
                                className={examType === opt.value ? "bg-orange-600 hover:bg-orange-700" : ""}
                            >
                                <BookOpen className="h-4 w-4 mr-2" />
                                {opt.label}
                            </Button>
                        ))}
                    </div>

                    {/* TYT Form */}
                    {examType === "tyt" && (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { key: "turkce", name: "Türkçe", max: 40, color: "from-red-500 to-rose-500" },
                                { key: "sosyal", name: "Sosyal Bilimler", max: 20, color: "from-amber-500 to-orange-500" },
                                { key: "matematik", name: "Temel Matematik", max: 40, color: "from-blue-500 to-indigo-500" },
                                { key: "fen", name: "Fen Bilimleri", max: 20, color: "from-green-500 to-emerald-500" }
                            ].map((ders) => (
                                <div key={ders.key} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border">
                                    <div className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${ders.color} mb-3`}>
                                        {ders.name} ({ders.max} Soru)
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs text-slate-500">Doğru</Label>
                                            <Input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="0"
                                                value={tytScores[ders.key as keyof typeof tytScores].correct}
                                                onChange={(e) => handleTytChange(ders.key as keyof typeof tytScores, "correct", e.target.value)}
                                                className="h-12 text-lg font-bold text-center bg-green-50 border-green-200"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs text-slate-500">Yanlış</Label>
                                            <Input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="0"
                                                value={tytScores[ders.key as keyof typeof tytScores].wrong}
                                                onChange={(e) => handleTytChange(ders.key as keyof typeof tytScores, "wrong", e.target.value)}
                                                className="h-12 text-lg font-bold text-center bg-red-50 border-red-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* AYT Sayısal Form */}
                    {examType === "ayt-sayisal" && (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { key: "matematik", name: "Matematik", max: 40, color: "from-blue-500 to-indigo-500" },
                                { key: "fizik", name: "Fizik", max: 14, color: "from-purple-500 to-violet-500" },
                                { key: "kimya", name: "Kimya", max: 13, color: "from-teal-500 to-cyan-500" },
                                { key: "biyoloji", name: "Biyoloji", max: 13, color: "from-green-500 to-emerald-500" }
                            ].map((ders) => (
                                <div key={ders.key} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border">
                                    <div className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${ders.color} mb-3`}>
                                        {ders.name} ({ders.max} Soru)
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label className="text-xs text-slate-500">Doğru</Label>
                                            <Input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="0"
                                                value={aytScores[ders.key as keyof typeof aytScores].correct}
                                                onChange={(e) => handleAytChange(ders.key as keyof typeof aytScores, "correct", e.target.value)}
                                                className="h-12 text-lg font-bold text-center bg-green-50 border-green-200"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-xs text-slate-500">Yanlış</Label>
                                            <Input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="0"
                                                value={aytScores[ders.key as keyof typeof aytScores].wrong}
                                                onChange={(e) => handleAytChange(ders.key as keyof typeof aytScores, "wrong", e.target.value)}
                                                className="h-12 text-lg font-bold text-center bg-red-50 border-red-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                Net Sonuçları
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white">
                            <p className="text-sm text-orange-100 mb-1">Toplam Net</p>
                            <p className="text-5xl font-bold">{result.toplamNet}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {result.detaylar.map((d) => (
                                <div key={d.ders} className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                    <p className="text-xs text-slate-500 mb-1">{d.ders}</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">{d.net.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
