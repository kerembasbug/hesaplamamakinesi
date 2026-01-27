"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function DgsScoreCalculator() {
    const [turkceCorrect, setTurkceCorrect] = useState<string>("")
    const [turkceWrong, setTurkceWrong] = useState<string>("")
    const [matCorrect, setMatCorrect] = useState<string>("")
    const [matWrong, setMatWrong] = useState<string>("")
    const [result, setResult] = useState<{
        turkceNet: number
        matNet: number
        totalNet: number
        sayisalScore: number
        sozelScore: number
        esitAgirlikScore: number
    } | null>(null)

    const calculate = () => {
        const tc = parseInt(turkceCorrect) || 0
        const tw = parseInt(turkceWrong) || 0
        const mc = parseInt(matCorrect) || 0
        const mw = parseInt(matWrong) || 0

        // Net hesaplama (4 yanlış 1 doğruyu götürür)
        const turkceNet = Math.max(0, tc - tw / 4)
        const matNet = Math.max(0, mc - mw / 4)
        const totalNet = turkceNet + matNet

        // DGS puan hesaplama (tahmini katsayılar)
        // Her yıl ÖSYM tarafından belirlenir, bunlar yaklaşık değerlerdir
        const baseScore = 100

        // Sayısal Puan: Matematik ağırlıklı
        const sayisalScore = baseScore + (turkceNet * 1.2) + (matNet * 2.8)

        // Sözel Puan: Türkçe ağırlıklı
        const sozelScore = baseScore + (turkceNet * 2.8) + (matNet * 1.2)

        // Eşit Ağırlık Puan
        const esitAgirlikScore = baseScore + (turkceNet * 2.0) + (matNet * 2.0)

        setResult({
            turkceNet,
            matNet,
            totalNet,
            sayisalScore: Math.min(500, sayisalScore),
            sozelScore: Math.min(500, sozelScore),
            esitAgirlikScore: Math.min(500, esitAgirlikScore)
        })
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>DGS Puan Hesaplama</CardTitle>
                    <CardDescription>
                        Dikey Geçiş Sınavı netlerinize göre tahmini puanınızı hesaplayın
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4">
                        <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                            <h3 className="font-semibold mb-3 text-indigo-800 dark:text-indigo-200">Türkçe (50 Soru)</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="turkceCorrect">Doğru</Label>
                                    <Input
                                        id="turkceCorrect"
                                        type="number"
                                        min="0"
                                        max="50"
                                        placeholder="40"
                                        value={turkceCorrect}
                                        onChange={(e) => setTurkceCorrect(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="turkceWrong">Yanlış</Label>
                                    <Input
                                        id="turkceWrong"
                                        type="number"
                                        min="0"
                                        max="50"
                                        placeholder="5"
                                        value={turkceWrong}
                                        onChange={(e) => setTurkceWrong(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                            <h3 className="font-semibold mb-3 text-emerald-800 dark:text-emerald-200">Matematik (50 Soru)</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="matCorrect">Doğru</Label>
                                    <Input
                                        id="matCorrect"
                                        type="number"
                                        min="0"
                                        max="50"
                                        placeholder="35"
                                        value={matCorrect}
                                        onChange={(e) => setMatCorrect(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="matWrong">Yanlış</Label>
                                    <Input
                                        id="matWrong"
                                        type="number"
                                        min="0"
                                        max="50"
                                        placeholder="10"
                                        value={matWrong}
                                        onChange={(e) => setMatWrong(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button onClick={calculate} className="w-full">
                        Puan Hesapla
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card className="border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950">
                    <CardHeader>
                        <CardTitle className="text-purple-800 dark:text-purple-200">
                            DGS Puan Sonuçları
                        </CardTitle>
                        <CardDescription>
                            Tahmini puan hesaplaması - Kesin sonuçlar ÖSYM tarafından açıklanır
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3 mb-4">
                            <div className="rounded-lg bg-white dark:bg-slate-800 p-4 text-center">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Türkçe Net</p>
                                <p className="text-2xl font-bold text-indigo-600">{result.turkceNet.toFixed(2)}</p>
                            </div>
                            <div className="rounded-lg bg-white dark:bg-slate-800 p-4 text-center">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Matematik Net</p>
                                <p className="text-2xl font-bold text-emerald-600">{result.matNet.toFixed(2)}</p>
                            </div>
                            <div className="rounded-lg bg-white dark:bg-slate-800 p-4 text-center">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Toplam Net</p>
                                <p className="text-2xl font-bold text-purple-600">{result.totalNet.toFixed(2)}</p>
                            </div>
                        </div>

                        <h4 className="font-semibold mb-3 text-purple-800 dark:text-purple-200">Tahmini Puanlar</h4>
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                                <span className="font-medium">Sayısal Puan (SAY)</span>
                                <span className="text-xl font-bold text-blue-600">{result.sayisalScore.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                                <span className="font-medium">Sözel Puan (SÖZ)</span>
                                <span className="text-xl font-bold text-orange-600">{result.sozelScore.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-lg">
                                <span className="font-medium">Eşit Ağırlık Puan (EA)</span>
                                <span className="text-xl font-bold text-green-600">{result.esitAgirlikScore.toFixed(2)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
