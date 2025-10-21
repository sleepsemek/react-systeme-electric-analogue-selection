import type {Alternative} from "../../Models.ts";

type AlternativesListProps = {
    items: Alternative[];
}

export default function AlternativesList({ items }: AlternativesListProps) {
    return (
        <div className="mt-4">
            <h2 className="text-2xl font-semibold">Альтернативы</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {items.map((it) => (
                    <div key={it.id} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">{it.title}</div>
                            <div className="text-sm text-gray-500">{it.score}%</div>
                        </div>
                        <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
                            <div className="h-2 rounded-full bg-blue-500" style={{ width: `${it.score}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}