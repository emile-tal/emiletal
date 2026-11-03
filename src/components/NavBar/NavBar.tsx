import { NavLink } from 'react-router-dom'

const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `font-baskerville font-normal no-underline hover:underline ${isActive
        ? 'uppercase text-navy text-[2rem] tablet:text-[3rem]'
        : 'lowercase text-bronze text-[1rem] tablet:text-[1.5rem]'
    }`

export function NavBar() {
    return (
        <nav className='page-container flex items-center gap-4 py-12 desktop:gap-8'>
            <NavLink to='/' className={linkClasses}>Emile Tal</NavLink>
            <NavLink to='/projects' className={linkClasses}>projects</NavLink>
        </nav>
    )
}
