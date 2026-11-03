import type { Industry, Location } from '../../types'

import { BuildingSilhouettes } from '../BuildingSilhouettes/BuildingSilhouettes'
import { ExperienceCard } from '../ExperienceCard/ExperienceCard'
import { Map } from '../Map/Map'
import { MapPin } from '../MapPin/MapPin'
import experiences from '../../assets/data/experience'
import { useState } from 'react'

type ExperienceView = 'location' | 'industry'
type ExperienceFilter = Location | Industry

const experienceLocations: Location[] = ['nyc', 'lausanne', 'hk']

const viewLinkClasses = (isActive: boolean) =>
    `font-poppins text-navy text-[0.8rem] py-1 px-2 rounded-[10px] border tablet:border-2 tablet:text-[1rem] desktop:text-[1.2rem] hover:cursor-pointer ${isActive
        ? 'bg-tan border-tan font-normal'
        : 'border-cream hover:border-tan'
    }`

export function ExperiencesSection() {
    const [experienceView, setExperienceView] = useState<ExperienceView>('location')
    const [experienceCardOpen, setExperienceCardOpen] = useState(false)
    const [experienceCard, setExperienceCard] = useState<ExperienceFilter | ''>('')

    const toggleExperienceView = (view: ExperienceView) => {
        setExperienceView(view)
        setExperienceCardOpen(false)
    }

    const toggleExperienceCard = (filter: ExperienceFilter) => {
        if (experienceCard === filter) {
            setExperienceCardOpen(false)
            setExperienceCard('')
        } else {
            setExperienceCardOpen(true)
            setExperienceCard(filter)
        }
    }

    const filteredExperiences = experiences.filter(experience =>
        experienceView === 'location'
            ? experience.locationShortened === experienceCard
            : experience.industry === experienceCard
    )

    return (
        <section className='page-container py-4 desktop:pb-10'>
            <div className='flex justify-between items-start tablet:pb-4'>
                <h2 className='section-title'>Past Experiences</h2>
                <div className='flex flex-col tablet:flex-row tablet:gap-4'>
                    <span className={viewLinkClasses(experienceView === 'location')} onClick={() => toggleExperienceView('location')}>Location</span>
                    <span className={viewLinkClasses(experienceView === 'industry')} onClick={() => toggleExperienceView('industry')}>Industry</span>
                </div>
            </div>
            {experienceView === 'location' ?
                <div className='relative flex justify-center items-center max-w-[40rem] my-4 mx-auto'>
                    <Map />
                    {experienceLocations.map(location => (
                        <MapPin key={location} location={location} toggleExperienceCard={toggleExperienceCard} />
                    ))}
                </div>
                :
                <BuildingSilhouettes toggleExperienceCard={toggleExperienceCard} />
            }
            {experienceCardOpen && <ExperienceCard experiences={filteredExperiences} />}
        </section>
    )
}
