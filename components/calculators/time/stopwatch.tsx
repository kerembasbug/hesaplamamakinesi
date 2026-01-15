"use client"

import { useState, useEffect, useRef } from "react"
import { Timer, Play, Pause, RotateCcw, Flag, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Stopwatch() {
    const [time, setTime] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [laps, setLaps] = useState<number[]>([])
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prev => prev + 10)
            }, 10)
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isRunning])

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        const centiseconds = Math.floor((ms % 1000) / 10)
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`
    }

    const handleStartStop = () => {
        setIsRunning(!isRunning)
    }

    const handleReset = () => {
        setIsRunning(false)
        setTime(0)
        setLaps([])
    }

    const handleLap = () => {
        if (isRunning) {
            setLaps(prev => [...prev, time])
        }
    }

    const removeLap = (index: number) => {
        setLaps(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Timer className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Kronometre</CardTitle>
                            <CardDescription className="text-rose-100">Online kronometre ve tur sayacı</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="text-center py-8">
                        <div className="text-6xl sm:text-7xl font-mono font-bold text-slate-900 dark:text-white">
                            {formatTime(time)}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Button
                            size="lg"
                            onClick={handleStartStop}
                            className={isRunning ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"}
                        >
                            {isRunning ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                            {isRunning ? "Duraklat" : "Başlat"}
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={handleLap}
                            disabled={!isRunning}
                        >
                            <Flag className="h-5 w-5 mr-2" />
                            Tur
                        </Button>
                        <Button
                            size="lg"
                            variant="destructive"
                            onClick={handleReset}
                        >
                            <RotateCcw className="h-5 w-5 mr-2" />
                            Sıfırla
                        </Button>
                    </div>

                    {laps.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900 dark:text-white">Turlar</h3>
                            <div className="max-h-48 overflow-y-auto space-y-2">
                                {laps.map((lap, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                                    >
                                        <span className="text-slate-600 dark:text-slate-400">Tur {index + 1}</span>
                                        <span className="font-mono font-semibold">{formatTime(lap)}</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeLap(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
