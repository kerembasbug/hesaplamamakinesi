"use client"

import { useState, useCallback } from "react"
import { Square, Calculator, Circle, Triangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type ShapeType = "rectangle" | "circle" | "triangle" | "trapezoid"

export function AreaCalculator() {
    const [shapeType, setShapeType] = useState<ShapeType>("rectangle")
    const [dimensions, setDimensions] = useState<Record<string, string>>({})
    const [result, setResult] = useState<number | null>(null)

    const calculate = useCallback(() => {
        const getValue = (key: string) => parseFloat(dimensions[key]?.replace(/,/g, ".") || "0")

        let area: number | null = null
        switch (shapeType) {
            case "rectangle":
                const width = getValue("width")
                const height = getValue("height")
                if (width > 0 && height > 0) area = width * height
                break
            case "circle":
                const radius = getValue("radius")
                if (radius > 0) area = Math.PI * radius * radius
                break
            case "triangle":
                const base = getValue("base")
                const triHeight = getValue("triHeight")
                if (base > 0 && triHeight > 0) area = (base * triHeight) / 2
                break
            case "trapezoid":
                const topBase = getValue("topBase")
                const bottomBase = getValue("bottomBase")
                const trapHeight = getValue("trapHeight")
                if (topBase > 0 && bottomBase > 0 && trapHeight > 0) {
                    area = ((topBase + bottomBase) * trapHeight) / 2
                }
                break
        }
        setResult(area)
    }, [dimensions, shapeType])

    const handleInputChange = (key: string, value: string) => {
        setDimensions(prev => ({ ...prev, [key]: value.replace(/[^0-9.,]/g, "") }))
    }

    const shapes = [
        { value: "rectangle", label: "Dikdörtgen", icon: Square },
        { value: "circle", label: "Daire", icon: Circle },
        { value: "triangle", label: "Üçgen", icon: Triangle },
        { value: "trapezoid", label: "Yamuk", icon: Square }
    ]

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg"><Calculator className="h-6 w-6" /></div>
                        <div>
                            <CardTitle className="text-xl">Alan Hesaplama</CardTitle>
                            <CardDescription className="text-emerald-100">Geometrik şekillerin alanını hesaplayın</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {shapes.map((shape) => (
                            <Button
                                key={shape.value}
                                variant={shapeType === shape.value ? "default" : "outline"}
                                className={shapeType === shape.value ? "bg-emerald-600" : ""}
                                onClick={() => {
                                    setShapeType(shape.value as ShapeType)
                                    setDimensions({})
                                    setResult(null)
                                }}
                            >
                                <shape.icon className="h-4 w-4 mr-2" />
                                {shape.label}
                            </Button>
                        ))}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {shapeType === "rectangle" && (
                            <>
                                <div className="space-y-2">
                                    <Label>Genişlik</Label>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="Genişlik girin"
                                        value={dimensions.width || ""}
                                        onChange={(e) => handleInputChange("width", e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Yükseklik</Label>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="Yükseklik girin"
                                        value={dimensions.height || ""}
                                        onChange={(e) => handleInputChange("height", e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                            </>
                        )}
                        {shapeType === "circle" && (
                            <div className="space-y-2 sm:col-span-2">
                                <Label>Yarıçap</Label>
                                <Input
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="Yarıçap girin"
                                    value={dimensions.radius || ""}
                                    onChange={(e) => handleInputChange("radius", e.target.value)}
                                    className="h-12"
                                />
                            </div>
                        )}
                        {shapeType === "triangle" && (
                            <>
                                <div className="space-y-2">
                                    <Label>Taban</Label>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="Taban uzunluğu"
                                        value={dimensions.base || ""}
                                        onChange={(e) => handleInputChange("base", e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Yükseklik</Label>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="Yükseklik girin"
                                        value={dimensions.triHeight || ""}
                                        onChange={(e) => handleInputChange("triHeight", e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                            </>
                        )}
                        {shapeType === "trapezoid" && (
                            <>
                                <div className="space-y-2">
                                    <Label>Üst Taban</Label>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="Üst taban"
                                        value={dimensions.topBase || ""}
                                        onChange={(e) => handleInputChange("topBase", e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Alt Taban</Label>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="Alt taban"
                                        value={dimensions.bottomBase || ""}
                                        onChange={(e) => handleInputChange("bottomBase", e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <Label>Yükseklik</Label>
                                    <Input
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="Yükseklik girin"
                                        value={dimensions.trapHeight || ""}
                                        onChange={(e) => handleInputChange("trapHeight", e.target.value)}
                                        className="h-12"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <Button onClick={calculate} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700">
                        Hesapla
                    </Button>

                    {result !== null && (
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-center">
                            <p className="text-sm text-emerald-600 dark:text-emerald-400">Alan</p>
                            <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                                {result.toFixed(4)} birim²
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
