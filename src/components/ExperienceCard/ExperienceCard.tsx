import type { Experience } from '../../types'

interface ExperienceCardProps {
    heading: string
    experiences: Experience[]
}

export function ExperienceCard({ heading, experiences }: ExperienceCardProps) {
    return (
        <article
            aria-label={heading}
            className='p-4 rounded-md bg-tan font-poppins text-navy text-[0.8rem] tablet:text-[1rem] tablet:w-[40rem] tablet:mx-auto tablet:mt-10 motion-safe:animate-card-in'
        >
            <ul className='flex flex-col gap-4 tablet:gap-6'>
                {experiences.map(experience => (
                    <li className='tablet:flex tablet:flex-col tablet:gap-[0.2rem]' key={`${experience.company}-${experience.startDate}`}>
                        <h3 className='font-semibold text-[1.17em]'>{experience.title}</h3>
                        <div className='flex justify-between items-center'>
                            <p>{experience.company.toUpperCase()}</p>
                            <p>
                                <time>{experience.startDate}</time>
                                <span aria-hidden='true'> - </span>
                                <span className='sr-only'> to </span>
                                <time>{experience.endDate}</time>
                            </p>
                        </div>
                        <p>{experience.location}</p>
                    </li>
                ))}
            </ul>
        </article>
    )
}
