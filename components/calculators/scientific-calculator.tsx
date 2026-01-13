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
    const toDegrees = (rad: number) => (rad * 180) / Math.PI

    const calculate = useCallback(() => {
        try {
            let expr = expression
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
                .replace(/π/g, `(${Math.PI})`)
                .replace(/e(?![x])/g, `(${Math.E})`)

            // Handle scientific functions
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

        // For functions that need opening parenthesis
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

    const buttons = [
        // Row 1 - Scientific functions
        { label: isRadians ? "Rad" : "Deg", action: () => setIsRadians(!isRadians), className: "text-indigo-600 font-semibold" },
        { label: "Inv", action: () => setIsInverse(!isInverse), className: isInverse ? "bg-indigo-100 text-indigo-600" : "" },
        { label: "x!", value: "!" },
        { label: "(", value: "(" },
        { label: ")", value: ")" },
        { label: "%", value: "/100" },
        { label: "AC", value: "AC", className: "text-red-500 font-semibold" },

        // Row 2
        { label: "sin", value: "sin" },
        { label: "ln", value: "ln" },
        { label: "7", value: "7", className: "bg-white dark:bg-slate-700 font-semibold" },
        { label: "8", value: "8", className: "bg-white dark:bg-slate-700 font-semibold" },
        { label: "9", value: "9", className: "bg-white dark:bg-slate-700 font-semibold" },
        { label: "÷", value: "÷", className: "text-indigo-600 font-semibold text-lg" },
        { label: <Delete className="h-5 w-5" />, value: "DEL" },

        // Row 3
        { label: "cos", value: "cos" },
        { label: "log", value: "log" },
        { label: "4", value: "4", className: "bg-white dark:bg-slate-700 font-semibold" },
        { label: "5", value: "5", className: "bg-white dark:bg-slate-700 font-semibold" },
        { label: "6", value: "6", className: "bg-white dark:bg-slate-700 font-semibold" },
        { label: "×", value: "×", className: "text-indigo-600 font-semibold text-lg" },
        { label: "xʸ", value: "^" },

        // Row 4
        { label: "tan", value: "tan" },
        { label: "√", value: "√" },
        { label: "1", value: "1", className: "bg-white dark:bg-slate-700 font-semibold" },
        { label: "2", value: "2", className: "bg-white dark:bg-slate-700 font-semibold" },
        { label: "3", value: "3", className: "bg-white dark:bg-slate-700 font-semibold" },
        { label: "−", value: "-", className: "text-indigo-600 font-semibold text-lg" },
        { label: "π", value: "π" },

        // Row 5
        { label: "Ans", value: "Ans" },
        { label: "e", value: "e" },
        { label: "0", value: "0", className: "bg-white dark:bg-slate-700 font-semibold" },
        { label: ".", value: "." },
        { label: "=", value: "=", className: "bg-indigo-600 text-white hover:bg-indigo-700 font-bold" },
        { label: "+", value: "+", className: "text-indigo-600 font-semibold text-lg" },
        { label: "EXP", value: "e" },
    ]

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Display */}
                <div className="relative p-4 bg-slate-50 dark:bg-slate-800 min-h-[80px]">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className="absolute left-4 top-4 p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                    >
                        <History className="h-5 w-5 text-slate-500" />
                    </button>
                    <div className="text-right">
                        <div className="text-slate-500 text-sm h-6 overflow-hidden">
                            {expression && expression !== display ? expression : ""}
                        </div>
                        <div className="text-4xl font-light text-slate-900 dark:text-white tracking-wide overflow-x-auto">
                            {display}
                        </div>
                    </div>
                </div>

                {/* History Panel */}
                {showHistory && (
                    <div className="bg-slate-100 dark:bg-slate-800/50 p-4 border-t border-slate-200 dark:border-slate-700 max-h-32 overflow-y-auto">
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
                <div className="grid grid-cols-7 gap-1 p-2 bg-slate-100 dark:bg-slate-800/30">
                    {buttons.map((btn, i) => (
                        <button
                            key={i}
                            onClick={() => btn.action ? btn.action() : handleInput(btn.value || "")}
                            className={`
                h-12 sm:h-14 rounded-xl text-sm sm:text-base
                flex items-center justify-center
                bg-slate-200/80 dark:bg-slate-700/50
                hover:bg-slate-300 dark:hover:bg-slate-600
                active:scale-95 transition-all
                text-slate-700 dark:text-slate-200
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
