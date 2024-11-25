import './BuildingSilhouettes.scss'

import bank from '../../assets/images/bank.png'
import city from '../../assets/images/city.png'
import hotel from '../../assets/images/hotel.png'
import school from '../../assets/images/school.png'

export function BuildingSilhouettes({ toggleExperienceCard }) {
    return (
        <div className='building-silhouettes'>
            <img className='building-silhouettes__building building-silhouettes__building--school' src={school} alt='Black silhouette of a school' onClick={() => toggleExperienceCard('Education')} />
            <img className='building-silhouettes__building building-silhouettes__building--bank' src={bank} alt='Black silhouette of a bank' onClick={() => toggleExperienceCard('Finance')} />
            <img className='building-silhouettes__building building-silhouettes__building--hotel' src={hotel} alt='Black silhouette of a hotel' onClick={() => toggleExperienceCard('Hospitality')} />
            <img className='building-silhouettes__backdrop' src={city} alt='Black silhouette of a city' />
        </div>
    )

}