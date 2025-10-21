import type {Item} from "../../Models.ts";

type ResultCardProps = {
    item: Item
    onOpenEditor: () => void
}

export default function ResultCard({ item, onOpenEditor }: ResultCardProps) {
    return (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex gap-6">
                <div className="w-28 flex-shrink-0">{item.imageSvg}</div>
                <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                        <div>
                            <div className="text-sm text-gray-500">Рекомендуемый аналог</div>
                            <div className="mt-1 text-xl font-semibold">{item.brand} — {item.model}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold">{item.score}%</div>
                            <div className="text-sm text-gray-500">ключевых параметров</div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="h-3 w-full rounded-full bg-gray-100">
                            <div className="h-3 rounded-full bg-blue-500" style={{ width: `${item.score}%` }} />
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-sm">
                        <div>
                            <div className="text-xs text-gray-400">Запрошено</div>
                            {item.params.map((p) => (
                                <div key={p.name} className="mt-2">
                                    <div className="text-sm">{p.name}</div>
                                    <div className="text-sm font-medium text-gray-700">{p.req}</div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="text-xs text-gray-400">Аналог</div>
                            {item.params.map((p) => (
                                <div key={p.name} className="mt-2">
                                    <div className="text-sm">{p.name}</div>
                                    <div className="text-sm font-medium text-gray-700">{p.analog}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 border-t border-gray-100 pt-3">
                        <div className="text-sm text-gray-500">Что важно</div>
                        <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                            <div className="h-2 rounded-full bg-blue-500" style={{ width: '60%' }} />
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button onClick={onOpenEditor} className="rounded-md border border-gray-200 px-3 py-2 text-sm">Открыть редактор</button>
                            <button className="rounded-md bg-green-600 px-3 py-2 text-sm text-white">Подтвердить как аналог</button>
                            <button className="rounded-md border border-gray-200 px-3 py-2 text-sm">Добавить в КП</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}