type ConfidenceBadgeProps = {
    confidence?: number
}

export function ConfidenceBadge({confidence}: ConfidenceBadgeProps) {
    const getConfidenceColor = (confidence?: number) => {
        if (confidence == null) return 'bg-gray-700 text-gray-300 border border-gray-600'
        if (confidence >= 0.9) return 'bg-primary/20 text-primary border border-primary/30'
        if (confidence >= 0.7) return 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30'
        return 'bg-error/20 text-error border border-error/30'
    }

    const getConfidenceText = (confidence?: number) => {
        if (confidence == null) return '—'
        if (confidence >= 0.9) return 'Высокая'
        if (confidence >= 0.7) return 'Средняя'
        return 'Низкая'
    }

    if (confidence === undefined) return null

    return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getConfidenceColor(confidence)}`}>
            {getConfidenceText(confidence)} • {(confidence * 100).toFixed(1)}%
        </span>
    )
}