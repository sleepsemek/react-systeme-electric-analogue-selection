import { ResultList } from '../catalog/ResultList.tsx';
import type {MatchResult, Product} from "../../App.tsx";

type ResultPanelProps = {
    results: MatchResult[]
    onEdit: (item: MatchResult) => void
    onUpdateBestMatch: (requestId: string, product: Product) => void
}

export const ResultPanel = ({
    results,
    onEdit,
    onUpdateBestMatch
}: ResultPanelProps) => {
    return (
        <div className="bg-dark-container text-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 flex justify-between items-center flex-wrap gap-2">
                <div>
                    <h2 className="text-2xl font-bold">Результаты подбора</h2>
                    <p className="text-on-dark text-sm mt-2">Обработано {results.length} позиций номенклатуры</p>
                </div>
                <button className="btn-primary w-full sm:w-auto" type="button">Скачать таблицу</button>
            </div>

            <ResultList
                results={results}
                onEdit={onEdit}
                onUpdateBestMatch={onUpdateBestMatch}
            />
        </div>
    );
};