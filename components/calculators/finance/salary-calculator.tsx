"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { bordroHesapla, nettenBrute } from "@/lib/payroll"
import { guncellemeEtiketi } from "@/lib/constants/tr-2026"

const AYLAR = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
]

export function SalaryCalculator() {
    const [amount, setAmount] = useState<string>("")
    const [calcType, setCalcType] = useState<"netToGross" | "grossToNet">("grossToNet")
    const [month, setMonth] = useState<string>("1")
    const [result, setResult] = useState<{
        gross: number
        net: number
        sgk: number
        issizlik: number
        gelirVergisi: number
        gelirVergisiIstisnasi: number
        damgaVergisi: number
        totalDeductions: number
        marjinalOran: number
        isverenMaliyeti: number
        yillikNet: number
    } | null>(null)

    const calculate = () => {
        const inputAmount = parseFloat(amount.replace(/\./g, "").replace(/,/g, ".")) || 0
        if (inputAmount <= 0) {
            setResult(null)
            return
        }

        const ay = Number(month)
        // Brüt maaş sabit kabul edilip 12 ay simüle edilir; seçilen ayın satırı
        // gösterilir. Gelir vergisi kümülatif matraha bağlı olduğu için Ocak ile
        // Aralık netleri farklıdır.
        const gross = calcType === "grossToNet" ? inputAmount : nettenBrute(inputAmount, ay)
        const bordro = bordroHesapla(gross)
        const satir = bordro.aylar[ay - 1] ?? bordro.aylar[0]

        setResult({
            gross,
            net: satir.net,
            sgk: satir.sgkIsci,
            issizlik: satir.issizlikIsci,
            gelirVergisi: satir.gelirVergisi,
            gelirVergisiIstisnasi: satir.gelirVergisiIstisnasi,
            damgaVergisi: satir.damgaVergisi,
            totalDeductions: satir.sgkIsci + satir.issizlikIsci + satir.gelirVergisi + satir.damgaVergisi,
            marjinalOran: satir.marjinalOran,
            isverenMaliyeti: bordro.aylikIsverenMaliyeti,
            yillikNet: bordro.yillikNet,
        })
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 2
        }).format(value)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Maaş Hesaplama</CardTitle>
                    <CardDescription>
                        Brüt maaştan net veya net maaştan brüt hesaplayın
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="calcType">Hesaplama Yönü</Label>
                            <Select value={calcType} onValueChange={(v) => setCalcType(v as typeof calcType)}>
                                <SelectTrigger id="calcType">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="grossToNet">Brüt → Net</SelectItem>
                                    <SelectItem value="netToGross">Net → Brüt</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="month">Hesaplanan Ay</Label>
                            <Select value={month} onValueChange={setMonth}>
                                <SelectTrigger id="month">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {AYLAR.map((ad, i) => (
                                        <SelectItem key={ad} value={String(i + 1)}>{ad}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">
                            {calcType === "grossToNet" ? "Brüt Maaş (TL)" : "Net Maaş (TL)"}
                        </Label>
                        <Input
                            id="amount"
                            inputMode="decimal"
                            placeholder={calcType === "grossToNet" ? "50.000" : "40.000"}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <Button onClick={calculate} className="w-full">
                        Hesapla
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
                    <CardHeader>
                        <CardTitle className="text-blue-800 dark:text-blue-200">
                            Maaş Detayları
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg bg-white dark:bg-slate-800 p-4">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Brüt Maaş
                                </p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {formatCurrency(result.gross)}
                                </p>
                            </div>
                            <div className="rounded-lg bg-green-100 dark:bg-green-900 p-4">
                                <p className="text-sm text-green-600 dark:text-green-300">
                                    Net Maaş (Ele Geçen)
                                </p>
                                <p className="text-2xl font-bold text-green-700 dark:text-green-200">
                                    {formatCurrency(result.net)}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-300">Kesintiler</h4>
                            <div className="grid gap-2 text-sm">
                                <div className="flex justify-between p-2 bg-white dark:bg-slate-800 rounded">
                                    <span>SGK Primi (%14)</span>
                                    <span className="text-red-600">- {formatCurrency(result.sgk)}</span>
                                </div>
                                <div className="flex justify-between p-2 bg-white dark:bg-slate-800 rounded">
                                    <span>İşsizlik Sigortası (%1)</span>
                                    <span className="text-red-600">- {formatCurrency(result.issizlik)}</span>
                                </div>
                                <div className="flex justify-between p-2 bg-white dark:bg-slate-800 rounded">
                                    <span>Gelir Vergisi</span>
                                    <span className="text-red-600">- {formatCurrency(result.gelirVergisi)}</span>
                                </div>
                                <div className="flex justify-between p-2 bg-white dark:bg-slate-800 rounded">
                                    <span>Damga Vergisi</span>
                                    <span className="text-red-600">- {formatCurrency(result.damgaVergisi)}</span>
                                </div>
                                {result.gelirVergisiIstisnasi > 0 && (
                                    <div className="flex justify-between p-2 bg-white dark:bg-slate-800 rounded">
                                        <span>Asgari ücret gelir vergisi istisnası</span>
                                        <span className="text-emerald-600">+ {formatCurrency(result.gelirVergisiIstisnasi)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between p-3 bg-red-100 dark:bg-red-900 rounded font-semibold">
                                    <span>Toplam Kesinti</span>
                                    <span className="text-red-700 dark:text-red-300">- {formatCurrency(result.totalDeductions)}</span>
                                </div>
                            </div>

                            <div className="grid gap-2 pt-2 text-sm md:grid-cols-3">
                                <div className="rounded bg-white p-3 dark:bg-slate-800">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Vergi dilimi</p>
                                    <p className="font-semibold">%{Math.round(result.marjinalOran * 100)}</p>
                                </div>
                                <div className="rounded bg-white p-3 dark:bg-slate-800">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Yıllık toplam net</p>
                                    <p className="font-semibold">{formatCurrency(result.yillikNet)}</p>
                                </div>
                                <div className="rounded bg-white p-3 dark:bg-slate-800">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">İşveren maliyeti</p>
                                    <p className="font-semibold">{formatCurrency(result.isverenMaliyeti)}</p>
                                </div>
                            </div>

                            <p className="pt-2 text-xs text-slate-500 dark:text-slate-400">{guncellemeEtiketi()}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
