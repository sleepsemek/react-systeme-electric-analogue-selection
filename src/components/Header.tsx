import logo from "../assets/logo.svg"
import Badge from "./Badge.tsx"
export default function Header() {
    return (
        <header className="flex items-center justify-between mb-8 gap-2">
            <div className="flex items-center gap-4">
                <img
                    src={logo}
                    alt="Systeme Electric"
                    className="w-32 md:w-40 lg:w-48 xl:w-52 max-w-[200px] h-auto"
                />
            </div>

            <div className="flex flex-col items-end text-on-dark gap-2">
                <h1 className="font-bold text-base md:text-2xl">
                    Подбор аналогов продукции
                </h1>
                <div className="items-center gap-2 hidden sm:flex">
                    <Badge>Systeme Electric</Badge>
                    <span>•</span>
                    <Badge>Тестовая БД</Badge>
                    <span>•</span>
                    <Badge>Демо-режим</Badge>

                </div>
            </div>
        </header>
    )
}