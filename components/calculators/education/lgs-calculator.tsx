"use client"

import { useState, useCallback, useEffect } from "react"
import { GraduationCap, Copy, Check, Calculator, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SubjectScore {
    correct: string
    wrong: string
}

interface Scores {
    turkce: SubjectScore
    matematik: SubjectScore
    fen: SubjectScore
    sosyal: SubjectScore
    din: SubjectScore
    yabanci: SubjectScore
}

interface CalculationResult {
    turkceNet: number
    matematikNet: number
    fenNet: number
    sosyalNet: number
    dinNet: number
    yabanciNet: number
    toplamNet: number
    hamPuan: number
    lgsYuzdelik: number
}

// LGS 2026 Soru Dağılımı
const questionCounts = {
    turkce: 20,
    matematik: 20,
    fen: 20,
    sosyal: 10,
    din: 10,
    yabanci: 10
}

// Ağırlık Katsayıları (2024-2025 sistemine göre)
const weights = {
    turkce: 4,
    matematik: 4,
    fen: 4,
    sosyal: 2,
    din: 2,
    yabanci: 2
}

export function LgsCalculator() {
    const [scores, setScores] = useState<Scores>({
        turkce: { correct: "", wrong: "" },
        matematik: { correct: "", wrong: "" },
        fen: { correct: "", wrong: "" },
        sosyal: { correct: "", wrong: "" },
        din: { correct: "", wrong: "" },
        yabanci: { correct: "", wrong: "" }
    })

    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState(false)

    const calculateNet = (correct: string, wrong: string): number => {
        const c = parseInt(correct) || 0
        const w = parseInt(wrong) || 0
        return Math.max(0, c - (w * 0.25)) // 4 yanlış 1 doğruyu götürür (0.25 per wrong)
    }

    const calculate = useCallback(() => {
        const turkceNet = calculateNet(scores.turkce.correct, scores.turkce.wrong)
        const matematikNet = calculateNet(scores.matematik.correct, scores.matematik.wrong)
        const fenNet = calculateNet(scores.fen.correct, scores.fen.wrong)
        const sosyalNet = calculateNet(scores.sosyal.correct, scores.sosyal.wrong)
        const dinNet = calculateNet(scores.din.correct, scores.din.wrong)
        const yabanciNet = calculateNet(scores.yabanci.correct, scores.yabanci.wrong)

        const toplamNet = turkceNet + matematikNet + fenNet + sosyalNet + dinNet + yabanciNet

        // Ağırlıklı puan hesaplama
        const agirlikliPuan =
            (turkceNet * weights.turkce) +
            (matematikNet * weights.matematik) +
            (fenNet * weights.fen) +
            (sosyalNet * weights.sosyal) +
            (dinNet * weights.din) +
            (yabanciNet * weights.yabanci)

        // Ham puan hesaplama (500 üzerinden)
        const maxAgirlikliPuan =
            (questionCounts.turkce * weights.turkce) +
            (questionCounts.matematik * weights.matematik) +
            (questionCounts.fen * weights.fen) +
            (questionCounts.sosyal * weights.sosyal) +
            (questionCounts.din * weights.din) +
            (questionCounts.yabanci * weights.yabanci)

        const hamPuan = (agirlikliPuan / maxAgirlikliPuan) * 500

        // Yüzdelik dilim tahmini (yaklaşık hesaplama)
        const lgsYuzdelik = Math.min(100, Math.max(0, (agirlikliPuan / maxAgirlikliPuan) * 100))

        setResult({
            turkceNet,
            matematikNet,
            fenNet,
            sosyalNet,
            dinNet,
            yabanciNet,
            toplamNet,
            hamPuan: Math.round(hamPuan * 100) / 100,
            lgsYuzdelik: Math.round(lgsYuzdelik * 100) / 100
        })
    }, [scores])

    useEffect(() => {
        calculate()
    }, [calculate])

    const handleChange = (subject: keyof Scores, type: "correct" | "wrong", value: string) => {
        // Only allow numbers and limit to max question count
        const numValue = value.replace(/\D/g, "")
        const maxValue = questionCounts[subject]
        const limitedValue = numValue && parseInt(numValue) > maxValue ? maxValue.toString() : numValue

        setScores(prev => ({
            ...prev,
            [subject]: {
                ...prev[subject],
                [type]: limitedValue
            }
        }))
    }

    const copyToClipboard = async () => {
        if (result) {
            try {
                await navigator.clipboard.writeText(`LGS Puan: ${result.hamPuan}`)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            } catch (err) {
                console.error("Kopyalama başarısız:", err)
            }
        }
    }

    const subjects: { key: keyof Scores; name: string; color: string; max: number }[] = [
        { key: "turkce", name: "Türkçe", color: "from-red-500 to-rose-500", max: 20 },
        { key: "matematik", name: "Matematik", color: "from-blue-500 to-indigo-500", max: 20 },
        { key: "fen", name: "Fen Bilimleri", color: "from-green-500 to-emerald-500", max: 20 },
        { key: "sosyal", name: "Sosyal Bilgiler", color: "from-amber-500 to-orange-500", max: 10 },
        { key: "din", name: "Din Kültürü", color: "from-purple-500 to-violet-500", max: 10 },
        { key: "yabanci", name: "Yabancı Dil", color: "from-cyan-500 to-teal-500", max: 10 }
    ]

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <GraduationCap className="h-8 w-8" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">LGS Puan Hesaplama 2026</CardTitle>
                            <CardDescription className="text-indigo-100">
                                Liselere Geçiş Sistemi puan ve yüzdelik dilim hesaplayıcı
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {subjects.map((subject) => (
                            <div key={subject.key} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                                <div className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${subject.color} mb-3`}>
                                    {subject.name} ({subject.max} Soru)
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Label className="text-xs text-slate-500">Doğru</Label>
                                        <Input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="0"
                                            value={scores[subject.key].correct}
                                            onChange={(e) => handleChange(subject.key, "correct", e.target.value)}
                                            className="h-12 text-lg font-bold text-center bg-green-50 dark:bg-green-900/20 border-green-200"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-slate-500">Yanlış</Label>
                                        <Input
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="0"
                                            value={scores[subject.key].wrong}
                                            onChange={(e) => handleChange(subject.key, "wrong", e.target.value)}
                                            className="h-12 text-lg font-bold text-center bg-red-50 dark:bg-red-900/20 border-red-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                Hesaplama Sonuçları
                            </CardTitle>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={copyToClipboard}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        {/* Main Score */}
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                            <p className="text-sm text-indigo-100 mb-1">LGS Puanınız</p>
                            <p className="text-5xl font-bold">{result.hamPuan}</p>
                            <p className="text-indigo-100 mt-2">500 üzerinden</p>
                        </div>

                        {/* Net Summary */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                            {subjects.map((subject) => (
                                <div key={subject.key} className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                    <p className="text-xs text-slate-500 mb-1">{subject.name}</p>
                                    <p className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${subject.color}`}>
                                        {result[`${subject.key}Net` as keyof CalculationResult]}
                                    </p>
                                    <p className="text-xs text-slate-400">net</p>
                                </div>
                            ))}
                        </div>

                        {/* Total Net and Percentile */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                                <p className="text-sm text-blue-600 dark:text-blue-400">Toplam Net</p>
                                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{result.toplamNet}</p>
                                <p className="text-xs text-blue-500">90 soru üzerinden</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                                <p className="text-sm text-purple-600 dark:text-purple-400">Tahmini Yüzdelik</p>
                                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">%{result.lgsYuzdelik}</p>
                                <p className="text-xs text-purple-500">Başarı oranı</p>
                            </div>
                        </div>

                        {/* Info Note */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                            <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                            <div className="text-sm text-amber-700 dark:text-amber-300">
                                <strong>Not:</strong> Bu hesaplama tahmini sonuçlar verir. Gerçek LGS puanı MEB tarafından açıklanan
                                yüzdelik dilim ve okul bazlı değerlendirmeleri içerir. Kesin sonuç için MEB açıklamalarını bekleyiniz.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
