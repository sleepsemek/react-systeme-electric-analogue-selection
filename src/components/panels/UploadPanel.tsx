import React, { useRef, useState } from 'react';

interface UploadPanelProps {
    onFileUpload: (file: File) => void;
}

export const UploadPanel: React.FC<UploadPanelProps> = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (file: File | null) => {
        if (!file) return;
        const validationErrors = validateFile(file);
        if (validationErrors.length === 0) {
            setSelectedFile(file);
            setErrors([]);
        } else {
            setErrors(validationErrors);
        }
    };

    const validateFile = (file: File): string[] => {
        const errors: string[] = [];
        const validTypes = ['.xlsx', '.xls', '.csv'];
        const extension = file.name.split('.').pop()?.toLowerCase();

        if (!validTypes.includes(`.${extension}`)) {
            errors.push('Поддерживаются только файлы Excel и CSV');
        }

        if (file.size > 10 * 1024 * 1024) {
            errors.push('Размер файла не должен превышать 10MB');
        }

        return errors;
    };

    const handleUpload = () => {
        if (selectedFile) {
            onFileUpload(selectedFile);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        handleFileSelect(file);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Загрузка таблицы</h2>

            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={e => handleFileSelect(e.target.files?.[0] || null)}
                    accept=".xlsx,.xls,.csv"
                    className="hidden"
                />

                <div className="space-y-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>

                    <div>
                        <div className={`bg-blue-600 text-white px-4 py-2 rounded-md inline`}>
                            Выбрать файл
                        </div>
                    </div>

                    <p className="text-sm text-gray-600">
                        Поддерживаемые форматы: Excel (.xlsx, .xls), CSV. Можно перетащить файл сюда.
                    </p>
                </div>
            </div>

            {selectedFile && (
                <div className="mt-4 p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-green-800">{selectedFile.name}</p>
                            <p className="text-sm text-green-600">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                        <button
                            onClick={handleUpload}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Подобрать аналоги
                        </button>
                    </div>
                </div>
            )}

            {errors.length > 0 && (
                <div className="mt-4 p-4 bg-red-50 rounded-md">
                    <h3 className="text-red-800 font-medium mb-2">Ошибки валидации:</h3>
                    <ul className="list-disc list-inside text-red-600">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

