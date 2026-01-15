"use client"

import { useState, useCallback, useEffect } from "react"
import { Car, Copy, Check, Calculator, MapPin, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const taxiData = {
    istanbul: {
        acilis: 24.55,
        kmBasi: 17.62,
        indiBindi: 90,
        birimZaman: 120 // 1 saat bekleme/yavaş trafik maliyeti yaklaşık
    },
    ankara: {
        acilis: 25,
        kmBasi: 20,
        indiBindi: 75,
        birimZaman: 100
    }
}

export function TaxiCalculator() {
    const [city, setCity] = useState<"istanbul" | "ankara">("istanbul")
    const [distance, setDistance] = useState<string>("10")
    const [traffic, setTraffic] = useState<string>("normal") // normal, yogun, akici
    const [result, setResult] = useState<{
        toplam: number
        detay: string
    } | null>(null)
    const [copied, setCopied] = useState(false)

    const calculate = useCallback(() => {
        const d = parseFloat(distance.replace(",", "."))
        if (isNaN(d) || d < 0) {
            setResult(null)
            return
        }

        const { acilis, kmBasi, indiBindi } = taxiData[city]

        // Trafik çarpanı
        let trafikMaliyeti = 0
        if (traffic === "yogun") trafikMaliyeti = d * 2.5 // Tahmini bekleme maliyeti
        else if (traffic === "normal") trafikMaliyeti = d * 0.8

        let toplam = acilis + (d * kmBasi) + trafikMaliyeti

        // İndi-bindi kontrolü
        if (toplam < indiBindi) {
            toplam = indiBindi
        }

        setResult({
            toplam: Math.round(toplam * 100) / 100,
            detay: `${city.charAt(0).toUpperCase() + city.slice(1)} - ${d} km`
        })
    }, [city, distance, traffic])

    useEffect(() => {
        calculate()
    }, [calculate])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(value)
    }

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`${result.detay} Taksi Ücreti: ${formatCurrency(result.toplam)}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Car className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Taksi Ücreti Hesaplama</CardTitle>
                            <CardDescription className="text-yellow-100">
                                İstanbul ve Ankara 2025 güncel tarifeleri
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Şehir</Label>
                            <div className="flex gap-2">
                                <Button
                                    variant={city === "istanbul" ? "default" : "outline"}
                                    className={`flex-1 ${city === "istanbul" ? "bg-yellow-600 hover:bg-yellow-700" : ""}`}
                                    onClick={() => setCity("istanbul")}
                                >
                                    İstanbul
                                </Button>
                                <Button
                                    variant={city === "ankara" ? "default" : "outline"}
                                    className={`flex-1 ${city === "ankara" ? "bg-yellow-600 hover:bg-yellow-700" : ""}`}
                                    onClick={() => setCity("ankara")}
                                >
                                    Ankara
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Gidilecek Mesafe (KM)</Label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="Mesafe girin"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value.replace(/[^0-9.,]/g, ""))}
                                    className="h-12 pr-10"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">km</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Trafik Durumu</Label>
                        <div className="flex gap-2">
                            {["akici", "normal", "yogun"].map((t) => (
                                <Button
                                    key={t}
                                    variant={traffic === t ? "secondary" : "ghost"}
                                    className={`flex-1 border capitalize ${traffic === t ? "bg-slate-100 border-slate-300" : "border-transparent"}`}
                                    onClick={() => setTraffic(t)}
                                >
                                    {t === "akici" ? "Akıcı" : t === "normal" ? "Normal" : "Yoğun"}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 text-sm italic text-yellow-800 dark:text-yellow-300">
                        <Info className="h-4 w-4 inline mr-2" />
                        Tarife Notu: {city === "istanbul" ? "Açılış 24.55 TL, KM başı 17.62 TL" : "Açılış 25.00 TL, KM başı 20.00 TL"}. İndi-bindi {taxiData[city].indiBindi} TL.
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                Tahmini Ücret
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
                            <p className="text-sm text-yellow-100 mb-1">Tahmini Taksi Ücreti</p>
                            <p className="text-5xl font-bold">{formatCurrency(result.toplam)}</p>
                            <p className="text-yellow-100 mt-2">Trafik ve bekleme dahildir</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
