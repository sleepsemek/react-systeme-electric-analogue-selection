import type {Item, Param} from "../../Models.ts";
import {useState} from "react";

type EditorModalProps = {
    item: Item;
    onClose: () => void;
}
export default function EditorModal({ item, onClose }: EditorModalProps) {
    const [editedParams, setEditedParams] = useState<Param[]>(item.params);

    const updateParam = (index: number, field: keyof Param, value: string | boolean) => {
        const updated = [...editedParams];
        (updated[index] as any)[field] = value;
        setEditedParams(updated);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Редактирование параметров</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {editedParams.map((param, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-2 items-center">
                            <input
                                type="text"
                                value={param.name}
                                onChange={(e) => updateParam(idx, 'name', e.target.value)}
                                className="col-span-1 border rounded px-2 py-1 text-sm"
                            />
                            <input
                                type="text"
                                value={param.req}
                                onChange={(e) => updateParam(idx, 'req', e.target.value)}
                                className="col-span-1 border rounded px-2 py-1 text-sm"
                            />
                            <input
                                type="text"
                                value={param.analog}
                                onChange={(e) => updateParam(idx, 'analog', e.target.value)}
                                className="col-span-1 border rounded px-2 py-1 text-sm"
                            />
                            <label className="col-span-1 flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={!!param.important}
                                    onChange={(e) => updateParam(idx, 'important', e.target.checked)}
                                />
                                Важно
                            </label>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="rounded bg-gray-200 px-4 py-2">Закрыть</button>
                    <button
                        onClick={() => {
                            console.log('Сохранено:', editedParams);
                            onClose();
                        }}
                        className="rounded bg-blue-600 text-white px-4 py-2"
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
}
