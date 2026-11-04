import profilePhoto from '../../assets/images/emile_tal_photo.jpg'

const paragraphClasses = 'font-poppins text-bronze text-[0.9rem] leading-relaxed tablet:text-[1.05rem] desktop:text-[1.2rem]'

export function AboutSection() {
    return (
        <section id='about' aria-labelledby='about-title' className='page-container scroll-mt-6 pb-8'>
            <div className='flex flex-col items-center gap-6 tablet:flex-row-reverse tablet:items-center tablet:gap-10 desktop:gap-16'>
                <img
                    src={profilePhoto}
                    width={800}
                    height={800}
                    alt='Portrait of Emile Tal'
                    className='aspect-square w-40 shrink-0 rounded-full object-cover ring-4 ring-sand ring-offset-4 ring-offset-cream tablet:w-56 desktop:w-72'
                />
                <div className='flex flex-col gap-3 tablet:flex-1'>
                    <h2 id='about-title' className='section-title'>About me</h2>
                    <p className={paragraphClasses}>
                        I’m a software engineer at SAM Labs in Miami, where I build the tools teachers use to create lessons and assessments for 400,000+ students across 500+ schools. I work across the stack: React and TypeScript on the front end, NestJS and MySQL on the back end.
                    </p>
                    <p className={paragraphClasses}>
                        I came to engineering from hospitality, and I’m especially drawn to hospitality and real estate tech, where understanding operators and guests matters as much as the code.
                    </p>
                </div>
            </div>
        </section>
    )
}
