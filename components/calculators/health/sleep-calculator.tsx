"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Clock, Zap, AlarmClock } from "lucide-react"

// Uyku döngüsü süresi (dakika)
const SLEEP_CYCLE = 90
// Uykuya dalma süresi (dakika)
const FALL_ASLEEP_TIME = 15

type SleepTime = {
    time: string
    cycles: number
    duration: string
    quality: "optimal" | "good" | "minimum"
}

export function SleepCalculator() {
    const [mode, setMode] = useState<"wakeup" | "sleep">("wakeup")
    const [wakeHour, setWakeHour] = useState<number>(7)
    const [wakeMinute, setWakeMinute] = useState<number>(0)
    const [sleepHour, setSleepHour] = useState<number>(23)
    const [sleepMinute, setSleepMinute] = useState<number>(0)
    const [results, setResults] = useState<SleepTime[]>([])
    const [showResults, setShowResults] = useState(false)

    const formatTime = (hours: number, minutes: number): string => {
        const h = ((hours % 24) + 24) % 24
        return `${h.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }

    const calculateBedtimes = () => {
        const times: SleepTime[] = []
        const wakeUpMinutes = wakeHour * 60 + wakeMinute

        // 6, 5, 4, 3 döngü için hesapla (9, 7.5, 6, 4.5 saat)
        for (let cycles = 6; cycles >= 3; cycles--) {
            const sleepDuration = cycles * SLEEP_CYCLE
            const bedtimeMinutes = wakeUpMinutes - sleepDuration - FALL_ASLEEP_TIME

            const bedHours = Math.floor(bedtimeMinutes / 60)
            const bedMins = bedtimeMinutes % 60

            const hours = Math.floor(sleepDuration / 60)
            const mins = sleepDuration % 60

            times.push({
                time: formatTime(bedHours, bedMins < 0 ? 60 + bedMins : bedMins),
                cycles,
                duration: `${hours} saat${mins > 0 ? ` ${mins} dk` : ''}`,
                quality: cycles >= 5 ? "optimal" : cycles >= 4 ? "good" : "minimum"
            })
        }

        setResults(times)
        setShowResults(true)
    }

    const calculateWakeUpTimes = () => {
        const times: SleepTime[] = []
        const sleepMinutes = sleepHour * 60 + sleepMinute + FALL_ASLEEP_TIME

        // 3, 4, 5, 6 döngü için hesapla
        for (let cycles = 3; cycles <= 6; cycles++) {
            const sleepDuration = cycles * SLEEP_CYCLE
            const wakeUpMinutes = sleepMinutes + sleepDuration

            const wakeHours = Math.floor(wakeUpMinutes / 60)
            const wakeMins = wakeUpMinutes % 60

            const hours = Math.floor(sleepDuration / 60)
            const mins = sleepDuration % 60

            times.push({
                time: formatTime(wakeHours, wakeMins),
                cycles,
                duration: `${hours} saat${mins > 0 ? ` ${mins} dk` : ''}`,
                quality: cycles >= 5 ? "optimal" : cycles >= 4 ? "good" : "minimum"
            })
        }

        setResults(times)
        setShowResults(true)
    }

    const calculateSleepNow = () => {
        const now = new Date()
        setSleepHour(now.getHours())
        setSleepMinute(now.getMinutes())
        setMode("sleep")

        const times: SleepTime[] = []
        const sleepMinutes = now.getHours() * 60 + now.getMinutes() + FALL_ASLEEP_TIME

        for (let cycles = 3; cycles <= 6; cycles++) {
            const sleepDuration = cycles * SLEEP_CYCLE
            const wakeUpMinutes = sleepMinutes + sleepDuration

            const wakeHours = Math.floor(wakeUpMinutes / 60)
            const wakeMins = wakeUpMinutes % 60

            const hours = Math.floor(sleepDuration / 60)
            const mins = sleepDuration % 60

            times.push({
                time: formatTime(wakeHours, wakeMins),
                cycles,
                duration: `${hours} saat${mins > 0 ? ` ${mins} dk` : ''}`,
                quality: cycles >= 5 ? "optimal" : cycles >= 4 ? "good" : "minimum"
            })
        }

        setResults(times)
        setShowResults(true)
    }

    const getQualityColor = (quality: string) => {
        switch (quality) {
            case "optimal": return "bg-green-500"
            case "good": return "bg-yellow-500"
            case "minimum": return "bg-orange-500"
            default: return "bg-slate-500"
        }
    }

    const getQualityLabel = (quality: string) => {
        switch (quality) {
            case "optimal": return "Optimal"
            case "good": return "İyi"
            case "minimum": return "Minimum"
            default: return ""
        }
    }

    const hours = Array.from({ length: 24 }, (_, i) => i)
    const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

    return (
        <div className="space-y-6">
            {/* Mod Seçimi */}
            <Card className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white border-0">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl flex items-center justify-center gap-2">
                        <Moon className="h-6 w-6" />
                        Uyku Hesaplayıcı
                    </CardTitle>
                    <CardDescription className="text-indigo-200">
                        Uyku döngülerine göre ideal yatma ve kalkma saatlerini hesaplayın
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Mod Butonları */}
                    <div className="grid gap-3 md:grid-cols-2">
                        <Button
                            variant={mode === "wakeup" ? "default" : "outline"}
                            className={`h-auto py-4 ${mode === "wakeup"
                                ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                                : "bg-transparent border-indigo-400 text-indigo-200 hover:bg-indigo-800"}`}
                            onClick={() => { setMode("wakeup"); setShowResults(false) }}
                        >
                            <div className="flex flex-col items-center gap-1">
                                <Sun className="h-5 w-5" />
                                <span className="font-semibold">Kaçta Yatmalıyım?</span>
                                <span className="text-xs opacity-80">Kalkış saatini biliyorum</span>
                            </div>
                        </Button>
                        <Button
                            variant={mode === "sleep" ? "default" : "outline"}
                            className={`h-auto py-4 ${mode === "sleep"
                                ? "bg-purple-500 hover:bg-purple-600 text-white"
                                : "bg-transparent border-purple-400 text-purple-200 hover:bg-purple-800"}`}
                            onClick={() => { setMode("sleep"); setShowResults(false) }}
                        >
                            <div className="flex flex-col items-center gap-1">
                                <Moon className="h-5 w-5" />
                                <span className="font-semibold">Kaçta Kalkmalıyım?</span>
                                <span className="text-xs opacity-80">Yatış saatini biliyorum</span>
                            </div>
                        </Button>
                    </div>

                    {/* Saat Seçimi */}
                    {mode === "wakeup" ? (
                        <div className="text-center">
                            <p className="text-indigo-200 mb-3">Kaçta kalkmak istiyorsunuz?</p>
                            <div className="flex items-center justify-center gap-2">
                                <select
                                    value={wakeHour}
                                    onChange={(e) => setWakeHour(parseInt(e.target.value))}
                                    className="bg-indigo-800 text-white text-3xl font-bold p-3 rounded-lg border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                >
                                    {hours.map(h => (
                                        <option key={h} value={h}>{h.toString().padStart(2, '0')}</option>
                                    ))}
                                </select>
                                <span className="text-3xl font-bold">:</span>
                                <select
                                    value={wakeMinute}
                                    onChange={(e) => setWakeMinute(parseInt(e.target.value))}
                                    className="bg-indigo-800 text-white text-3xl font-bold p-3 rounded-lg border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                >
                                    {minutes.map(m => (
                                        <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>
                                    ))}
                                </select>
                            </div>
                            <Button
                                onClick={calculateBedtimes}
                                className="mt-4 bg-indigo-500 hover:bg-indigo-600"
                                size="lg"
                            >
                                <Moon className="mr-2 h-5 w-5" />
                                Yatma Saatlerini Hesapla
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-purple-200 mb-3">Kaçta yatacaksınız?</p>
                            <div className="flex items-center justify-center gap-2">
                                <select
                                    value={sleepHour}
                                    onChange={(e) => setSleepHour(parseInt(e.target.value))}
                                    className="bg-purple-800 text-white text-3xl font-bold p-3 rounded-lg border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                >
                                    {hours.map(h => (
                                        <option key={h} value={h}>{h.toString().padStart(2, '0')}</option>
                                    ))}
                                </select>
                                <span className="text-3xl font-bold">:</span>
                                <select
                                    value={sleepMinute}
                                    onChange={(e) => setSleepMinute(parseInt(e.target.value))}
                                    className="bg-purple-800 text-white text-3xl font-bold p-3 rounded-lg border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
                                >
                                    {minutes.map(m => (
                                        <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>
                                    ))}
                                </select>
                            </div>
                            <Button
                                onClick={calculateWakeUpTimes}
                                className="mt-4 bg-purple-500 hover:bg-purple-600"
                                size="lg"
                            >
                                <Sun className="mr-2 h-5 w-5" />
                                Kalkma Saatlerini Hesapla
                            </Button>
                        </div>
                    )}

                    {/* Şimdi Yatsam Butonu */}
                    <div className="text-center pt-2 border-t border-indigo-700">
                        <Button
                            onClick={calculateSleepNow}
                            variant="outline"
                            className="bg-transparent border-yellow-400 text-yellow-300 hover:bg-yellow-900/30"
                        >
                            <Zap className="mr-2 h-4 w-4" />
                            Şimdi Yatsam Ne Zaman Kalkmalıyım?
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Sonuçlar */}
            {showResults && results.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlarmClock className="h-5 w-5 text-indigo-600" />
                            {mode === "wakeup" ? "Önerilen Yatma Saatleri" : "Önerilen Kalkma Saatleri"}
                        </CardTitle>
                        <CardDescription>
                            Uyku döngüsü sonunda uyanmak için ideal saatler
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 md:grid-cols-2">
                            {results.map((result, index) => (
                                <div
                                    key={index}
                                    className={`relative overflow-hidden rounded-xl p-4 ${result.quality === "optimal"
                                            ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-200 dark:border-green-800"
                                            : result.quality === "good"
                                                ? "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border border-yellow-200 dark:border-yellow-800"
                                                : "bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border border-orange-200 dark:border-orange-800"
                                        }`}
                                >
                                    {result.quality === "optimal" && (
                                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                            ⭐ Önerilen
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-3xl font-bold text-slate-900 dark:text-white">
                                                {result.time}
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                {result.duration} uyku
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs ${getQualityColor(result.quality)}`}>
                                                <Clock className="h-3 w-3" />
                                                {result.cycles} döngü
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1">
                                                {getQualityLabel(result.quality)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-950 rounded-lg text-sm text-slate-600 dark:text-slate-400">
                            <strong>💡 İpucu:</strong> Her uyku döngüsü yaklaşık 90 dakikadır. Döngü sonunda uyanmak
                            daha dinlenmiş hissetmenizi sağlar. Uykuya dalma süresi (~15 dk) hesaplamaya dahildir.
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
