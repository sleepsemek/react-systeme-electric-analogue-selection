import type {Item} from "../../Models.ts";

type ExplainPanelProps = {
    item: Item | null
    onTrain: () => void
}

export default function ExplainPanel({ item, onTrain }: ExplainPanelProps) {
    return (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Объяснение (LLM + RAG)</div>
                <button onClick={onTrain} className="text-sm text-blue-600 underline">Train</button>
            </div>
            <div className="mt-3 text-sm text-gray-600">
                {item ? (
                    <>
                        <div className="mb-2">{item.explanation}</div>
                        <div className="text-xs text-gray-400">Provenance:</div>
                        <ul className="mt-2 space-y-1 text-xs text-gray-500">
                            <li>Каталог Systeme Electric — строка 234</li>
                            <li>Технический лист поставщика — секция 3.2</li>
                        </ul>
                    </>
                ) : (
                    <div>Результат пока не выбран — здесь появится краткое LLM-обоснование и выдержки из источников.</div>
                )}
            </div>
        </div>
    );
}