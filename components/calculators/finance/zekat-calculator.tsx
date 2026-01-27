"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Coins, Banknote, Building2, TrendingUp, Wallet, AlertCircle, CheckCircle2 } from "lucide-react"

// 2025 güncel altın ve gümüş fiyatları (TL/gram)
const GOLD_PRICE_PER_GRAM = 3250 // Yaklaşık güncel fiyat
const SILVER_PRICE_PER_GRAM = 38 // Yaklaşık güncel fiyat

// Nisab miktarları
const GOLD_NISAB_GRAM = 85 // 85 gram altın
const SILVER_NISAB_GRAM = 595 // 595 gram gümüş

// Zekat oranı
const ZEKAT_RATE = 0.025 // %2.5

type AssetCategory = {
    id: string
    name: string
    icon: React.ReactNode
    description: string
    value: string
}

export function ZekatCalculator() {
    const [assets, setAssets] = useState<AssetCategory[]>([
        { id: "cash", name: "Nakit Para", icon: <Banknote className="h-5 w-5" />, description: "Elde ve bankada bulunan TL, döviz", value: "" },
        { id: "gold", name: "Altın", icon: <Coins className="h-5 w-5 text-yellow-500" />, description: "Gram altın, ziynet, külçe (TL değeri)", value: "" },
        { id: "silver", name: "Gümüş", icon: <Coins className="h-5 w-5 text-slate-400" />, description: "Gümüş takı ve değerli eşya (TL değeri)", value: "" },
        { id: "stocks", name: "Hisse & Yatırım", icon: <TrendingUp className="h-5 w-5 text-green-500" />, description: "Borsa, fon, kripto (TL değeri)", value: "" },
        { id: "property", name: "Ticari Gayrimenkul", icon: <Building2 className="h-5 w-5 text-blue-500" />, description: "Kiralık mülk, ticari mal (TL değeri)", value: "" },
        { id: "receivables", name: "Alacaklar", icon: <Wallet className="h-5 w-5 text-purple-500" />, description: "Tahsil edilebilir alacaklar (TL)", value: "" },
    ])

    const [debts, setDebts] = useState<string>("")
    const [result, setResult] = useState<{
        totalAssets: number
        totalDebts: number
        netWealth: number
        goldNisab: number
        silverNisab: number
        isZekatRequired: boolean
        zekatAmount: number
    } | null>(null)

    const updateAsset = (id: string, value: string) => {
        setAssets(prev => prev.map(asset =>
            asset.id === id ? { ...asset, value } : asset
        ))
    }

    const calculate = () => {
        const totalAssets = assets.reduce((sum, asset) => {
            const val = parseFloat(asset.value.replace(/[.,]/g, '')) || 0
            return sum + val
        }, 0)

        const totalDebts = parseFloat(debts.replace(/[.,]/g, '')) || 0
        const netWealth = totalAssets - totalDebts

        const goldNisab = GOLD_NISAB_GRAM * GOLD_PRICE_PER_GRAM
        const silverNisab = SILVER_NISAB_GRAM * SILVER_PRICE_PER_GRAM

        // Altın nisabı esas alınır (daha yaygın görüş)
        const isZekatRequired = netWealth >= goldNisab
        const zekatAmount = isZekatRequired ? netWealth * ZEKAT_RATE : 0

        setResult({
            totalAssets,
            totalDebts,
            netWealth,
            goldNisab,
            silverNisab,
            isZekatRequired,
            zekatAmount
        })
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value)
    }

    return (
        <div className="space-y-6">
            {/* Nisab Bilgi Kartı */}
            <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 border-emerald-200 dark:border-emerald-800">
                <CardHeader className="pb-2">
                    <CardTitle className="text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                        <span className="text-2xl">☪️</span>
                        2025 Nisab Miktarları
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Coins className="h-5 w-5 text-yellow-500" />
                                <span className="font-semibold">Altın Nisabı</span>
                            </div>
                            <p className="text-2xl font-bold text-yellow-600">{GOLD_NISAB_GRAM} gram</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                ≈ {formatCurrency(GOLD_NISAB_GRAM * GOLD_PRICE_PER_GRAM)}
                            </p>
                        </div>
                        <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Coins className="h-5 w-5 text-slate-400" />
                                <span className="font-semibold">Gümüş Nisabı</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-600">{SILVER_NISAB_GRAM} gram</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                ≈ {formatCurrency(SILVER_NISAB_GRAM * SILVER_PRICE_PER_GRAM)}
                            </p>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-3">
                        * Fiyatlar tahminidir. Güncel altın fiyatını kontrol ediniz.
                    </p>
                </CardContent>
            </Card>

            {/* Varlık Girişi */}
            <Card>
                <CardHeader>
                    <CardTitle>Zekat Hesaplama</CardTitle>
                    <CardDescription>
                        Tüm varlıklarınızın TL değerini girerek zekat miktarınızı hesaplayın
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                            <span className="text-green-500">+</span> Varlıklar
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            {assets.map((asset) => (
                                <div key={asset.id} className="space-y-2">
                                    <Label htmlFor={asset.id} className="flex items-center gap-2">
                                        {asset.icon}
                                        {asset.name}
                                    </Label>
                                    <Input
                                        id={asset.id}
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="0"
                                        value={asset.value}
                                        onChange={(e) => updateAsset(asset.id, e.target.value)}
                                    />
                                    <p className="text-xs text-slate-500">{asset.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="border-slate-200 dark:border-slate-700" />

                    <div>
                        <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                            <span className="text-red-500">−</span> Borçlar
                        </h3>
                        <div className="space-y-2 max-w-md">
                            <Label htmlFor="debts" className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                                Toplam Borçlar
                            </Label>
                            <Input
                                id="debts"
                                type="text"
                                inputMode="numeric"
                                placeholder="0"
                                value={debts}
                                onChange={(e) => setDebts(e.target.value)}
                            />
                            <p className="text-xs text-slate-500">
                                Vadesi gelmiş veya yakın borçlar (kredi, kira, fatura vb.)
                            </p>
                        </div>
                    </div>

                    <Button onClick={calculate} className="w-full" size="lg">
                        Zekat Hesapla
                    </Button>
                </CardContent>
            </Card>

            {/* Sonuç */}
            {result && (
                <Card className={`border-2 ${result.isZekatRequired
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
                    : 'border-slate-300 bg-slate-50 dark:bg-slate-900'}`}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {result.isZekatRequired ? (
                                <>
                                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                                    <span className="text-emerald-700 dark:text-emerald-300">Zekat Vermekle Mükellefsiniz</span>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="h-6 w-6 text-slate-500" />
                                    <span>Zekat Yükümlülüğü Bulunmuyor</span>
                                </>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid gap-3 md:grid-cols-3">
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                                    <p className="text-sm text-slate-500">Toplam Varlık</p>
                                    <p className="text-xl font-bold text-green-600">
                                        {formatCurrency(result.totalAssets)}
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                                    <p className="text-sm text-slate-500">Toplam Borç</p>
                                    <p className="text-xl font-bold text-red-600">
                                        {formatCurrency(result.totalDebts)}
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                                    <p className="text-sm text-slate-500">Net Servet</p>
                                    <p className="text-xl font-bold text-blue-600">
                                        {formatCurrency(result.netWealth)}
                                    </p>
                                </div>
                            </div>

                            {result.isZekatRequired && (
                                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white text-center">
                                    <p className="text-sm opacity-90 mb-1">Ödemeniz Gereken Zekat Miktarı (%2.5)</p>
                                    <p className="text-4xl font-bold">
                                        {formatCurrency(result.zekatAmount)}
                                    </p>
                                </div>
                            )}

                            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4 text-sm">
                                <p className="text-slate-600 dark:text-slate-400">
                                    <strong>Nisab Karşılaştırması:</strong><br />
                                    Net servetiniz ({formatCurrency(result.netWealth)})
                                    {result.isZekatRequired
                                        ? ` altın nisabını (${formatCurrency(result.goldNisab)}) aşmaktadır.`
                                        : ` nisab miktarının (${formatCurrency(result.goldNisab)}) altındadır.`
                                    }
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
