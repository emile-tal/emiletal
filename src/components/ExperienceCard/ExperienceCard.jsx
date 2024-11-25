import './ExperienceCard.scss'

export function ExperienceCard({ experiences }) {

    return (
        <div className={`experience-card`}>
            {experiences.map((experience, index) => (
                <section className='experience-card__section' key={index}>
                    <h3 className='experience-card__title'>{experience.title}</h3>
                    <div className='experience-card__textline'>
                        <p className='experience-card__text'>{experience.company.toUpperCase()}</p>
                        <p className='experience-card__text'>{experience.startDate} - {experience.endDate}</p>
                    </div>
                    <div className='experience-card__textline'>
                        <p className='experience-card__text'>{experience.location}</p>
                        <p className='experience-card__text'>{experience.industry}</p>
                    </div>
                </section>
            ))}
        </div>
    )
}