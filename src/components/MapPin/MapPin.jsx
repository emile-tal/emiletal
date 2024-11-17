import './MapPin.scss'

export function MapPin({ location, experiences, handleClick }) {


    return (
        <div className={`map-pin map-pin--${location}`} onClick={() => handleClick(location)}>
            <span className='map-pin__number'>{experiences.length}</span>
        </div>
    )
}