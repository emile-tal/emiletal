import './MapPin.scss'

export function MapPin({ location, experiences, toggleExperienceCard }) {


    return (
        <div className={`map-pin map-pin--${location}`} onClick={() => toggleExperienceCard(location)}>
            <div className='map-pin__point'></div>
        </div>
    )
}