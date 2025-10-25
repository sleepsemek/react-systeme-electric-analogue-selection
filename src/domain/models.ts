export type Product = {
    id: string
    name: string
    manufacturer: string
    parameters: Record<string, string | number>
}

export type MatchedAlternative = {
    product: Product
    confidence?: number
    differences?: string[]
}

export type MatchResult = {
    tableRow: string
    originalProduct: Product
    matchedAlternatives: MatchedAlternative[]
    status: 'success' | 'warning' | 'error'
}