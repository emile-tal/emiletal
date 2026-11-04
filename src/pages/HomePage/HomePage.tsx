import { AboutSection } from '../../components/AboutSection/AboutSection'
import { BackgroundSection } from '../../components/BackgroundSection/BackgroundSection'
import { ExperiencesSection } from '../../components/ExperiencesSection/ExperiencesSection'
import { HighlightsSection } from '../../components/HighlightsSection/HighlightsSection'

export function HomePage() {
    return (
        <main className='min-h-screen bg-cream'>
            <AboutSection />
            <HighlightsSection />
            <ExperiencesSection />
            <BackgroundSection />
        </main>
    )
}
