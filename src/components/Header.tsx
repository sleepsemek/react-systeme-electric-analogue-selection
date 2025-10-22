export default function Header() {
    return (
        <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center text-white font-semibold">SE</div>
                <div>
                    <h1 className="text-lg font-bold">Systeme Electric</h1>
                    <div className="text-sm text-on-dark">Демонстрационный прототип подбора аналогов</div>
                </div>
            </div>
            <div className="text-sm text-on-dark">Демо версия • БД: тестовая выборка</div>
        </header>
    );
}