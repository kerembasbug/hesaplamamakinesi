"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type GoldType = "gram" | "ceyrek" | "yarim" | "tam" | "cumhuriyet" | "ata"

interface GoldPrice {
    name: string
    buyPrice: number
    sellPrice: number
    multiplier: number // gram altın cinsinden değeri
}

export function GoldCalculator() {
    const [amount, setAmount] = useState<string>("")
    const [goldType, setGoldType] = useState<GoldType>("gram")
    const [calcDirection, setCalcDirection] = useState<"goldToTry" | "tryToGold">("goldToTry")
    const [result, setResult] = useState<{
        buyValue: number
        sellValue: number
        grams: number
    } | null>(null)

    // Örnek güncel fiyatlar (gerçek uygulamada API'den çekilmeli)
    const [goldPrices, setGoldPrices] = useState<Record<GoldType, GoldPrice>>({
        gram: { name: "Gram Altın", buyPrice: 3150, sellPrice: 3130, multiplier: 1 },
        ceyrek: { name: "Çeyrek Altın", buyPrice: 5150, sellPrice: 5050, multiplier: 1.75 },
        yarim: { name: "Yarım Altın", buyPrice: 10300, sellPrice: 10100, multiplier: 3.5 },
        tam: { name: "Tam Altın", buyPrice: 20600, sellPrice: 20200, multiplier: 7 },
        cumhuriyet: { name: "Cumhuriyet Altını", buyPrice: 21500, sellPrice: 21000, multiplier: 7.2 },
        ata: { name: "Ata Altın", buyPrice: 22000, sellPrice: 21500, multiplier: 7.2 }
    })

    const calculate = () => {
        const inputAmount = parseFloat(amount) || 0
        if (inputAmount <= 0) {
            setResult(null)
            return
        }

        const selectedGold = goldPrices[goldType]

        if (calcDirection === "goldToTry") {
            // Altından TL'ye
            const buyValue = inputAmount * selectedGold.buyPrice
            const sellValue = inputAmount * selectedGold.sellPrice
            const grams = inputAmount * selectedGold.multiplier

            setResult({ buyValue, sellValue, grams })
        } else {
            // TL'den altına
            const goldAmountBuy = inputAmount / selectedGold.buyPrice
            const goldAmountSell = inputAmount / selectedGold.sellPrice
            const grams = goldAmountBuy * selectedGold.multiplier

            setResult({
                buyValue: goldAmountBuy,
                sellValue: goldAmountSell,
                grams
            })
        }
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 2
        }).format(value)
    }

    const formatNumber = (value: number, decimals: number = 2) => {
        return new Intl.NumberFormat("tr-TR", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Altın Hesaplama</CardTitle>
                    <CardDescription>
                        Gram, çeyrek, yarım ve tam altın değerlerini hesaplayın
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="direction">Hesaplama Yönü</Label>
                            <Select value={calcDirection} onValueChange={(v) => setCalcDirection(v as typeof calcDirection)}>
                                <SelectTrigger id="direction">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="goldToTry">Altın → TL</SelectItem>
                                    <SelectItem value="tryToGold">TL → Altın</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="goldType">Altın Türü</Label>
                            <Select value={goldType} onValueChange={(v) => setGoldType(v as GoldType)}>
                                <SelectTrigger id="goldType">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="gram">Gram Altın</SelectItem>
                                    <SelectItem value="ceyrek">Çeyrek Altın</SelectItem>
                                    <SelectItem value="yarim">Yarım Altın</SelectItem>
                                    <SelectItem value="tam">Tam Altın</SelectItem>
                                    <SelectItem value="cumhuriyet">Cumhuriyet Altını</SelectItem>
                                    <SelectItem value="ata">Ata Altın</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">
                            {calcDirection === "goldToTry" ? `${goldPrices[goldType].name} Adedi` : "TL Tutarı"}
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder={calcDirection === "goldToTry" ? "5" : "50000"}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <Button onClick={calculate} className="w-full">
                        Hesapla
                    </Button>
                </CardContent>
            </Card>

            {/* Güncel Fiyatlar */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Güncel Altın Fiyatları</CardTitle>
                    <CardDescription>Alış ve satış fiyatları (örnek değerler)</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        {Object.entries(goldPrices).map(([key, gold]) => (
                            <div key={key} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                                <span className="font-medium">{gold.name}</span>
                                <div className="text-sm">
                                    <span className="text-green-600 mr-4">Alış: {formatCurrency(gold.buyPrice)}</span>
                                    <span className="text-red-600">Satış: {formatCurrency(gold.sellPrice)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
                    <CardHeader>
                        <CardTitle className="text-amber-800 dark:text-amber-200">
                            Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {calcDirection === "goldToTry" ? (
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-lg bg-white dark:bg-slate-800 p-4">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Alış Değeri (Satarsanız)
                                    </p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {formatCurrency(result.sellValue)}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-white dark:bg-slate-800 p-4">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Satış Değeri (Alırsanız)
                                    </p>
                                    <p className="text-2xl font-bold text-red-600">
                                        {formatCurrency(result.buyValue)}
                                    </p>
                                </div>
                                <div className="md:col-span-2 rounded-lg bg-amber-100 dark:bg-amber-900 p-4">
                                    <p className="text-sm text-amber-600 dark:text-amber-300">
                                        Gram Altın Karşılığı
                                    </p>
                                    <p className="text-xl font-bold text-amber-700 dark:text-amber-200">
                                        {formatNumber(result.grams)} gram
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-lg bg-white dark:bg-slate-800 p-4">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Alabilirsiniz (Alış Fiyatından)
                                    </p>
                                    <p className="text-2xl font-bold text-amber-600">
                                        {formatNumber(result.buyValue, 3)} adet
                                    </p>
                                </div>
                                <div className="rounded-lg bg-white dark:bg-slate-800 p-4">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Satabilirsiniz (Satış Fiyatından)
                                    </p>
                                    <p className="text-2xl font-bold text-amber-600">
                                        {formatNumber(result.sellValue, 3)} adet
                                    </p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
