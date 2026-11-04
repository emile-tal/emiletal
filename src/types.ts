export type Location = 'nyc' | 'lausanne' | 'hk' | 'miami'

export interface Experience {
    title: string
    company: string
    location: string
    locationShortened: Location
    startDate: string
    endDate: string
}

export interface Stat {
    value: string
    label: string
}

export interface Highlight {
    company: string
    title: string
    // Cards show either headline numbers or a short status label in the same slot
    stats?: Stat[]
    status?: string
    paragraphs: string[]
    tools: string[]
}
