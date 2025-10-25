import { useState } from 'react'
import type { MatchResult, MatchedAlternative } from '../../domain/models.ts'
import {ConfidenceBadge} from "../ConfidenceBadge.tsx";
import Button from "../Button.tsx";

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
    const [selectedAlternative, setSelectedAlternative] = useState<MatchedAlternative | null>(null)
    const [notes, setNotes] = useState('')

    const handleSave = () => {
        if (!selectedAlternative) {
            onClose()
            return
        }

        const updatedItem: MatchResult = {
            ...item,
            matchedAlternatives: [
                selectedAlternative,
                ...item.matchedAlternatives.filter(a => a.product.id !== selectedAlternative.product.id)
            ]
        }

        onSave(updatedItem)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-dark rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Редактирование подбора</h2>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="font-medium mb-2">Исходная позиция:</h3>
                        <div className="bg-dark-container p-4 rounded-xl">
                            <p className="font-medium">{item.originalProduct.name}</p>
                            <p className="text-sm text-gray-600">{item.originalProduct.manufacturer}</p>
                            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                                {Object.entries(item.originalProduct.parameters).map(([key, value]) => (
                                    <div key={key}>
                                        <span className="font-medium">{key}:</span> {value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {item.matchedAlternatives.length > 0 && (
                        <div>
                            <h3 className="font-medium mb-2">Подобранные варианты:</h3>
                            <div className="space-y-3">
                                {item.matchedAlternatives.map((alt, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-xl cursor-pointer transition ${
                                            selectedAlternative?.product.id === alt.product.id
                                                ? 'outline-2 outline-dashed outline-primary bg-secondary-container'
                                                : 'bg-dark-container hover:bg-secondary-container'
                                        }`}
                                        onClick={() => setSelectedAlternative(alt)}
                                    >
                                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                                            <div>
                                                <p className="font-medium">{alt.product.name}</p>
                                                <p className="text-sm text-gray-600">{alt.product.manufacturer}</p>
                                            </div>

                                            {alt.confidence !== undefined && (
                                                <ConfidenceBadge confidence={alt.confidence} />
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            {Object.entries(alt.product.parameters).map(([key, value]) => (
                                                <div key={key}>
                                                    <span className="font-medium">{key}:</span> {value}
                                                </div>
                                            ))}
                                        </div>

                                        {alt.differences && alt.differences.length > 0 && (
                                            <div className="mt-3">
                                                <h4 className="text-sm font-semibold text-gray-700 mb-1">Различия:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {alt.differences.map((diff, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-lg border border-red-200"
                                                        >
                                                            {diff}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-3 flex justify-end">
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setSelectedAlternative(alt)
                                                }}
                                            >
                                                Выбрать
                                            </Button>
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
                        disabled={!selectedAlternative}
                    >
                        Сохранить изменения
                    </button>
                </div>
            </div>
        </div>
    )
}