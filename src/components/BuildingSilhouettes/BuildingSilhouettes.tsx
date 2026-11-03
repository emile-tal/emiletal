import type { Industry } from '../../types'
import bank from '../../assets/images/bank.png'
import city from '../../assets/images/city.png'
import hotel from '../../assets/images/hotel.png'
import school from '../../assets/images/school.png'

interface BuildingSilhouettesProps {
    toggleExperienceCard: (industry: Industry) => void
}

const buildingClasses = 'absolute rounded-full transition-[background-color] duration-500 hover:cursor-pointer hover:bg-[rgba(186,152,84,0.75)] hover:z-4'

export function BuildingSilhouettes({ toggleExperienceCard }: BuildingSilhouettesProps) {
    return (
        <div className='relative flex justify-center items-center max-w-[40rem] my-4 mx-auto'>
            <img className={`${buildingClasses} w-[40%] bottom-[2%] left-[30%] z-3`} src={school} alt='Black silhouette of a school' onClick={() => toggleExperienceCard('Education')} />
            <img className={`${buildingClasses} w-1/2 bottom-[2%] left-0 z-2`} src={bank} alt='Black silhouette of a bank' onClick={() => toggleExperienceCard('Finance')} />
            <img className={`${buildingClasses} h-[60%] bottom-[5%] right-0 z-1`} src={hotel} alt='Black silhouette of a hotel' onClick={() => toggleExperienceCard('Hospitality')} />
            <img className='w-full' src={city} alt='Black silhouette of a city' />
        </div>
    )
}
