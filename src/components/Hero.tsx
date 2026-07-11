import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

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

  // Title color: black on the dark banner, matches the "HOLD IT LOOSELY"
  // light-mode color (gray-900) on the light banner.
  const titleColor = isLight ? 'text-gray-900' : 'text-black'

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

      {/* Content */}
      <div className="relative z-10 h-full flex items-end md:items-center pb-32 md:pb-0 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Newsletter signup - glass card, now at the top of the hero content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6 md:mb-8 max-w-sm md:max-w-md rounded-xl border backdrop-blur-md shadow-lg p-4 transition-colors duration-300"
              style={
                isLight
                  ? { backgroundColor: 'rgba(255,255,255,0.35)', borderColor: 'rgba(17,24,39,0.15)' }
                  : { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }
              }
            >
              {submitted ? (
                <p className={`text-sm ${isLight ? 'text-gray-700' : 'text-white/80'}`}>
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
                    className={`flex-1 bg-transparent text-sm px-3 py-2 transition-colors focus:outline-none ${
                      isLight
                        ? 'text-gray-800 placeholder:text-gray-600'
                        : 'text-white placeholder:text-white/60'
                    }`}
                  />
                  <button
                    type="submit"
                    className={`shrink-0 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                      isLight
                        ? 'bg-gray-900 text-white hover:bg-gray-700'
                        : 'bg-white text-black hover:bg-white/85'
                    }`}
                  >
                    Sign up
                  </button>
                </form>
              )}
            </motion.div>

            {/* Title */}
            <h1 className={`font-display leading-none tracking-tighter transition-colors duration-300 ${titleColor}`}>
              <span className="block text-[15vw] sm:text-[12vw] md:text-hero">OPEN HAND</span>
              <span className="block font-bold text-[5vw] sm:text-[3.5vw] md:text-3xl mt-2 md:mt-4">
                by Dylan Sebastian
              </span>
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}

