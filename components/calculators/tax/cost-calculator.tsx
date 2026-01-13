"use client"

import { useState, useEffect, useCallback } from "react"
import { ClipboardList, Copy, Check, Calculator, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface CostItem {
    id: string
    name: string
    amount: string
}

interface CalculationResult {
    totalCost: number
    profitMargin: number
    profitAmount: number
    sellingPrice: number
    unitCost: number
    unitPrice: number
}

export function CostCalculator() {
    const [costItems, setCostItems] = useState<CostItem[]>([
        { id: "1", name: "Hammadde", amount: "" },
        { id: "2", name: "İşçilik", amount: "" }
    ])
    const [quantity, setQuantity] = useState<string>("1")
    const [profitMargin, setProfitMargin] = useState<string>("20")
    const [result, setResult] = useState<CalculationResult | null>(null)
    const [copied, setCopied] = useState<string | null>(null)

    const addCostItem = () => {
        setCostItems([...costItems, { id: Date.now().toString(), name: "", amount: "" }])
    }

    const removeCostItem = (id: string) => {
        if (costItems.length > 1) {
            setCostItems(costItems.filter(item => item.id !== id))
        }
    }

    const updateCostItem = (id: string, field: "name" | "amount", value: string) => {
        setCostItems(costItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ))
    }

    const calculateCost = useCallback(() => {
        const totalCost = costItems.reduce((sum, item) => {
            const amount = parseFloat(item.amount.replace(/,/g, "."))
            return sum + (isNaN(amount) ? 0 : amount)
        }, 0)

        const qty = parseInt(quantity) || 1
        const margin = parseFloat(profitMargin.replace(/,/g, ".")) || 0

        if (totalCost <= 0) {
            setResult(null)
            return
        }

        const profitAmount = totalCost * (margin / 100)
        const sellingPrice = totalCost + profitAmount
        const unitCost = totalCost / qty
        const unitPrice = sellingPrice / qty

        setResult({
            totalCost: Math.round(totalCost * 100) / 100,
            profitMargin: margin,
            profitAmount: Math.round(profitAmount * 100) / 100,
            sellingPrice: Math.round(sellingPrice * 100) / 100,
            unitCost: Math.round(unitCost * 100) / 100,
            unitPrice: Math.round(unitPrice * 100) / 100
        })
    }, [costItems, quantity, profitMargin])

    useEffect(() => {
        calculateCost()
    }, [calculateCost])

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
            minimumFractionDigits: 2
        }).format(value)
    }

    const copyToClipboard = async (value: string, type: string) => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(type)
            setTimeout(() => setCopied(null), 2000)
        } catch (err) {
            console.error("Kopyalama başarısız:", err)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <ClipboardList className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Maliyet Hesaplama</CardTitle>
                            <CardDescription className="text-teal-100">
                                Ürün veya hizmet maliyetini ve satış fiyatını hesaplayın
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    {/* Cost Items */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Maliyet Kalemleri
                        </Label>
                        {costItems.map((item, index) => (
                            <div key={item.id} className="flex gap-2">
                                <Input
                                    placeholder="Kalem adı"
                                    value={item.name}
                                    onChange={(e) => updateCostItem(item.id, "name", e.target.value)}
                                    className="flex-1"
                                />
                                <div className="relative w-32">
                                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₺</span>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="0"
                                        value={item.amount}
                                        onChange={(e) => updateCostItem(item.id, "amount", e.target.value.replace(/[^0-9.,]/g, ""))}
                                        className="pl-6"
                                    />
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeCostItem(item.id)}
                                    disabled={costItems.length === 1}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={addCostItem} className="w-full">
                            <Plus className="h-4 w-4 mr-2" /> Maliyet Kalemi Ekle
                        </Button>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="quantity" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Üretim Adedi
                            </Label>
                            <Input
                                id="quantity"
                                type="number"
                                min="1"
                                placeholder="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="h-12"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="profitMargin" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Kar Marjı (%)
                            </Label>
                            <div className="relative">
                                <Input
                                    id="profitMargin"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="20"
                                    value={profitMargin}
                                    onChange={(e) => setProfitMargin(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="pr-8 h-12"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-lg border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-teal-500" />
                            Hesaplama Sonucu
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Toplam Maliyet</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">
                                    {formatCurrency(result.totalCost)}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                                <p className="text-sm text-green-600 dark:text-green-400">Kar (%{result.profitMargin})</p>
                                <p className="text-xl font-bold text-green-700 dark:text-green-300">
                                    +{formatCurrency(result.profitAmount)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                            <div>
                                <p className="text-sm text-teal-100">Toplam Satış Fiyatı</p>
                                <p className="text-3xl font-bold">{formatCurrency(result.sellingPrice)}</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => copyToClipboard(result.sellingPrice.toFixed(2), "total")}
                                className="bg-white/20 hover:bg-white/30 text-white border-0"
                            >
                                {copied === "total" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        {parseInt(quantity) > 1 && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                                    <p className="text-xs text-slate-500">Birim Maliyet</p>
                                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                                        {formatCurrency(result.unitCost)}
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-900/20">
                                    <p className="text-xs text-teal-600">Birim Satış Fiyatı</p>
                                    <p className="text-lg font-semibold text-teal-700 dark:text-teal-300">
                                        {formatCurrency(result.unitPrice)}
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
