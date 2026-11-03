import type { Location } from '../../types'
import { EXPERIENCE_CARD_ID } from '../../constants/experience'

interface MapPinProps {
    location: Location
    label: string
    isSelected: boolean
    toggleExperienceCard: (location: Location) => void
}

const pinPositions: Record<Location, string> = {
    nyc: 'top-[42%] left-[23%]',
    lausanne: 'top-[36.5%] right-[49.25%]',
    hk: 'top-[49.75%] right-[16.5%]',
    miami: 'top-[48.5%] left-[21.25%]'
}

export function MapPin({ location, label, isSelected, toggleExperienceCard }: MapPinProps) {
    return (
        <button
            type='button'
            aria-label={label}
            aria-pressed={isSelected}
            aria-controls={EXPERIENCE_CARD_ID}
            title={label}
            className={`group absolute flex justify-center items-center w-4 h-4 rounded-full border-[0.01rem] border-cream tablet:w-6 tablet:h-6 tablet:border-[0.1rem] hover:cursor-pointer motion-safe:transition-[transform,opacity,background-color] motion-safe:duration-300 hover:opacity-100 hover:scale-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${isSelected
                ? 'bg-navy opacity-100 scale-125 z-10'
                : 'bg-navy opacity-75'
            } ${pinPositions[location]}`}
            onClick={() => toggleExperienceCard(location)}
        >
            {isSelected && (
                <span aria-hidden='true' className='absolute inset-0 rounded-full bg-navy motion-safe:animate-ping' />
            )}
            <span
                aria-hidden='true'
                className={`relative rounded-full motion-safe:transition-[width,height,background-color] motion-safe:duration-300 ${isSelected
                    ? 'w-2 h-2 bg-tan tablet:w-3 tablet:h-3'
                    : 'w-1 h-1 bg-cream tablet:w-2 tablet:h-2'
                }`}
            />
        </button>
    )
}
