"use client"

import { useState, useCallback, useEffect } from "react"
import { Calendar, Copy, Check, Calculator, Info, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function Pension3600Calculator() {
    const [entryDate, setEntryDate] = useState<string>("1995-01-01")
    const [currentDays, setCurrentDays] = useState<string>("3000")
    const [birthDate, setBirthDate] = useState<string>("1975-01-01")
    const [result, setResult] = useState<{
        canRetire: boolean
        remainingDays: number
        minAge: number
        message: string
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const entryYear = new Date(entryDate).getFullYear()
        const birthYear = new Date(birthDate).getFullYear()
        const days = parseInt(currentDays)

        if (isNaN(entryYear) || isNaN(birthYear) || isNaN(days)) {
            setResult(null)
            return
        }

        if (entryYear >= 1999 && new Date(entryDate) > new Date("1999-09-08")) {
            setResult({
                canRetire: false,
                remainingDays: 0,
                minAge: 0,
                message: "3600 günden emeklilik hakkı sadece 08.09.1999 öncesi sigorta girişi olanlar içindir."
            })
            return
        }

        const remainingDays = Math.max(0, 3600 - days)
        const minAge = 58

        setResult({
            canRetire: days >= 3600,
            remainingDays,
            minAge,
            message: days >= 3600
                ? "3600 gün prim şartını tamamladınız. Yaş haddini bekleyerek emekli olabilirsiniz."
                : `3600 gün için ${remainingDays} gün daha prim ödemeniz gerekmektedir.`
        })
    }, [entryDate, currentDays, birthDate])

    useEffect(() => {
        calculate()
    }, [calculate])

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(result.message)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-700 to-blue-800 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <ShieldCheck className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">3600 Günle Emeklilik Hesaplama</CardTitle>
                            <CardDescription className="text-indigo-100">
                                Kısmi emeklilik şartlarınızı kontrol edin
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">İlk Sigorta Giriş Tarihi</Label>
                            <Input
                                type="date"
                                value={entryDate}
                                onChange={(e) => setEntryDate(e.target.value)}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Toplam Prim Günü</Label>
                            <Input
                                type="text"
                                value={currentDays}
                                onChange={(e) => setCurrentDays(e.target.value.replace(/[^0-9]/g, ""))}
                                placeholder="Örn: 3000"
                                className="h-11"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Doğum Tarihi</Label>
                        <Input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="h-11"
                        />
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 text-sm">
                        <Info className="h-4 w-4 inline mr-2 text-indigo-600" />
                        15 yıl sigortalılık süresi ve 3600 prim günü şartı, 8 Eylül 1999 öncesi işe girenler için geçerlidir.
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className={`${result.canRetire ? "bg-green-600" : "bg-amber-600"} text-white`}>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                Emeklilik Durumu
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className={`p-6 rounded-2xl border-2 text-center ${result.canRetire ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200 dark:bg-slate-800 dark:border-slate-700"}`}>
                            <p className={`text-xl font-bold mb-2 ${result.canRetire ? "text-green-700" : "text-amber-700 dark:text-amber-400"}`}>
                                {result.canRetire ? "Prim Şartı Tamam!" : "Prim Eksik"}
                            </p>
                            <p className="text-slate-600 dark:text-slate-300">{result.message}</p>
                        </div>

                        {!result.canRetire && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <p className="text-xs text-slate-500">Kalan Prim</p>
                                    <p className="text-2xl font-bold text-red-500">{result.remainingDays} Gün</p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                    <p className="text-xs text-slate-500">Tahmini Yaş Şartı</p>
                                    <p className="text-2xl font-bold text-slate-700 dark:text-slate-200">{result.minAge}+</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
