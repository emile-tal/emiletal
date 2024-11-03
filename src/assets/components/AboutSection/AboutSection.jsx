import './AboutSection.scss'

import profilePhoto from '../../images/emile_tal_photo.jpg'

export function AboutSection() {
    return (
        <section className='about'>
            <div className='about__text-container'>
                <h2 className='about__heading'>About me</h2>
                <p className='about__content'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto reprehenderit quidem fuga laborum alias quo possimus labore dolorum iste officiis, reiciendis facere natus! Accusantium et deleniti eligendi enim, iste ratione.</p>
            </div>
            <img src={profilePhoto} className='about__image' alt='Emile Tal profile photo' />
        </section>
    )
}