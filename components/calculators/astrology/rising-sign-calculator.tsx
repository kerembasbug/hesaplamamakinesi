"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ZodiacSign = {
    name: string
    symbol: string
    element: string
    ruling: string
    traits: string[]
}

const zodiacSigns: ZodiacSign[] = [
    { name: "Koç", symbol: "♈", element: "Ateş", ruling: "Mars", traits: ["Enerjik", "Cesur", "Girişken", "Rekabetçi"] },
    { name: "Boğa", symbol: "♉", element: "Toprak", ruling: "Venüs", traits: ["Kararlı", "Sadık", "Sabırlı", "Güvenilir"] },
    { name: "İkizler", symbol: "♊", element: "Hava", ruling: "Merkür", traits: ["Meraklı", "Sosyal", "Çok yönlü", "Zeki"] },
    { name: "Yengeç", symbol: "♋", element: "Su", ruling: "Ay", traits: ["Duygusal", "Koruyucu", "Sezgisel", "Şefkatli"] },
    { name: "Aslan", symbol: "♌", element: "Ateş", ruling: "Güneş", traits: ["Lider", "Yaratıcı", "Cömert", "Karizmatik"] },
    { name: "Başak", symbol: "♍", element: "Toprak", ruling: "Merkür", traits: ["Analitik", "Pratik", "Titiz", "Yardımsever"] },
    { name: "Terazi", symbol: "♎", element: "Hava", ruling: "Venüs", traits: ["Diplomatik", "Zarif", "Adil", "Uyumlu"] },
    { name: "Akrep", symbol: "♏", element: "Su", ruling: "Plüton", traits: ["Tutkulu", "Kararlı", "Gizemli", "Sezgisel"] },
    { name: "Yay", symbol: "♐", element: "Ateş", ruling: "Jüpiter", traits: ["Maceracı", "İyimser", "Özgür", "Felsefi"] },
    { name: "Oğlak", symbol: "♑", element: "Toprak", ruling: "Satürn", traits: ["Disiplinli", "Sorumlu", "Hırslı", "Geleneksel"] },
    { name: "Kova", symbol: "♒", element: "Hava", ruling: "Uranüs", traits: ["Yenilikçi", "Bağımsız", "İnsancıl", "Orijinal"] },
    { name: "Balık", symbol: "♓", element: "Su", ruling: "Neptün", traits: ["Hayalperest", "Empatik", "Sanatsal", "Mistik"] },
]

// Yükselen burç hesaplama tablosu (doğum saatine ve güneş burcuna göre)
const ascendantTable: { [key: number]: number[] } = {
    // Saat aralıklarına göre yükselen burç offset değerleri
    0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 00:00 - 02:00
    2: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 02:00 - 04:00
    4: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], // 04:00 - 06:00
    6: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], // 06:00 - 08:00
    8: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4], // 08:00 - 10:00
    10: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], // 10:00 - 12:00
    12: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], // 12:00 - 14:00
    14: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7], // 14:00 - 16:00
    16: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8], // 16:00 - 18:00
    18: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], // 18:00 - 20:00
    20: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], // 20:00 - 22:00
    22: [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11], // 22:00 - 24:00
}

