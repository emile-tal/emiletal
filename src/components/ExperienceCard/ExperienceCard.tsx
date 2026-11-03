import type { Experience } from '../../types'

interface ExperienceCardProps {
    experiences: Experience[]
}

export function ExperienceCard({ experiences }: ExperienceCardProps) {
    return (
        <div className='flex flex-col gap-4 p-4 rounded-md bg-tan font-poppins text-navy text-[0.8rem] tablet:text-[1rem] tablet:w-[40rem] tablet:mx-auto tablet:mt-10 tablet:gap-6'>
            {experiences.map((experience, index) => (
                <section className='tablet:flex tablet:flex-col tablet:gap-[0.2rem]' key={index}>
                    <h3 className='font-semibold text-[1.17em]'>{experience.title}</h3>
                    <div className='flex justify-between items-center'>
                        <p>{experience.company.toUpperCase()}</p>
                        <p>{experience.startDate} - {experience.endDate}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p>{experience.location}</p>
                        <p>{experience.industry}</p>
                    </div>
                </section>
            ))}
        </div>
    )
}
