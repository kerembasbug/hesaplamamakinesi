"use client"

import { useState, useCallback } from "react"
import { History, Delete } from "lucide-react"

export function ScientificCalculator() {
    const [display, setDisplay] = useState("0")
    const [expression, setExpression] = useState("")
    const [history, setHistory] = useState<string[]>([])
    const [showHistory, setShowHistory] = useState(false)
    const [isRadians, setIsRadians] = useState(true)
    const [isInverse, setIsInverse] = useState(false)
    const [lastAnswer, setLastAnswer] = useState<number>(0)

    const toRadians = (deg: number) => (deg * Math.PI) / 180

    const calculate = useCallback(() => {
        try {
            let expr = expression
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
                .replace(/π/g, `(${Math.PI})`)
                .replace(/e(?![x])/g, `(${Math.E})`)

            expr = expr.replace(/sin\(([^)]+)\)/g, (_, val) => {
                const num = eval(val)
                return isRadians ? `Math.sin(${num})` : `Math.sin(${toRadians(num)})`
            })
            expr = expr.replace(/cos\(([^)]+)\)/g, (_, val) => {
                const num = eval(val)
                return isRadians ? `Math.cos(${num})` : `Math.cos(${toRadians(num)})`
            })
            expr = expr.replace(/tan\(([^)]+)\)/g, (_, val) => {
                const num = eval(val)
                return isRadians ? `Math.tan(${num})` : `Math.tan(${toRadians(num)})`
            })
            expr = expr.replace(/ln\(([^)]+)\)/g, "Math.log($1)")
            expr = expr.replace(/log\(([^)]+)\)/g, "Math.log10($1)")
            expr = expr.replace(/√\(([^)]+)\)/g, "Math.sqrt($1)")
            expr = expr.replace(/(\d+)!/g, (_, n) => {
                let result = 1
                for (let i = 2; i <= parseInt(n); i++) result *= i
                return result.toString()
            })
            expr = expr.replace(/(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/g, "Math.pow($1,$2)")

            const result = eval(expr)
            const formattedResult = Number.isInteger(result)
                ? result.toString()
                : parseFloat(result.toPrecision(10)).toString()

            setHistory(prev => [...prev.slice(-9), `${expression} = ${formattedResult}`])
            setDisplay(formattedResult)
            setLastAnswer(result)
            setExpression(formattedResult)
        } catch {
            setDisplay("Hata")
            setTimeout(() => {
                setDisplay("0")
                setExpression("")
            }, 1500)
        }
    }, [expression, isRadians])

    const handleInput = (value: string) => {
        if (display === "Hata") return

        if (value === "AC") {
            setDisplay("0")
            setExpression("")
            return
        }

        if (value === "DEL") {
            if (expression.length <= 1) {
                setDisplay("0")
                setExpression("")
            } else {
                const newExpr = expression.slice(0, -1)
                setExpression(newExpr)
                setDisplay(newExpr || "0")
            }
            return
        }

        if (value === "=") {
            calculate()
            return
        }

        if (value === "Ans") {
            const newExpr = expression === "0" ? lastAnswer.toString() : expression + lastAnswer
            setExpression(newExpr)
            setDisplay(newExpr)
            return
        }

        const functions = ["sin", "cos", "tan", "ln", "log", "√"]
        if (functions.includes(value)) {
            const funcExpr = `${value}(`
            const newExpr = expression === "0" || expression === "" ? funcExpr : expression + funcExpr
            setExpression(newExpr)
            setDisplay(newExpr)
            return
        }

        const newExpr = expression === "0" && ![".", "+", "-", "×", "÷"].includes(value)
            ? value
            : expression + value
        setExpression(newExpr)
        setDisplay(newExpr)
    }

    // Colorful button configurations
    const buttons = [
        // Row 1 - Scientific functions (Purple theme)
        { label: isRadians ? "Rad" : "Deg", action: () => setIsRadians(!isRadians), className: "bg-gradient-to-br from-purple-400 to-purple-600 text-white" },
        { label: "Inv", action: () => setIsInverse(!isInverse), className: isInverse ? "bg-gradient-to-br from-purple-500 to-purple-700 text-white" : "bg-gradient-to-br from-purple-300 to-purple-500 text-white" },
        { label: "x!", value: "!", className: "bg-gradient-to-br from-pink-400 to-pink-600 text-white" },
        { label: "(", value: "(", className: "bg-gradient-to-br from-slate-300 to-slate-400 text-slate-700" },
        { label: ")", value: ")", className: "bg-gradient-to-br from-slate-300 to-slate-400 text-slate-700" },
        { label: "%", value: "/100", className: "bg-gradient-to-br from-cyan-400 to-cyan-600 text-white" },
        { label: "AC", value: "AC", className: "bg-gradient-to-br from-red-400 to-red-600 text-white" },

        // Row 2 (Teal + Blue theme for functions)
        { label: "sin", value: "sin", className: "bg-gradient-to-br from-teal-400 to-teal-600 text-white" },
        { label: "ln", value: "ln", className: "bg-gradient-to-br from-teal-400 to-teal-600 text-white" },
        { label: "7", value: "7", className: "bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-800 font-bold text-xl" },
        { label: "8", value: "8", className: "bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-800 font-bold text-xl" },
        { label: "9", value: "9", className: "bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-800 font-bold text-xl" },
        { label: "÷", value: "÷", className: "bg-gradient-to-br from-orange-400 to-orange-600 text-white text-2xl" },
        { label: <Delete className="h-6 w-6" />, value: "DEL", className: "bg-gradient-to-br from-rose-400 to-rose-600 text-white" },

        // Row 3
        { label: "cos", value: "cos", className: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white" },
        { label: "log", value: "log", className: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white" },
        { label: "4", value: "4", className: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 font-bold text-xl" },
        { label: "5", value: "5", className: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 font-bold text-xl" },
        { label: "6", value: "6", className: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 font-bold text-xl" },
        { label: "×", value: "×", className: "bg-gradient-to-br from-amber-400 to-amber-600 text-white text-2xl" },
        { label: "xʸ", value: "^", className: "bg-gradient-to-br from-violet-400 to-violet-600 text-white" },

        // Row 4
        { label: "tan", value: "tan", className: "bg-gradient-to-br from-sky-400 to-sky-600 text-white" },
        { label: "√", value: "√", className: "bg-gradient-to-br from-sky-400 to-sky-600 text-white" },
        { label: "1", value: "1", className: "bg-gradient-to-br from-violet-100 to-violet-200 text-violet-800 font-bold text-xl" },
        { label: "2", value: "2", className: "bg-gradient-to-br from-violet-100 to-violet-200 text-violet-800 font-bold text-xl" },
        { label: "3", value: "3", className: "bg-gradient-to-br from-violet-100 to-violet-200 text-violet-800 font-bold text-xl" },
        { label: "−", value: "-", className: "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white text-2xl" },
        { label: "π", value: "π", className: "bg-gradient-to-br from-fuchsia-400 to-fuchsia-600 text-white" },

        // Row 5
        { label: "Ans", value: "Ans", className: "bg-gradient-to-br from-lime-400 to-lime-600 text-white" },
        { label: "e", value: "e", className: "bg-gradient-to-br from-lime-400 to-lime-600 text-white" },
        { label: "0", value: "0", className: "bg-gradient-to-br from-pink-100 to-pink-200 text-pink-800 font-bold text-xl" },
        { label: ".", value: ".", className: "bg-gradient-to-br from-pink-100 to-pink-200 text-pink-800 font-bold text-xl" },
        { label: "=", value: "=", className: "bg-gradient-to-br from-green-400 to-green-600 text-white text-2xl font-bold shadow-lg shadow-green-500/30" },
        { label: "+", value: "+", className: "bg-gradient-to-br from-green-400 to-green-600 text-white text-2xl" },
        { label: "EXP", value: "e", className: "bg-gradient-to-br from-cyan-400 to-cyan-600 text-white" },
    ]

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Display */}
                <div className="relative p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-[120px]">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="absolute left-4 top-4 p-3 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <History className="h-6 w-6 text-white" />
                    </button>
                    <div className="text-right">
                        <div className="text-white/70 text-lg h-7 overflow-hidden">
                            {expression && expression !== display ? expression : ""}
                        </div>
                        <div className="text-5xl font-light text-white tracking-wide overflow-x-auto drop-shadow-lg">
                            {display}
                        </div>
                    </div>
                </div>

                {/* History Panel */}
                {showHistory && (
                    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur p-4 border-t border-slate-200 dark:border-slate-700 max-h-40 overflow-y-auto">
                        {history.length === 0 ? (
                            <p className="text-slate-500 text-sm">Geçmiş işlem yok</p>
                        ) : (
                            <ul className="space-y-1">
                                {history.map((item, i) => (
                                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400">{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {/* Buttons Grid - 7 columns */}
                <div className="grid grid-cols-7 gap-2 p-4">
                    {buttons.map((btn, i) => (
                        <button
                            key={i}
                            onClick={() => btn.action ? btn.action() : handleInput(btn.value || "")}
                            className={`
                h-14 sm:h-16 md:h-18 rounded-2xl text-base sm:text-lg
                flex items-center justify-center
                hover:scale-105 hover:shadow-lg
                active:scale-95 transition-all duration-150
                shadow-md
                ${btn.className || ""}
              `}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
