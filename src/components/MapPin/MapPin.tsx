import type { Location } from '../../types'

interface MapPinProps {
    location: Location
    toggleExperienceCard: (location: Location) => void
}

const pinPositions: Record<Location, string> = {
    nyc: 'top-[42%] left-[23%]',
    lausanne: 'top-[36.5%] right-[49.25%]',
    hk: 'top-[49.75%] right-[16.5%]',
}

export function MapPin({ location, toggleExperienceCard }: MapPinProps) {
    return (
        <div
            className={`absolute flex justify-center items-center w-4 h-4 rounded-full bg-navy opacity-75 border-[0.01rem] border-cream tablet:w-6 tablet:h-6 tablet:border-[0.1rem] hover:cursor-pointer ${pinPositions[location]}`}
            onClick={() => toggleExperienceCard(location)}
        >
            <div className='w-1 h-1 rounded-full bg-cream tablet:w-2 tablet:h-2'></div>
        </div>
    )
}