export function RisingSignCalculator() {
    const [birthDate, setBirthDate] = useState<string>("")
    const [birthHour, setBirthHour] = useState<string>("")
    const [birthMinute, setBirthMinute] = useState<string>("")
    const [result, setResult] = useState<{
        sunSign: ZodiacSign
        risingSign: ZodiacSign
        sunSignIndex: number
        risingSignIndex: number
    } | null>(null)

    const getSunSign = (month: number, day: number): number => {
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 0 // Koç
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 1 // Boğa
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 2 // İkizler
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 3 // Yengeç
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 4 // Aslan
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 5 // Başak
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 6 // Terazi
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 7 // Akrep
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 8 // Yay
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 9 // Oğlak
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 10 // Kova
        return 11 // Balık
    }

    const calculateRisingSign = (hour: number, minute: number, sunSignIndex: number): number => {
        // Dakikayı da hesaba kat
        const totalMinutes = hour * 60 + minute
        // Her burç yaklaşık 2 saat (120 dakika) sürer
        const offset = Math.floor(totalMinutes / 120)
        return (sunSignIndex + offset) % 12
    }

    const calculate = () => {
        if (!birthDate || !birthHour) return

        const date = new Date(birthDate)
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = parseInt(birthHour) || 0
        const minute = parseInt(birthMinute) || 0

        const sunSignIndex = getSunSign(month, day)
        const risingSignIndex = calculateRisingSign(hour, minute, sunSignIndex)

        setResult({
            sunSign: zodiacSigns[sunSignIndex],
            risingSign: zodiacSigns[risingSignIndex],
            sunSignIndex,
            risingSignIndex
        })
    }

    const getElementColor = (element: string) => {
        switch (element) {
            case "Ateş": return "from-red-500 to-orange-500"
            case "Toprak": return "from-amber-600 to-yellow-600"
            case "Hava": return "from-sky-500 to-cyan-500"
            case "Su": return "from-blue-600 to-indigo-600"
            default: return "from-purple-500 to-pink-500"
        }
    }

    const getElementBg = (element: string) => {
        switch (element) {
            case "Ateş": return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
            case "Toprak": return "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800"
            case "Hava": return "bg-sky-50 dark:bg-sky-950 border-sky-200 dark:border-sky-800"
            case "Su": return "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
            default: return ""
        }
    }

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">⬆️</span>
                        Yükselen Burç Hesaplama
                    </CardTitle>
                    <CardDescription>
                        Doğum tarihi ve saatinizi girerek yükselen burcunuzu öğrenin
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="birthDate">Doğum Tarihi</Label>
                        <Input
                            id="birthDate"
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="max-w-xs"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="birthHour">Doğum Saati</Label>
                            <Select value={birthHour} onValueChange={setBirthHour}>
                                <SelectTrigger id="birthHour">
                                    <SelectValue placeholder="Saat seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {hours.map((h) => (
                                        <SelectItem key={h} value={h}>{h}:00</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="birthMinute">Dakika (opsiyonel)</Label>
                            <Select value={birthMinute} onValueChange={setBirthMinute}>
                                <SelectTrigger id="birthMinute">
                                    <SelectValue placeholder="Dakika seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {minutes.map((m) => (
                                        <SelectItem key={m} value={m}>:{m}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg text-sm text-amber-800 dark:text-amber-200">
                        <strong>💡 İpucu:</strong> Yükselen burcunuz için doğum saatinizin bilinmesi zorunludur.
                        Doğum saatinizi nüfus müdürlüğünden veya hastane kayıtlarından öğrenebilirsiniz.
                    </div>

                    <Button onClick={calculate} className="w-full" size="lg">
                        Yükselen Burcumu Hesapla
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <div className="space-y-6">
                    {/* Yükselen Burç Sonucu */}
                    <Card className={`border-2 ${getElementBg(result.risingSign.element)}`}>
                        <CardHeader className="text-center pb-2">
                            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Yükselen Burcunuz
                            </p>
                            <div className="text-6xl my-2">{result.risingSign.symbol}</div>
                            <CardTitle className={`text-4xl bg-gradient-to-r ${getElementColor(result.risingSign.element)} bg-clip-text text-transparent`}>
                                {result.risingSign.name}
                            </CardTitle>
                            <CardDescription className="text-lg">
                                {result.risingSign.element} elementi • Yönetici: {result.risingSign.ruling}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap justify-center gap-2 mt-2">
                                {result.risingSign.traits.map((trait, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full text-sm font-medium"
                                    >
                                        {trait}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Güneş Burcu Karşılaştırma */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader className="text-center pb-2">
                                <p className="text-sm text-slate-500">☀️ Güneş Burcu</p>
                                <div className="text-4xl my-1">{result.sunSign.symbol}</div>
                                <CardTitle className="text-2xl">{result.sunSign.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-sm text-slate-600 dark:text-slate-400">
                                Temel kimliğiniz, egonuz ve yaşam enerjinizi temsil eder.
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-indigo-200 dark:border-indigo-800">
                            <CardHeader className="text-center pb-2">
                                <p className="text-sm text-indigo-600 dark:text-indigo-400">⬆️ Yükselen Burç</p>
                                <div className="text-4xl my-1">{result.risingSign.symbol}</div>
                                <CardTitle className="text-2xl text-indigo-700 dark:text-indigo-300">
                                    {result.risingSign.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-sm text-slate-600 dark:text-slate-400">
                                Dış görünüşünüz, ilk izleniminiz ve başkalarının sizi nasıl gördüğünü temsil eder.
                            </CardContent>
                        </Card>
                    </div>

                    {/* Yükselen Burç Yorumu */}
                    <Card>
                        <CardHeader>
                            <CardTitle>🔮 {result.risingSign.name} Yükseleni Yorumu</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                            <p>
                                <strong>{result.risingSign.name}</strong> yükselenine sahip olmanız, insanların sizinle
                                ilk tanıştıklarında {result.risingSign.traits[0].toLowerCase()} ve {result.risingSign.traits[1].toLowerCase()} bir
                                kişilik algıladığı anlamına gelir.
                            </p>
                            <p>
                                {result.risingSign.element} elementi olarak, {result.risingSign.element === "Ateş"
                                    ? "enerjik ve dinamik bir hava yayarsınız"
                                    : result.risingSign.element === "Toprak"
                                        ? "güvenilir ve sağlam bir izlenim bırakırsınız"
                                        : result.risingSign.element === "Hava"
                                            ? "sosyal ve iletişime açık görünürsünüz"
                                            : "duygusal derinlik ve sezgisellik yansıtırsınız"}.
                            </p>
                            <p>
                                Yönetici gezegeniniz <strong>{result.risingSign.ruling}</strong> olduğu için, bu gezegenin
                                doğum haritanızdaki konumu da fiziksel görünüşünüzü ve dışa yansıttığınız enerjiyi etkiler.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
