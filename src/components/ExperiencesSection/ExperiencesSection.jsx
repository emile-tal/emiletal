import './ExperiencesSection.scss'

import { Map } from '../Map/Map'
import { MapPin } from '../MapPin/MapPin'

export function ExperiencesSection() {
    return (
        <section className='experiences'>
            <h2 className='experiences__heading'>Past Experiences</h2>
            <div className='experiences__map-container'>
                <Map />
                <MapPin />
            </div>
        </section>
    )
}