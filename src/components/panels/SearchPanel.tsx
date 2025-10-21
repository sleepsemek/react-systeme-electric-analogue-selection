import type {ChangeEvent, Dispatch, FormEvent, SetStateAction} from "react";

type SearchPanelProps = {
    query: string
    setQuery: Dispatch<SetStateAction<string>>
    onSearch: (e: FormEvent) => void
    loading: boolean
}

export default function SearchPanel({ query, setQuery, onSearch, loading }: SearchPanelProps) {
    return (
        <form onSubmit={onSearch} className="space-y-4">
            <h2 className="text-2xl font-semibold">Поиск / Загрузка</h2>
            <div className="flex gap-3">
                <input
                    value={query}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                    placeholder="Введите название/артикул или загрузите список (XLSX)"
                    className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button type="submit" disabled={loading} className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 disabled:opacity-60">
                    {loading ? 'Идёт поиск...' : 'Показать аналог'}
                </button>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
                <label className="flex items-center gap-2">
                    <input type="file" accept=".xlsx,.csv" className="hidden" />
                    <span className="inline-block rounded-md border border-gray-200 bg-white px-3 py-2">Загрузить XLSX</span>
                </label>
                <span>• Пример: 1 234 567 — артикул</span>
            </div>
        </form>
    )
}