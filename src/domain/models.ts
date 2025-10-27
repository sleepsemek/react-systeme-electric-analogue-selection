export type Product = {
    id: string
    name: string
    manufacturer: string
    productLine: string
    parameters: Record<string, string | number>
    price: string
}

export type MatchedAlternative = {
    product: Product
    confidence?: number
    differences?: string[]
}

export type RawProduct = {
    id: string
    name: string
    manufacturer: string
    productLine?: string
    [key: string]: string | number | undefined
}

export type RawMatchResult = {
    index: string
    originalProduct: RawProduct
    matchedAlternatives: {
        product: RawProduct
        confidence?: number
        differences?: string[]
    }[]
}

export type MatchResult = {
    index: string
    originalProduct: Product
    matchedAlternatives: MatchedAlternative[]
}

function isDefinedValue(entry: [string, unknown]): entry is [string, string | number] {
    const [, value] = entry
    return value !== undefined && (typeof value === 'string' || typeof value === 'number')
}

export function normalizeProduct(raw: RawProduct): Product {
    const { id, name, manufacturer, productLine = '', ...rest } = raw

    const parameters = Object.fromEntries(
        Object.entries(rest).filter(isDefinedValue)
    )

    return {
        id,
        name,
        manufacturer,
        productLine,
        parameters
    }
}

export function normalizeResults(rawResults: RawMatchResult[]): MatchResult[] {
    return rawResults.map(result => ({
        index: result.index,
        originalProduct: normalizeProduct(result.originalProduct),
        matchedAlternatives: result.matchedAlternatives.map(a => ({
            product: normalizeProduct(a.product),
            confidence: a.confidence,
            differences: a.differences
        }))
    }))
}
