import './NavBar.scss'

import { NavLink } from 'react-router-dom'

export function NavBar() {
    return (
        <nav className="nav-bar">
            <NavLink to='/' className='nav-bar__link'>Emile Tal</NavLink>
            <NavLink to='/projects' className='nav-bar__link'>projects</NavLink>
        </nav>
    )
}