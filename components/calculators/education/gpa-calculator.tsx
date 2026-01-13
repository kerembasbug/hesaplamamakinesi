"use client"

import { useState, useCallback, useEffect } from "react"
import { GraduationCap, Copy, Check, Calculator, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface Course {
    id: string
    name: string
    credits: string
    grade: string
}

const gradePoints: Record<string, number> = {
    "AA": 4.0, "BA": 3.5, "BB": 3.0, "CB": 2.5, "CC": 2.0, "DC": 1.5, "DD": 1.0, "FD": 0.5, "FF": 0
}

const gradeColors: Record<string, string> = {
    "AA": "text-green-600", "BA": "text-green-500", "BB": "text-blue-600", "CB": "text-blue-500",
    "CC": "text-yellow-600", "DC": "text-orange-500", "DD": "text-orange-600", "FD": "text-red-500", "FF": "text-red-600"
}

export function GpaCalculator() {
    const [courses, setCourses] = useState<Course[]>([
        { id: "1", name: "", credits: "3", grade: "BB" },
        { id: "2", name: "", credits: "3", grade: "BB" }
    ])
    const [result, setResult] = useState<{ gpa: number; totalCredits: number } | null>(null)
    const [copied, setCopied] = useState(false)

    const addCourse = () => {
        setCourses([...courses, { id: Date.now().toString(), name: "", credits: "3", grade: "BB" }])
    }

    const removeCourse = (id: string) => {
        if (courses.length > 1) {
            setCourses(courses.filter(c => c.id !== id))
        }
    }

    const updateCourse = (id: string, field: keyof Course, value: string) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c))
    }

    const calculate = useCallback(() => {
        let totalPoints = 0
        let totalCredits = 0

        courses.forEach(course => {
            const credits = parseInt(course.credits) || 0
            const points = gradePoints[course.grade] || 0
            totalPoints += credits * points
            totalCredits += credits
        })

        const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0
        setResult({ gpa: Math.round(gpa * 100) / 100, totalCredits })
    }, [courses])

    useEffect(() => {
        calculate()
    }, [calculate])

    const copyToClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(`GPA: ${result.gpa}`)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const getGpaStatus = (gpa: number) => {
        if (gpa >= 3.5) return { text: "Yüksek Onur", color: "text-green-600" }
        if (gpa >= 3.0) return { text: "Onur", color: "text-blue-600" }
        if (gpa >= 2.0) return { text: "Başarılı", color: "text-yellow-600" }
        return { text: "Koşullu", color: "text-red-600" }
    }

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6">
            <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <GraduationCap className="h-7 w-7" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">GPA Hesaplama</CardTitle>
                            <CardDescription className="text-violet-100">
                                Genel Not Ortalaması (4.0 üzerinden)
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    {courses.map((course, index) => (
                        <div key={course.id} className="flex gap-3 items-end p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                            <div className="w-8 text-center font-bold text-slate-400">{index + 1}</div>
                            <div className="flex-1 space-y-1">
                                <Label className="text-xs">Ders Adı (Opsiyonel)</Label>
                                <Input
                                    placeholder="Matematik"
                                    value={course.name}
                                    onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                                    className="h-10"
                                />
                            </div>
                            <div className="w-20 space-y-1">
                                <Label className="text-xs">Kredi</Label>
                                <select
                                    value={course.credits}
                                    onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                                    className="w-full h-10 px-2 rounded-md border border-slate-300 bg-white dark:bg-slate-800"
                                >
                                    {[1, 2, 3, 4, 5, 6].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="w-24 space-y-1">
                                <Label className="text-xs">Harf Notu</Label>
                                <select
                                    value={course.grade}
                                    onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                                    className={`w-full h-10 px-2 rounded-md border border-slate-300 bg-white dark:bg-slate-800 font-bold ${gradeColors[course.grade]}`}
                                >
                                    {Object.entries(gradePoints).map(([grade, point]) => (
                                        <option key={grade} value={grade}>{grade} ({point.toFixed(1)})</option>
                                    ))}
                                </select>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeCourse(course.id)} className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}

                    <Button onClick={addCourse} variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Ders Ekle
                    </Button>
                </CardContent>
            </Card>

            {result && (
                <Card className="shadow-xl border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Calculator className="h-6 w-6" />
                                GPA Sonucu
                            </CardTitle>
                            <Button variant="secondary" size="sm" onClick={copyToClipboard} className="bg-white/20 hover:bg-white/30 text-white border-0">
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                            <p className="text-sm text-violet-100 mb-1">Genel Not Ortalamanız</p>
                            <p className="text-5xl font-bold">{result.gpa.toFixed(2)}</p>
                            <p className="text-violet-100 mt-2">4.00 üzerinden</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-sm text-slate-500">Toplam Kredi</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{result.totalCredits}</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <p className="text-sm text-slate-500">Durum</p>
                                <p className={`text-2xl font-bold ${getGpaStatus(result.gpa).color}`}>{getGpaStatus(result.gpa).text}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
