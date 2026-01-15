"use client"

import { useState, useEffect } from "react"
import { Clock, ArrowRightLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const timeZones = [
    { id: "Europe/Istanbul", label: "İstanbul (TR)", offset: 3 },
    { id: "Europe/London", label: "Londra (UK)", offset: 0 },
    { id: "Europe/Paris", label: "Paris (FR)", offset: 1 },
    { id: "Europe/Berlin", label: "Berlin (DE)", offset: 1 },
    { id: "Europe/Moscow", label: "Moskova (RU)", offset: 3 },
    { id: "America/New_York", label: "New York (US)", offset: -5 },
    { id: "America/Los_Angeles", label: "Los Angeles (US)", offset: -8 },
    { id: "America/Chicago", label: "Chicago (US)", offset: -6 },
    { id: "Asia/Tokyo", label: "Tokyo (JP)", offset: 9 },
    { id: "Asia/Shanghai", label: "Şanghay (CN)", offset: 8 },
    { id: "Asia/Dubai", label: "Dubai (AE)", offset: 4 },
    { id: "Asia/Singapore", label: "Singapur (SG)", offset: 8 },
    { id: "Australia/Sydney", label: "Sidney (AU)", offset: 11 },
    { id: "Pacific/Auckland", label: "Auckland (NZ)", offset: 13 }
]

export function TimezoneConverter() {
    const [fromZone, setFromZone] = useState("Europe/Istanbul")
    const [toZone, setToZone] = useState("America/New_York")
    const [fromTime, setFromTime] = useState("")
    const [toTime, setToTime] = useState("")
    const [currentTimes, setCurrentTimes] = useState<Record<string, string>>({})

    useEffect(() => {
        const updateCurrentTimes = () => {
            const times: Record<string, string> = {}
            timeZones.forEach(tz => {
                times[tz.id] = new Date().toLocaleTimeString('tr-TR', {
                    timeZone: tz.id,
                    hour: '2-digit',
                    minute: '2-digit'
                })
            })
            setCurrentTimes(times)
        }

        updateCurrentTimes()
        const interval = setInterval(updateCurrentTimes, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (fromTime) {
            const [hours, minutes] = fromTime.split(':').map(Number)
            const fromOffset = timeZones.find(tz => tz.id === fromZone)?.offset || 0
            const toOffset = timeZones.find(tz => tz.id === toZone)?.offset || 0

            let newHours = hours - fromOffset + toOffset
            if (newHours < 0) newHours += 24
            if (newHours >= 24) newHours -= 24

            setToTime(`${String(newHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`)
        }
    }, [fromTime, fromZone, toZone])

    const swapZones = () => {
        setFromZone(toZone)
        setToZone(fromZone)
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Clock className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Zaman Dilimi Çevirici</CardTitle>
                            <CardDescription className="text-amber-100">Farklı zaman dilimleri arasında çeviri yapın</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Kaynak Zaman Dilimi</Label>
                            <select
                                value={fromZone}
                                onChange={(e) => setFromZone(e.target.value)}
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700"
                            >
                                {timeZones.map((tz) => (
                                    <option key={tz.id} value={tz.id}>
                                        {tz.label} ({currentTimes[tz.id] || '--:--'})
                                    </option>
                                ))}
                            </select>
                            <input
                                type="time"
                                value={fromTime}
                                onChange={(e) => setFromTime(e.target.value)}
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700"
                            />
                        </div>

                        <div className="flex items-center justify-center sm:hidden">
                            <Button variant="outline" size="icon" onClick={swapZones}>
                                <ArrowRightLeft className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-2 relative">
                            <div className="hidden sm:block absolute -left-6 top-1/2 -translate-y-1/2">
                                <Button variant="outline" size="icon" onClick={swapZones} className="rounded-full">
                                    <ArrowRightLeft className="h-4 w-4" />
                                </Button>
                            </div>
                            <Label>Hedef Zaman Dilimi</Label>
                            <select
                                value={toZone}
                                onChange={(e) => setToZone(e.target.value)}
                                className="w-full h-12 px-3 rounded-md border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700"
                            >
                                {timeZones.map((tz) => (
                                    <option key={tz.id} value={tz.id}>
                                        {tz.label} ({currentTimes[tz.id] || '--:--'})
                                    </option>
                                ))}
                            </select>
                            <div className="h-12 px-3 flex items-center rounded-md border border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 font-mono text-lg">
                                {toTime || '--:--'}
                            </div>
                        </div>
                    </div>

                    {toTime && (
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-center">
                            <p className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                                {timeZones.find(tz => tz.id === fromZone)?.label} {fromTime} = {timeZones.find(tz => tz.id === toZone)?.label} {toTime}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
