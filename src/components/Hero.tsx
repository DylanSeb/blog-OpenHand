import { useState } from 'react'
import { motion } from 'framer-motion'

export function Hero() {
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
      {/* Background Image - Responsive */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/hero-image.jpg"
          alt="Open Hand"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
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
            <h1 className="font-display leading-none tracking-tighter text-[15vw] sm:text-[12vw] md:text-hero">
              <span className="block text-white">OPEN</span>
              <span className="block text-white">HAND</span>
              <span className="block text-white">ESSAYS</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 md:mt-8 text-sm sm:text-base text-white/80 max-w-sm md:max-w-md leading-relaxed"
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
                <p className="text-sm text-white/80">
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
                    className="flex-1 bg-white/10 border border-white/25 text-white placeholder:text-white/50 text-sm px-4 py-2.5 backdrop-blur-sm focus:outline-none focus:border-white/60 transition-colors"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-white text-black text-sm font-medium px-4 py-2.5 hover:bg-white/85 transition-colors"
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

