import { Navigation } from '@/components/Navigation'
import { GrainOverlay } from '@/components/GrainOverlay'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Work } from '@/components/Work'
import { Education } from '@/components/Education'
import { Writing } from '@/components/Writing'
import { Signal } from '@/components/Signal'
import { Contact } from '@/components/Contact'

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <GrainOverlay />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Education />
      <Writing />
      <Signal />
      <Contact />
    </div>
  )
}

export default Index
