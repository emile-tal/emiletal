export type Location = 'nyc' | 'lausanne' | 'hk' | 'miami'

export type Industry = 'Education' | 'Finance' | 'Hospitality'

export interface Experience {
    title: string
    company: string
    location: string
    locationShortened: Location
    industry: Industry
    startDate: string
    endDate: string
}

export interface Project {
    name: string
    oneLiner: string
    description: string
    src: string
    link: string
    github?: string
    githubFront?: string
    githubBack?: string
    blog?: string
}
