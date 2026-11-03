import { AboutSection } from '../../components/AboutSection/AboutSection'
import { ExperiencesSection } from '../../components/ExperiencesSection/ExperiencesSection'
import { SkillsSection } from '../../components/SkillsSection/SkillsSection'

export function HomePage() {
    return (
        <main className='min-h-screen bg-cream'>
            <AboutSection />
            <SkillsSection />
            <ExperiencesSection />
        </main>
    )
}
