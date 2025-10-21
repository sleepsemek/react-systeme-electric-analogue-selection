export default function Header() {
    return (
        <header className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-md bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-semibold">SE</div>
                <div>
                    <div className="text-lg font-bold">Systeme Electric</div>
                    <div className="text-sm text-gray-500">Прототип подбора аналогов — демо</div>
                </div>
            </div>
            <div className="text-sm text-gray-500">Ver. demo • база: тестовая выборка</div>
        </header>
    );
}