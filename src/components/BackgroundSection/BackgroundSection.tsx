const facts = [
    { label: 'Grew up', value: 'New York and Hong Kong' },
    { label: 'Languages', value: 'English, French, Hebrew' },
    { label: 'Studied', value: 'École hôtelière de Lausanne, BrainStation' },
    { label: 'Off the clock', value: 'Cooking, travel, running' },
]

export function BackgroundSection() {
    return (
        <section id='background' aria-labelledby='background-title' className='page-container section-spacing scroll-mt-6'>
            <h2 id='background-title' className='section-title'>Background</h2>
            <div className='flex flex-col gap-8 desktop:flex-row desktop:gap-16'>
                <div className='flex flex-col gap-4 desktop:flex-[3]'>
                    <p className='body-text'>
                        I grew up between New York and Hong Kong, with French and Israeli parents, and speak English, French, and Hebrew.
                    </p>
                    <p className='body-text'>
                        Before engineering, I studied at École hôtelière de Lausanne, worked in a hotel kitchen in Hong Kong and in finance at The Pierre in New York, and ran operations for a tutoring marketplace in Lausanne. Working with that marketplace’s developers is what got me curious about how software gets built, and once I started coding myself, I didn’t want to stop. I made the switch through BrainStation’s software engineering program.
                    </p>
                    <p className='body-text'>
                        Outside of work, I cook, travel, and run.
                    </p>
                </div>
                <dl className='card-surface grid grid-cols-2 gap-x-6 gap-y-5 self-start desktop:flex-[2] desktop:grid-cols-1'>
                    {facts.map(fact => (
                        <div key={fact.label} className='flex flex-col gap-1'>
                            <dt className='eyebrow'>{fact.label}</dt>
                            <dd className='font-baskerville text-[1rem] text-navy tablet:text-[1.15rem]'>{fact.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
