import './MapPin.scss'

export function MapPin({ location, experiences, toggleExperienceCard }) {


    return (
        <div className={`map-pin map-pin--${location}`} onClick={() => toggleExperienceCard(location)}>
            <span className='map-pin__number'>{experiences.length}</span>
        </div>
    )
}