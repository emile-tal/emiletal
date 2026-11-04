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
    stats: Stat[]
    paragraphs: string[]
    tools: string[]
}
