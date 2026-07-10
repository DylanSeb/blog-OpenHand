import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Staff Engineer, Applied AI',
    company: 'Independent',
    location: 'Remote',
    period: '2023 — Present',
    description: 'Building agent and retrieval systems for teams that ship to production. Long-horizon planning, evaluation harnesses, and the plumbing that turns a demo into a habit. Writing on the side, and increasingly, in the middle.',
    skills: ['LLM Systems', 'Agents & Tools', 'Evaluation', 'Retrieval', 'Systems Design'],
  },
  {
    title: 'Senior Engineer, Platform',
    company: 'A large consumer technology company',
    location: 'Remote',
    period: '2020 — 2023',
    description: 'Led the platform work under a product surface used by tens of millions. Ran a small, quiet team that shipped without ceremony. Learned that the plan is worth the hour and worth throwing out by noon.',
    skills: ['Distributed Systems', 'Reliability', 'Team Leadership', 'Roadmapping', 'Mentorship'],
  },
  {
    title: 'Engineer, Quantitative Research',
    company: 'A market-making firm',
    location: 'New York, NY',
    period: '2017 — 2020',
    description: 'Wrote and ran the tools around the models — pattern discovery, backtesting, and the unglamorous work of trusting a signal. Kept a private notebook that eventually became the beginnings of this page.',
    skills: ['Pattern Analysis', 'Backtesting', 'Data Pipelines', 'Statistics', 'Python / C++'],
  },
  {
    title: 'Software Engineer',
    company: 'An early-stage startup',
    location: 'San Francisco, CA',
    period: '2015 — 2017',
    description: 'Full-stack work on a small team. Learned to build the whole thing, learned when not to, and learned to write short weekly notes that a founder would actually read.',
    skills: ['Full-Stack', 'Product Engineering', 'Prototyping', 'Writing for Founders'],
  },
  {
    title: 'Research Assistant',
    company: 'A university systems lab',
    location: 'Cambridge, MA',
    period: '2013 — 2015',
    description: 'Studied schedulers, contention, and the strange politeness of well-behaved systems. First serious writing done for a reader other than a compiler.',
    skills: ['Operating Systems', 'Concurrency', 'Academic Writing', 'Instrumentation'],
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1, ease: 'easeOut' }
}

export function Work() {
  return (
    <section id="work" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Working Life</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-16 lg:mb-24"
        >
          WORK<br />BY DAY
        </motion.h2>

        {/* Experiences */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.company + exp.period}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
              className="border-t border-gray-800 py-8 md:py-12 lg:py-16 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Left Column - Title & Company */}
                <div className="lg:col-span-5">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-base lg:text-lg text-gray-400">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {exp.location}
                  </p>
                </div>

                {/* Middle Column - Period */}
                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-500 tracking-widest uppercase">
                    {exp.period}
                  </p>
                </div>

                {/* Right Column - Description & Skills */}
                <div className="lg:col-span-5">
                  <p className="text-gray-400 leading-relaxed mb-6 text-sm lg:text-base">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs text-gray-500 border border-gray-800 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
          <div className="border-t border-gray-800" />
        </div>
      </div>
    </section>
  )
}
