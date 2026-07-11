import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">About</span>
          <div className="w-6 h-px bg-gray-400 dark:bg-gray-600 mt-2" />
        </motion.div>

        {/* First Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="order-2 lg:order-1"
          >
            <img
              src="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Notebooks and quiet mornings"
              className="w-full h-auto grayscale"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              A FIELD NOTEBOOK - MADE SLOWLY
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="order-1 lg:order-2 flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I work by day in AI systems and study patterns by habit — in code, in
              markets, in the small decisions that compound into a life. This page is a
              slow room. I publish when the thinking is done, not when the week is out.
            </p>
          </motion.div>
        </div>

        {/* Quote Block */}
        <motion.div
          {...fadeInUp}
          className="mb-24 lg:mb-32"
        >
          <h2 className="font-display text-[8vw] lg:text-section leading-none tracking-tight text-gray-600 dark:text-gray-300">
            "PLAN DILIGENTLY,<br />
            <span className="text-gray-900 dark:text-white underline underline-offset-8">HOLD IT LOOSELY.</span><br />
            THE ENGINEERS I TRUST<br />
            ARE RUTHLESS WITH PLANS<br />
            AND GENTLE WITH OUTCOMES."
          </h2>
          <p className="mt-6 text-sm text-gray-500 tracking-widest uppercase">
            FROM THE FEATURED ESSAY<br />
            OPEN HAND, OPEN WEEK
          </p>
        </motion.div>

        {/* Second Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div
            {...fadeInUp}
            className="flex items-center lg:text-right"
          >
            <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Everything here is written by hand. No newsletter cadence, no takes for
              their own sake — just pieces held long enough to be worth reading twice.
              There is no paywall. If a piece was worth your morning, the support card
              at the bottom keeps the room quiet.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <img
              src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="A desk lamp and a stack of drafts"
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              THE ROOM WHERE THE WORK GETS HELD
            </p>
          </motion.div>
        </div>

        {/* Third Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
          <motion.div {...fadeInUp}>
            <img
              src="https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Studying patterns in the wild"
              className="w-full h-auto grayscale"
            />
            <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
              STUDYING PATTERNS IN THE WILD<br />
              (ONGOING)
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="flex items-center"
          >
            <p className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The through-line across the essays is the same tension I live at work:
              commit fully to a shape, and, when the shape asks to become something
              else, let it. Markets teach this expensively. So does writing anything
              at length. So does raising a child, from what I am told.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
