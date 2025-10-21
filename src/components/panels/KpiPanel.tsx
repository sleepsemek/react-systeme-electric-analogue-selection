export default function KpiPanel() {
    return (
        <div className="mt-6 rounded-lg bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500">KPI (тестовая выборка)</div>
            <div className="mt-3 flex gap-3">
                <Stat label="Precision" value="92%" />
                <Stat label="Avg time" value="0.6s" />
                <Stat label="База" value="12k" />
            </div>
        </div>
    );
}

type StatProps = {
    label: string
    value: string
}

function Stat({ label, value }: StatProps) {
    return (
        <div className="flex-1 rounded-md border border-gray-100 bg-gray-50 p-3 text-center">
            <div className="text-xs text-gray-500">{label}</div>
            <div className="mt-1 text-lg font-semibold">{value}</div>
        </div>
    );
}