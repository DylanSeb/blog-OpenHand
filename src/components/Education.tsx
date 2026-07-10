import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Education() {
  return (
    <section id="education" className="section-padding bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Background</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          EDUCATION
        </motion.h2>

        {/* Education Items */}
        <div className="space-y-16 lg:space-y-24">
          {/* MIT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            <motion.div {...fadeInUp}>
              <img
                src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="MIT Campus"
                className="w-full h-auto grayscale"
              />
              <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                UNIVERSITY - CAMBRIDGE / USA
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="flex items-center"
            >
              <div>
                <h3 className="text-xl lg:text-2xl font-light text-white mb-4">
                  Computer Science, with a minor in Literature
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Learned to reason about systems in one building and to read closely in
                  another. The habit of moving between them — proofs in the morning,
                  paragraphs at night — is still the way I work.
                </p>
                <p className="text-sm text-gray-500">2011 — 2015</p>
              </div>
            </motion.div>
          </div>

          {/* Second */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            <motion.div
              {...fadeInUp}
              className="flex items-center lg:order-2"
            >
              <div>
                <h3 className="text-xl lg:text-2xl font-light text-white mb-4">
                  Independent Study — Markets & Machine Learning
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Two years spent working through the canonical texts on statistical
                  learning and market microstructure alongside a job that let me test
                  every idea against real data. The best classroom I've had.
                </p>
                <p className="text-sm text-gray-500">2017 — 2019</p>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="lg:order-1"
            >
              <img
                src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Books and screens"
                className="w-full h-auto grayscale"
              />
              <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                A LONG SELF-STUDY - NEW YORK / USA
              </p>
            </motion.div>
          </div>

          {/* Third */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            <motion.div {...fadeInUp}>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="A workshop"
                className="w-full h-auto grayscale"
              />
              <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                A WRITING WORKSHOP - REMOTE
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="flex items-center"
            >
              <div>
                <h3 className="text-xl lg:text-2xl font-light text-white mb-4">
                  Essay Workshop
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  A small, generous workshop that taught me the difference between a
                  draft and a piece — and that the second one takes about four times
                  as long as you think.
                </p>
                <p className="text-sm text-gray-500">2022</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
