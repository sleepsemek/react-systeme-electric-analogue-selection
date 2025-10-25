import { ResultList } from '../results/ResultList.tsx'
import Section from "../Section.tsx"
import Button from "../Button.tsx"
import type {MatchResult, Product} from "../../domain/models.ts"

type ResultPanelProps = {
    results: MatchResult[]
    onEdit: (item: MatchResult) => void
    onUpdateBestMatch: (requestId: string, product: Product) => void
    onDownloadClick: () => void
}

export const ResultPanel = ({
    results,
    onEdit,
    onUpdateBestMatch,
    onDownloadClick
}: ResultPanelProps) => {
    return (
        <Section>
            <div className="flex justify-between items-center flex-wrap gap-2 mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Результаты подбора</h2>
                    <p className="text-on-dark text-sm mt-2">Обработано {results.length} позиций номенклатуры</p>
                </div>
                <Button onClick={onDownloadClick}>Скачать таблицу</Button>
            </div>

            <ResultList
                results={results}
                onEdit={onEdit}
                onUpdateBestMatch={onUpdateBestMatch}
            />
        </Section>
    )
}