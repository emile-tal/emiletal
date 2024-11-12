import './MapPin.scss'

export function MapPin({ location, experiences }) {


    return (
        <div className={`map-pin map-pin--${location}`}>
            <span className='map-pin__number'>{experiences.length}</span>
        </div>
    )
}