export default function AnalyticsPanel() {
    return (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="text-sm font-medium">Мониторинг качества</div>
            <div className="mt-3 text-xs text-gray-500">precision@1: 92% • Частые ошибки: категория B vs C</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-md bg-gray-50 p-2">Ошибки: 24</div>
                <div className="rounded-md bg-gray-50 p-2">Тренды: +3%</div>
            </div>
        </div>
    );
}