import './ExperiencesSection.scss'

import { Map } from '../Map/Map'
import { MapPin } from '../MapPin/MapPin'
import experiences from '../../assets/data/experience'

export function ExperiencesSection() {

    const experienceLocations = ["nyc", "lausanne", "hk"]

    return (
        <section className='experiences'>
            <h2 className='experiences__heading'>Past Experiences</h2>
            <div className='experiences__map-container'>
                <Map />
                {experienceLocations.map((location, index) => (
                    <MapPin key={index} location={location} experiences={experiences.filter(experience => experience.locationShortened === location)} />
                ))}
            </div>
        </section>
    )
}