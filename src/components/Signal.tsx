import { motion } from 'framer-motion'

// Add real items here as you find things worth sharing.
// type: 'watch' for videos/podcasts, 'read' for news/articles.
const items: { title: string; source: string; type: 'watch' | 'read'; link: string; year: string }[] = [
  // {
  //   title: 'Example: an episode worth the hour',
  //   source: 'Some Podcast',
  //   type: 'watch',
  //   link: 'https://example.com',
  //   year: '2026',
  // },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Signal() {
  return (
    <section id="signal" className="section-padding bg-gray-50 dark:bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Watching & Reading</span>
          <div className="w-6 h-px bg-gray-400 dark:bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          SIGNAL
        </motion.h2>

        {items.length === 0 ? (
          <motion.div {...fadeInUp} className="border-t border-b border-gray-200 dark:border-gray-800 py-16 text-center">
            <p className="text-gray-500 text-sm tracking-widest uppercase">
              Nothing pinned yet
            </p>
            <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
              This is where podcasts and articles worth your time will land as I find them.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-0">
            {items.map((item, index) => (
              <motion.a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="block border-t border-gray-200 dark:border-gray-800 py-6 md:py-8 group hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-colors px-4 -mx-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                  <div>
                    <h3 className="text-lg md:text-xl lg:text-2xl text-gray-900 dark:text-white font-light group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 md:mt-2">
                      {item.type === 'watch' ? 'Watch/Listen' : 'Read'} — {item.source}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">{item.year}</span>
                </div>
              </motion.a>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-800" />
          </div>
        )}
      </div>
    </section>
  )
}
