import { useState } from 'react';
import type {MatchResult, Product} from "../../App.tsx";

type EditModalProps = {
    item: MatchResult
    onClose: () => void
    onSave: (item: MatchResult) => void
}

export const EditModal = ({
    item,
    onClose,
    onSave
}: EditModalProps) => {

    const [selectedAlternative, setSelectedAlternative] = useState<Product | null>(null)
    const [notes, setNotes] = useState('')

    const handleSave = () => {
        const updatedItem = {
            ...item,
            bestMatch: selectedAlternative || item.bestMatch
        }
        onSave(updatedItem)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Редактирование подбора</h2>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="font-medium mb-2">Запрос:</h3>
                        <div className="bg-gray-50 p-4 rounded">
                            <p className="font-medium">{item.originalProduct.name}</p>
                            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                                {Object.entries(item.originalProduct.parameters).map(([key, value]) => (
                                    <div key={key}>
                                        <span className="font-medium">{key}:</span> {value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">Текущий лучший аналог:</h3>
                        <div className="bg-blue-50 p-4 rounded">
                            <p className="font-medium">{item.bestMatch.name}</p>
                            <p className="text-sm text-gray-600">{item.bestMatch.manufacturer}</p>
                            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                                {Object.entries(item.bestMatch.parameters).map(([key, value]) => (
                                    <div key={key}>
                                        <span className="font-medium">{key}:</span> {value}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2">
                <span className="inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                  Совпадение: {(item.confidence * 100).toFixed(1)}%
                </span>
                            </div>
                        </div>
                    </div>

                    {item.alternatives.length > 0 && (
                        <div>
                            <h3 className="font-medium mb-2">Альтернативные варианты:</h3>
                            <div className="space-y-3">
                                {item.alternatives.map((alternative, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 border rounded cursor-pointer ${
                                            selectedAlternative?.id === alternative.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:bg-gray-50'
                                        }`}
                                        onClick={() => setSelectedAlternative(alternative)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">{alternative.name}</p>
                                                <p className="text-sm text-gray-600">{alternative.manufacturer}</p>
                                            </div>
                                            <button
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedAlternative(alternative);
                                                }}
                                            >
                                                Выбрать
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <h3 className="font-medium mb-2">Комментарии эксперта:</h3>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full h-24 p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Добавьте заметки по выбору аналога..."
                        />
                    </div>
                </div>

                <div className="p-6 border-t flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Сохранить изменения
                    </button>
                </div>
            </div>
        </div>
    );
};