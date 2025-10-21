import {type FormEvent, useState} from "react";
import type {Alternative, Item} from "./Models.ts";
import Header from "./components/Header.tsx";
import SearchPanel from "./components/panels/SearchPanel.tsx";
import KpiPanel from "./components/panels/KpiPanel.tsx";
import CatalogUpload from "./components/catalog/CatalogUpload.tsx";
import ResultCard from "./components/catalog/ResultCard.tsx";
import AlternativesList from "./components/catalog/AlternativesList.tsx";
import ExplainPanel from "./components/panels/ExplainPanel.tsx";
import AnalyticsPanel from "./components/panels/AnalyticsPanel.tsx";
import EditorModal from "./components/modals/EditorModal.tsx";

export default function App() {
    const [query, setQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<Item | null>(null);
    const [showEditor, setShowEditor] = useState<boolean>(false);

    const MOCK_RESULT: Item = {
        id: "dek-a630",
        brand: "DEKraft",
        model: "DEK-A630",
        score: 92,
        imageSvg: productSvg(),
        params: [
            { name: "Номинальный ток", req: "250 A", analog: "400 A", important: true },
            { name: "Класс защиты", req: "I", analog: "II", important: true },
            { name: "Конфигурация", req: "3+N", analog: "3+N", important: false },
        ],
        explanation:
            'Совпадают ключевые параметры: номинальный ток и конфигурация. Источники: внутренний каталог, технические листы.',
    };

    const MOCK_ALTERNATIVES: Alternative[] = [
        { id: "dek-a400", title: "DEKraft DEK-A400", score: 90 },
        { id: "dek-a690", title: "DEKraft DEK-A690", score: 90 },
        { id: "mer-yv630", title: "Mercury YV-630", score: 84 },
    ];

    function onSearch(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        setSelected(null);
        setTimeout(() => {
            setSelected(MOCK_RESULT);
            setLoading(false);
        }, 600);
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6 lg:p-12">
            <div className="mx-auto max-w-8xl">
                <Header />
                <main className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
                    <section className="lg:col-span-3">
                        <SearchPanel query={query} setQuery={setQuery} onSearch={onSearch} loading={loading} />
                        <KpiPanel />
                        <CatalogUpload />
                    </section>

                    <section className="lg:col-span-6">
                        <h2 className="text-2xl font-semibold">Результат подбора</h2>
                        {loading && <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"><div className="h-24 animate-pulse bg-gray-100" /></div>}
                        {!loading && selected && <ResultCard item={selected} onOpenEditor={() => setShowEditor(true)} />}
                        {!loading && !selected && <div className="mt-4 rounded-lg border border-dashed border-gray-200 bg-white p-6 text-gray-500">Введите номенклатуру или загрузите XLSX — и система предложит аналог.</div>}
                        <AlternativesList items={MOCK_ALTERNATIVES} />
                    </section>

                    <aside className="lg:col-span-3">
                        <h2 className="text-2xl font-semibold">Сводка</h2>
                        <ExplainPanel item={selected} onTrain={() => alert('Отправлено в pipeline обучения (mock)')} />
                        <AnalyticsPanel />
                    </aside>
                </main>
            </div>
            {showEditor && selected && <EditorModal item={selected} onClose={() => setShowEditor(false)} />}
        </div>
    );

    function productSvg() {
        return (
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-24">
                <rect width="64" height="64" rx="8" fill="#E5E7EB" />
                <rect x="16" y="16" width="32" height="32" rx="4" fill="#93C5FD" />
                <path d="M24 24h16v16H24z" fill="#3B82F6" />
            </svg>
        );
    }

}