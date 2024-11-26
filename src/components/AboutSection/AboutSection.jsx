import './AboutSection.scss'

import profilePhoto from '../../assets/images/emile_tal_photo.jpg'

export function AboutSection() {
    return (
        <section className='about'>
            <h2 className='about__heading'>About me</h2>
            <div className='about__container'>
                <div className='about__text-container'>
                    <p className='about__content'>
                        I was first exposed to coding during my bachelor’s at the Ecole hoteliere de Lausanne. After thoroughly enjoying the 'Intro to Python' course, I decided to deepen my programming knowledge by learning basic HTML, CSS, and JavaScript online. After my bachelor’s, I realized that there was nothing I wanted more than to become a software engineer, and to keep learning how to code. I therefore pivoted into an immersive program with BrainStation where I developed the skills I needed to start my new career.
                    </p>
                    <p className='about__content'>
                        Currently living in New York City, I come from a very multicultural background, having lived 10 years in Hong Kong and with French and Israeli parents. I speak English, French, and Hebrew fluently. In my free time, I love cooking, traveling, running, and reading. I ran my first marathon in November 2023 and am excited to run another soon!
                    </p>
                </div>
                <div className='about__image-container'>
                    <img src={profilePhoto} className='about__image' alt='Emile Tal profile photo' />
                </div>
            </div>
        </section>
    )
}