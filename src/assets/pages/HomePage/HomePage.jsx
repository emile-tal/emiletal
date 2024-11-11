import './HomePage.scss'

import { AboutSection } from "../../components/AboutSection/AboutSection";
import { SkillsSection } from '../../components/SkillsSection/SkillsSection';

export function HomePage() {
    return (
        <main className='main'>
            <AboutSection />
            <SkillsSection />
        </main>
    )
}