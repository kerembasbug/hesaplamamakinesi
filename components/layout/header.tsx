"use client"

import Link from "next/link"
import { useState } from "react"
import { Calculator, Search, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { categories } from "@/config/site-data"
import { cn } from "@/lib/utils"

export function Header() {
    const [searchOpen, setSearchOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                        <Calculator className="h-5 w-5" />
                    </div>
                    <span className="hidden font-bold text-slate-900 dark:text-white sm:inline-block text-lg">
                        HesaplamaMakinesi
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {categories.map((category) => (
                                <NavigationMenuItem key={category.id}>
                                    <NavigationMenuTrigger className="bg-transparent text-slate-700 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800">
                                        <category.icon className="mr-2 h-4 w-4" />
                                        {category.name}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[500px] gap-2 p-4 md:grid-cols-2">
                                            {category.tools.map((tool) => (
                                                <li key={tool.slug}>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href={tool.externalUrl || `/${category.slug}/${tool.slug}`}
                                                            target={tool.externalUrl ? "_blank" : undefined}
                                                            rel={tool.externalUrl ? "noopener noreferrer" : undefined}
                                                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 hover:text-indigo-600 focus:bg-slate-100 dark:hover:bg-slate-800"
                                                        >
                                                            <div className="flex items-center gap-2 text-sm font-medium leading-none">
                                                                <tool.icon className="h-4 w-4 text-indigo-500" />
                                                                {tool.name}
                                                                {tool.externalUrl && <span className="text-xs text-slate-400">↗</span>}
                                                            </div>
                                                            <p className="line-clamp-2 text-xs leading-snug text-slate-500 dark:text-slate-400">
                                                                {tool.description}
                                                            </p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Search & Mobile Menu */}
                <div className="flex items-center gap-2">
                    {/* Search Toggle - Desktop */}
                    <div className="hidden md:flex items-center">
                        {searchOpen ? (
                            <div className="flex items-center gap-2">
                                <Input
                                    type="search"
                                    placeholder="Araç ara..."
                                    className="w-64 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                                    autoFocus
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSearchOpen(false)}
                                    className="text-slate-500 hover:text-slate-700"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSearchOpen(true)}
                                className="text-slate-500 hover:text-indigo-600"
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="ghost" size="icon" className="text-slate-500">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Menüyü aç</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
                            <SheetTitle className="sr-only">Navigasyon Menüsü</SheetTitle>
                            <div className="flex flex-col h-full">
                                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            type="search"
                                            placeholder="Araç ara..."
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <nav className="flex-1 overflow-y-auto p-4">
                                    {categories.map((category) => (
                                        <div key={category.id} className="mb-4">
                                            <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                                                <category.icon className="h-4 w-4 text-indigo-500" />
                                                {category.name}
                                            </div>
                                            <ul className="space-y-1 pl-6">
                                                {category.tools.map((tool) => (
                                                    <li key={tool.slug}>
                                                        <Link
                                                            href={tool.externalUrl || `/${category.slug}/${tool.slug}`}
                                                            target={tool.externalUrl ? "_blank" : undefined}
                                                            rel={tool.externalUrl ? "noopener noreferrer" : undefined}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="block py-2 text-sm text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                                                        >
                                                            {tool.name}
                                                            {tool.externalUrl && <span className="ml-1 text-xs">↗</span>}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
