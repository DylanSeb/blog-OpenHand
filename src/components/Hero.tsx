import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

const currentHeroPost = {
  title: 'The Moments We Create',
  href: '#writing',
}

export function Hero() {
  const { theme } = useTheme()
  const artworkRef = useRef<HTMLDivElement>(null)
  const isLight = theme === 'light'
  const titleColor = isLight ? 'text-gray-900' : 'text-white'

  useEffect(() => {
    const artwork = artworkRef.current
    const hero = document.getElementById('hero')
    if (!artwork || !hero) return

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const updateArtworkOpacity = () => {
      frame = 0
      const rect = hero.getBoundingClientRect()
      const fadeDistance = Math.max(rect.height * 0.7, 1)
      const progress = Math.min(Math.max(-rect.top / fadeDistance, 0), 1)
      const opacity = reducedMotionQuery.matches ? (progress > 0.15 ? 0 : 1) : 1 - progress

      artwork.style.opacity = opacity.toFixed(3)
    }

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateArtworkOpacity)
    }

    updateArtworkOpacity()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    reducedMotionQuery.addEventListener('change', scheduleUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      reducedMotionQuery.removeEventListener('change', scheduleUpdate)
    }
  }, [])

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <div
        ref={artworkRef}
        className="absolute inset-0 h-full w-full overflow-hidden will-change-[opacity]"
      >
        <img
          src={isLight ? '/Lbanner.png' : '/Dbanner.png'}
          alt="Open Hand"
          className="h-full w-full object-contain object-center"
        />
      </div>

      <div className="relative z-10 flex h-full items-end px-4 pb-32 sm:px-6 md:items-center md:px-12 md:pb-0 lg:px-16">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className={`font-display leading-none tracking-tighter transition-colors duration-300 ${titleColor}`}>
              <span className="block text-[15vw] sm:text-[12vw] md:text-hero">OPEN</span>
              <span className="block text-[15vw] sm:text-[12vw] md:text-hero">HAND</span>
              <span className="mt-2 block text-[5vw] font-bold sm:text-[3.5vw] md:mt-4 md:text-3xl">
                by Dylan Sebastian
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`mt-6 max-w-sm text-sm leading-relaxed transition-colors duration-300 sm:text-base md:mt-8 md:max-w-md ${
                isLight ? 'text-gray-600' : 'text-white/80'
              }`}
            >
              I don't wait until I'm sure to write. Still learning to hold things with an open hand &mdash; right now, that's:{' '}
              <a
                href={currentHeroPost.href}
                className="underline decoration-current/30 underline-offset-4 transition-opacity hover:opacity-70"
              >
                {currentHeroPost.title}
              </a>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
