import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
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

  // Title color: white reads on the dark banner (black text there was
  // invisible against the black background); gray-900 matches "HOLD IT
  // LOOSELY" on the light banner, as requested.
  const titleColor = isLight ? 'text-gray-900' : 'text-white'

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image - swaps with theme, zoomed to crop out the
          surrounding action-pose figures and keep just the center figure */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={isLight ? '/Lbanner.png' : '/Dbanner.png'}
          alt="Open Hand"
          className="w-full h-full object-cover object-center scale-[2.2]"
        />
        {!isLight && <div className="absolute inset-0 bg-black/40 md:bg-black/30" />}
      </div>

      {/* Newsletter - liquid glass bubble, centered at the top */}
      <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-20 w-[88%] max-w-xs">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="relative rounded-full backdrop-blur-xl shadow-lg overflow-hidden transition-colors duration-300"
          style={
            isLight
              ? { backgroundColor: 'rgba(255,255,255,0.55)', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }
              : { backgroundColor: 'rgba(255,255,255,0.14)', boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }
          }
        >
          {/* subtle top specular highlight, the "liquid glass" touch */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 to-transparent" />
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ border: isLight ? '1px solid rgba(255,255,255,0.6)' : '1px solid rgba(255,255,255,0.25)' }}
          />

          {submitted ? (
            <div className={`relative flex items-center justify-center gap-2 px-5 py-2.5 text-sm ${isLight ? 'text-gray-800' : 'text-white'}`}>
              <Check className="w-4 h-4" />
              <span>You're on the list</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative flex items-center pl-4 pr-1.5 py-1.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Get new essays"
                className={`flex-1 min-w-0 bg-transparent text-sm px-0 py-1.5 focus:outline-none ${
                  isLight
                    ? 'text-gray-800 placeholder:text-gray-600'
                    : 'text-white placeholder:text-white/60'
                }`}
              />
              <button
                type="submit"
                aria-label="Sign up"
                className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                  isLight
                    ? 'bg-gray-900 text-white hover:bg-gray-700'
                    : 'bg-white text-black hover:bg-white/85'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end md:items-center pb-32 md:pb-0 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
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

