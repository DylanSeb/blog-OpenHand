import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Hero() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    // TODO: wire to a real provider (Buttondown, ConvertKit, Substack, etc.)
    // This currently just confirms in the UI — no email is actually captured yet.
    setSubmitted(true)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image - swaps with theme */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={isLight ? '/Lbanner.png' : '/Dbanner.png'}
          alt="Open Hand"
          className="w-full h-full object-cover object-center"
        />
        {!isLight && <div className="absolute inset-0 bg-black/40 md:bg-black/30" />}
      </div>

      {/* Theme toggle - top right, below the fixed nav's own top-right row */}
      <div className="absolute top-20 right-6 md:top-28 md:right-10 z-30">
        <ThemeToggle />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end md:items-center pb-32 md:pb-0 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-5xl">
          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1
              className={`font-display leading-none tracking-tighter text-[15vw] sm:text-[12vw] md:text-hero transition-colors duration-300 ${
                isLight ? 'text-gray-800' : 'text-white'
              }`}
            >
              <span className="block">OPEN</span>
              <span className="block">HAND</span>
              <span className="block">ESSAYS</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`mt-6 md:mt-8 text-sm sm:text-base max-w-sm md:max-w-md leading-relaxed transition-colors duration-300 ${
                isLight ? 'text-gray-600' : 'text-white/80'
              }`}
            >
              A field notebook from a software engineer and writer — on AI systems, patterns in markets and code, and the quieter decisions of a life. Plan diligently, hold it loosely.
            </motion.p>

            {/* Newsletter signup */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75, duration: 0.8 }}
              className="mt-6 md:mt-8 max-w-sm md:max-w-md"
            >
              {submitted ? (
                <p className={`text-sm ${isLight ? 'text-gray-600' : 'text-white/80'}`}>
                  You're on the list — thank you.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Get new essays by email"
                    className={`flex-1 text-sm px-4 py-2.5 backdrop-blur-sm transition-colors focus:outline-none ${
                      isLight
                        ? 'bg-black/5 border border-gray-400 text-gray-800 placeholder:text-gray-500 focus:border-gray-800'
                        : 'bg-white/10 border border-white/25 text-white placeholder:text-white/50 focus:border-white/60'
                    }`}
                  />
                  <button
                    type="submit"
                    className={`shrink-0 text-sm font-medium px-4 py-2.5 transition-colors ${
                      isLight
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-white text-black hover:bg-white/85'
                    }`}
                  >
                    Sign up
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


