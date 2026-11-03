import profilePhoto from '../../assets/images/emile_tal_photo.jpg'

export function AboutSection() {
    return (
        <section className='page-container pb-4'>
            <h2 className='section-title'>About me</h2>
            <div className='desktop:flex desktop:items-start desktop:gap-8'>
                <div>
                    <p className='font-poppins text-bronze py-2 text-[0.8rem] tablet:text-[1rem] desktop:text-[1.2rem]'>
                        I was first exposed to coding during my bachelor’s at the Ecole hôtelière de Lausanne in Switzerland.
                        After thoroughly enjoying an &apos;Intro to Python&apos; course, I decided to deepen my programming knowledge by learning basic HTML, CSS, and JavaScript online.
                        After completing my bachelor’s degree, I realized that there was nothing I wanted more than to become a software engineer, and to keep learning how to code.
                        I therefore pivoted toward an immersive program with BrainStation in New York where I developed the skills I needed to start my new career.
                    </p>
                    <p className='font-poppins text-bronze py-2 text-[0.8rem] tablet:text-[1rem] desktop:text-[1.2rem]'>
                        Currently living in New York City, I come from a multicultural background, having lived 10 years in Hong Kong and with French and Israeli parents.
                        I speak English, French, and Hebrew fluently.
                        In my free time, I love cooking, traveling, running, and reading.
                        I ran my first marathon in November 2023 and am excited to run another one soon!
                    </p>
                </div>
                <div className='flex justify-center w-full p-8 desktop:pt-0'>
                    <img src={profilePhoto} className='max-w-full max-h-[20rem] rounded-full tablet:min-w-[20rem]' alt='Emile Tal profile photo' />
                </div>
            </div>
        </section>
    )
}