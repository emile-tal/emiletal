import highlights from '../../assets/data/highlights'

export function HighlightsSection() {
    return (
        <section id='highlights' aria-labelledby='highlights-title' className='page-container section-spacing scroll-mt-6'>
            <h2 id='highlights-title' className='section-title'>Work highlights</h2>
            <div className='grid gap-6 desktop:grid-cols-2 desktop:gap-8'>
                {highlights.map(highlight => (
                    <article
                        key={highlight.title}
                        className='card-surface flex flex-col gap-5'
                    >
                        <header className='flex flex-col gap-1'>
                            <p className='eyebrow'>{highlight.company}</p>
                            <h3 className='card-title'>{highlight.title}</h3>
                        </header>

                        {highlight.stats ?
                            <dl className='flex gap-8 border-y border-sand py-4'>
                                {highlight.stats.map(stat => (
                                    <div key={stat.label} className='flex flex-col-reverse'>
                                        <dt className='meta-text'>{stat.label}</dt>
                                        <dd className='font-baskerville text-[1.6rem] leading-tight text-navy tablet:text-[2rem]'>{stat.value}</dd>
                                    </div>
                                ))}
                            </dl>
                            : highlight.status && (
                                <div className='border-y border-sand py-4'>
                                    <p className='meta-text inline-flex items-center gap-2 rounded-full bg-tan/40 px-3 py-1 text-navy'>
                                        <span aria-hidden='true' className='size-2 rounded-full bg-navy' />
                                        <span className='sr-only'>Status: </span>
                                        {highlight.status}
                                    </p>
                                </div>
                            )
                        }

                        <div className='body-text flex flex-col gap-4'>
                            {highlight.paragraphs.map(paragraph => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>

                        <ul aria-label='Tools used' className='mt-auto flex flex-wrap gap-2'>
                            {highlight.tools.map(tool => (
                                <li
                                    key={tool}
                                    className='meta-text rounded-full border border-tan px-3 py-1 text-navy'
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
