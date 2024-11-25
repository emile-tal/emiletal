import './ExperiencesSection.scss'

import { BuildingSilhouettes } from '../BuildingSilhouettes/BuildingSilhouettes'
import { ExperienceCard } from '../ExperienceCard/ExperienceCard'
import { Map } from '../Map/Map'
import { MapPin } from '../MapPin/MapPin'
import experiences from '../../assets/data/experience'
import { useState } from 'react'

export function ExperiencesSection() {
    const [experienceView, setExperienceView] = useState('location')
    const [experienceCardOpen, setExperienceCardOpen] = useState(false)
    const [experienceCard, setExperienceCard] = useState('')

    const experienceLocations = ["nyc", "lausanne", "hk"]

    const toggleExperienceView = (view) => {
        setExperienceView(view)
        setExperienceCardOpen(false)
    }

    const toggleExperienceCard = (filter) => {
        if (experienceCard === filter) {
            setExperienceCardOpen(false)
        } else {
            setExperienceCardOpen(true)
            setExperienceCard(filter)
        }
    }


    return (
        <section className='experiences'>
            <div className='experiences__header'>
                <h2 className='experiences__heading'>Past Experiences</h2>
                <div className='experiences__views'>
                    <span className={`experiences__view-link ${experienceView === 'location' ? 'experiences__view-link--active' : ''}`} onClick={() => toggleExperienceView('location')}>Location</span>
                    <span className={`experiences__view-link ${experienceView === 'industry' ? 'experiences__view-link--active' : ''}`} onClick={() => toggleExperienceView('industry')}>Industry</span>
                </div>
            </div>
            {experienceView === 'location' ?
                <div className='experiences__map-container'>
                    <Map />
                    {experienceLocations.map((location, index) => (
                        <MapPin key={index} location={location} experiences={experiences.filter(experience => experience.locationShortened === location)} toggleExperienceCard={toggleExperienceCard} />
                    ))}
                </div>
                :
                <div className='experiences__building-container'>
                    <BuildingSilhouettes toggleExperienceCard={toggleExperienceCard} />
                </div>
            }
            {
                experienceView === 'location' ? (
                    experienceCardOpen && <ExperienceCard experiences={experiences.filter(experience => experience.locationShortened === experienceCard)} />
                ) : (
                    experienceCardOpen && <ExperienceCard experiences={experiences.filter(experience => experience.industry === experienceCard)} />
                )
            }
        </section>
    )
}