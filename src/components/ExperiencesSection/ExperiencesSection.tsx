import type { Location } from '../../types'
import { useRef, useState, type KeyboardEvent } from 'react'

import { EXPERIENCE_CARD_ID, locationLabels } from '../../constants/experience'

import { ExperienceCard } from '../ExperienceCard/ExperienceCard'
import { Map } from '../Map/Map'
import { MapPin } from '../MapPin/MapPin'
import { Timeline } from '../Timeline/Timeline'
import experiences from '../../assets/data/experience'

type ExperienceView = 'timeline' | 'location'

const experienceLocations: Location[] = ['nyc', 'lausanne', 'hk', 'miami']
const experienceViews: { id: ExperienceView, label: string }[] = [
    { id: 'timeline', label: 'Timeline' },
    { id: 'location', label: 'Location' },
]

const tabId = (view: ExperienceView) => `experience-tab-${view}`
const PANEL_ID = 'experience-panel'

const viewTabClasses = (isActive: boolean) =>
    `font-poppins text-navy text-[0.8rem] py-1 px-2 rounded-[10px] border tablet:border-2 tablet:text-[1rem] desktop:text-[1.2rem] hover:cursor-pointer transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${isActive
        ? 'bg-tan border-tan font-normal'
        : 'border-cream hover:border-tan'
    }`

export function ExperiencesSection() {
    const [experienceView, setExperienceView] = useState<ExperienceView>('timeline')
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const tabRefs = useRef<Partial<Record<ExperienceView, HTMLButtonElement | null>>>({})

    const changeView = (view: ExperienceView) => {
        setExperienceView(view)
        setSelectedLocation(null)
    }

    const toggleExperienceCard = (location: Location) => {
        setSelectedLocation(current => (current === location ? null : location))
    }

    // WAI-ARIA tabs pattern: arrow keys move between tabs, Home/End jump to the ends
    const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const last = experienceViews.length - 1
        let nextIndex: number | null = null
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = index === last ? 0 : index + 1
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = index === 0 ? last : index - 1
        else if (event.key === 'Home') nextIndex = 0
        else if (event.key === 'End') nextIndex = last
        if (nextIndex === null) return

        event.preventDefault()
        const nextView = experienceViews[nextIndex].id
        changeView(nextView)
        tabRefs.current[nextView]?.focus()
    }

    const handleSectionKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Escape' && selectedLocation) {
            setSelectedLocation(null)
        }
    }

    const locationExperiences = experiences.filter(experience => experience.locationShortened === selectedLocation)

    return (
        <section
            id='experience'
            className='page-container scroll-mt-6 py-8 desktop:py-12'
            aria-labelledby='experiences-title'
            onKeyDown={handleSectionKeyDown}
        >
            <div className='flex justify-between items-start tablet:pb-4'>
                <h2 id='experiences-title' className='section-title'>Past Experiences</h2>
                <div
                    role='tablist'
                    aria-label='Browse experiences by'
                    className='flex flex-col tablet:flex-row tablet:gap-4'
                >
                    {experienceViews.map((view, index) => {
                        const isActive = experienceView === view.id
                        return (
                            <button
                                key={view.id}
                                ref={element => { tabRefs.current[view.id] = element }}
                                id={tabId(view.id)}
                                type='button'
                                role='tab'
                                aria-selected={isActive}
                                aria-controls={PANEL_ID}
                                tabIndex={isActive ? 0 : -1}
                                className={viewTabClasses(isActive)}
                                onClick={() => changeView(view.id)}
                                onKeyDown={event => handleTabKeyDown(event, index)}
                            >
                                {view.label}
                            </button>
                        )
                    })}
                </div>
            </div>
            <div
                key={experienceView}
                id={PANEL_ID}
                role='tabpanel'
                aria-labelledby={tabId(experienceView)}
                className='motion-safe:animate-fade-in'
            >
                {experienceView === 'timeline' ?
                    <Timeline experiences={experiences} />
                    :
                    <>
                        <p className='sr-only'>Select a city on the map to see the roles I held there.</p>
                        <div
                            role='group'
                            aria-label='Locations'
                            className='relative flex justify-center items-center max-w-[40rem] my-4 mx-auto'
                        >
                            <Map />
                            {experienceLocations.map(location => (
                                <MapPin
                                    key={location}
                                    location={location}
                                    label={locationLabels[location]}
                                    isSelected={selectedLocation === location}
                                    toggleExperienceCard={toggleExperienceCard}
                                />
                            ))}
                        </div>
                        <div id={EXPERIENCE_CARD_ID} aria-live='polite'>
                            {selectedLocation && (
                                <ExperienceCard
                                    key={selectedLocation}
                                    heading={`Experience in ${locationLabels[selectedLocation]}`}
                                    experiences={locationExperiences}
                                />
                            )}
                        </div>
                    </>
                }
            </div>
        </section>
    )
}
