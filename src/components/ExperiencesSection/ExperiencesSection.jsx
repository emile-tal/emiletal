import './ExperiencesSection.scss'

import { ExperienceCard } from '../ExperienceCard/ExperienceCard'
import { Map } from '../Map/Map'
import { MapPin } from '../MapPin/MapPin'
import experiences from '../../assets/data/experience'
import { useState } from 'react'

export function ExperiencesSection() {
    const [experienceCardOpen, setExperienceCardOpen] = useState(false)
    const [experienceCard, setExperienceCard] = useState('nyc')

    const experienceLocations = ["nyc", "lausanne", "hk"]

    const handleClick = (location) => {
        setExperienceCardOpen(true)
        setExperienceCard(location)
    }

    return (
        <section className='experiences'>
            <h2 className='experiences__heading'>Past Experiences</h2>
            <div className='experiences__map-container'>
                <Map />
                {experienceLocations.map((location, index) => (
                    <MapPin key={index} location={location} experiences={experiences.filter(experience => experience.locationShortened === location)} handleClick={handleClick} />
                ))}
            </div>
            {experienceCardOpen && <ExperienceCard location={experienceCard} experiences={experiences.filter(experience => experience.locationShortened === experienceCard)} />}
        </section>
    )
}