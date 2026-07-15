import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { holdingSpaceEntries } from '@/data/holdingSpace'

const ARTICLES_PER_PAGE = 5

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Writing() {
  const [currentPage, setCurrentPage] = useState(1)
  const sortedArticles = useMemo(
    () =>
      [...holdingSpaceEntries].sort(
        (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime(),
      ),
    [],
  )
  const totalPages = Math.ceil(sortedArticles.length / ARTICLES_PER_PAGE)
  const visibleArticles = sortedArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  )
  const showPagination = totalPages > 1

  return (
    <section id="writing" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Essays & Notes</span>
          <div className="w-6 h-px bg-gray-400 dark:bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          HOLDING SPACE
        </motion.h2>

        <div className="space-y-0">
          {visibleArticles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/holding-space/${article.slug}`}
                className="group -mx-4 flex flex-col gap-2 border-t border-gray-200 px-4 py-6 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-900/30 md:flex-row md:items-center md:justify-between md:gap-8 md:py-8"
              >
                <div>
                  <h3 className="text-lg font-light text-gray-900 transition-colors group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300 md:text-xl lg:text-2xl">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 md:mt-2">
                    {article.category} - Open Hand
                  </p>
                </div>

                <span className="text-sm text-gray-500">
                  {format(new Date(article.date), 'd MMMM yyyy')}
                </span>
              </Link>
            </motion.div>
          ))}
          <div className="border-t border-gray-200 dark:border-gray-800" />
        </div>

        {showPagination && (
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              className="text-sm uppercase tracking-widest text-gray-500 transition-colors hover:text-gray-900 disabled:pointer-events-none disabled:opacity-30 dark:hover:text-white"
            >
              Previous
            </button>

            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-sm uppercase tracking-widest text-gray-500 transition-colors hover:text-gray-900 disabled:pointer-events-none disabled:opacity-30 dark:hover:text-white"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
