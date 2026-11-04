import highlights from '../../assets/data/highlights'

export function HighlightsSection() {
    return (
        <section id='highlights' aria-labelledby='highlights-title' className='page-container scroll-mt-6 py-8 desktop:py-12'>
            <h2 id='highlights-title' className='section-title'>Work highlights</h2>
            <div className='grid gap-6 desktop:grid-cols-2 desktop:gap-8'>
                {highlights.map(highlight => (
                    <article
                        key={highlight.title}
                        className='flex flex-col gap-5 rounded-lg border border-sand bg-sand/20 p-5 tablet:p-8'
                    >
                        <header className='flex flex-col gap-1'>
                            <p className='font-poppins text-[0.75rem] uppercase tracking-widest text-bronze tablet:text-[0.85rem]'>{highlight.company}</p>
                            <h3 className='font-baskerville text-[1.3rem] leading-snug text-navy tablet:text-[1.6rem]'>{highlight.title}</h3>
                        </header>

                        <dl className='flex gap-8 border-y border-sand py-4'>
                            {highlight.stats.map(stat => (
                                <div key={stat.label} className='flex flex-col-reverse'>
                                    <dt className='font-poppins text-[0.8rem] text-bronze tablet:text-[0.9rem]'>{stat.label}</dt>
                                    <dd className='font-baskerville text-[1.6rem] leading-tight text-navy tablet:text-[2rem]'>{stat.value}</dd>
                                </div>
                            ))}
                        </dl>

                        <div className='flex flex-col gap-3 font-poppins text-[0.9rem] leading-relaxed text-navy tablet:text-[1rem]'>
                            {highlight.paragraphs.map(paragraph => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>

                        <ul aria-label='Tools used' className='mt-auto flex flex-wrap gap-2'>
                            {highlight.tools.map(tool => (
                                <li
                                    key={tool}
                                    className='rounded-full border border-tan px-3 py-1 font-poppins text-[0.75rem] text-navy tablet:text-[0.85rem]'
                                >
                                    {tool}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    )
}
