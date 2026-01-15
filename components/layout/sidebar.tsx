"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { categories } from "@/config/site-data"
import { cn } from "@/lib/utils"

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="hidden lg:block sticky top-16 z-30 h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
            <ScrollArea className="h-full py-6">
                <div className="px-4">
                    <h2 className="mb-4 px-2 text-lg font-semibold text-slate-900 dark:text-white">
                        Kategoriler
                    </h2>
                    <Accordion type="multiple" className="w-full" defaultValue={categories.map(c => c.id)}>
                        {categories.map((category) => {
                            const isActiveCategory = pathname.startsWith(`/${category.slug}`)

                            return (
                                <AccordionItem key={category.id} value={category.id} className="border-b-0">
                                    <AccordionTrigger
                                        className={cn(
                                            "rounded-lg px-3 py-2 text-sm font-medium hover:no-underline hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
                                            isActiveCategory
                                                ? "text-indigo-600 dark:text-indigo-400"
                                                : "text-slate-700 dark:text-slate-300"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            <category.icon className={cn(
                                                "h-4 w-4",
                                                isActiveCategory ? "text-indigo-500" : "text-slate-500"
                                            )} />
                                            {category.name}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-2 pt-0">
                                        <ul className="space-y-1 pl-4">
                                            {category.tools.map((tool) => {
                                                const toolPath = `/${category.slug}/${tool.slug}`
                                                const isActive = pathname === toolPath

                                                return (
                                                    <li key={tool.slug}>
                                                        <Link
                                                            href={toolPath}
                                                            className={cn(
                                                                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                                                                isActive
                                                                    ? "bg-indigo-100 text-indigo-700 font-medium dark:bg-indigo-900/50 dark:text-indigo-300"
                                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                                                            )}
                                                        >
                                                            <tool.icon className={cn(
                                                                "h-3.5 w-3.5",
                                                                isActive ? "text-indigo-500" : "text-slate-400"
                                                            )} />
                                                            <span className="truncate">{tool.name}</span>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </div>
            </ScrollArea>
        </aside>
    )
}
