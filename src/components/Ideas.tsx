import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Ideas() {
  return (
    <section id="ideas" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">In Progress</span>
          <div className="w-6 h-px bg-gray-400 dark:bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          IDEAS
        </motion.h2>

        <motion.div {...fadeInUp} className="border-t border-b border-gray-200 dark:border-gray-800 py-16 text-center">
          <p className="text-gray-500 text-sm tracking-widest uppercase">
            Nothing here yet
          </p>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
            This is where half-formed ideas and things worth testing will land.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
