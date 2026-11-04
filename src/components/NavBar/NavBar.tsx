const sectionLinks = [
    { href: '#highlights', label: 'highlights' },
    { href: '#experience', label: 'experience' },
    { href: '#background', label: 'background' },
]

export function NavBar() {
    return (
        <nav aria-label='Main' className='page-container flex flex-wrap items-baseline gap-x-4 gap-y-2 py-12 desktop:gap-8'>
            <a href='#about' className='font-baskerville font-normal uppercase text-navy text-[2rem] no-underline tablet:text-[3rem]'>
                Emile Tal
            </a>
            <ul className='flex flex-wrap items-baseline gap-x-4 desktop:gap-8'>
                {sectionLinks.map(link => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            className='font-baskerville font-normal lowercase text-bronze text-[1rem] no-underline hover:underline focus-visible:underline tablet:text-[1.5rem]'
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
