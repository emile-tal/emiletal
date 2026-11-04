import type { Experience } from '../../types'

interface ExperienceCardProps {
    heading: string
    experiences: Experience[]
}

// Same surface and type scale as the highlight cards and timeline entries
export function ExperienceCard({ heading, experiences }: ExperienceCardProps) {
    return (
        <article
            aria-label={heading}
            className='card-surface mt-6 tablet:w-[40rem] tablet:mx-auto motion-safe:animate-card-in'
        >
            <ul className='flex flex-col gap-5 divide-y divide-sand'>
                {experiences.map(experience => (
                    <li
                        className='flex flex-col gap-1 pt-5 first:pt-0'
                        key={`${experience.company}-${experience.startDate}`}
                    >
                        <p className='meta-text'>
                            <time>{experience.startDate}</time>
                            <span aria-hidden='true'> – </span>
                            <span className='sr-only'> to </span>
                            <time>{experience.endDate}</time>
                        </p>
                        <h3 className='card-title'>{experience.title}</h3>
                        <p className='body-text'>
                            <span className='font-semibold'>{experience.company}</span>
                            <span aria-hidden='true'> · </span>
                            <span className='sr-only'>, </span>
                            {experience.location}
                        </p>
                    </li>
                ))}
            </ul>
        </article>
    )
}
