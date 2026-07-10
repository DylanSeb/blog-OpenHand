import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Business Analyst',
    company: 'Discovery Invest',
    location: 'Cape Town, South Africa',
    period: 'Present',
    description: 'Design system enhancements, map processes, and write functional specifications to BABOK3 standards — working at the intersection of business strategy and technology inside one of South Africa\'s most sophisticated enterprise environments. The gap between a good idea and a working product is almost always a communication problem; this is the gap I close.',
    skills: ['Business Analysis', 'Stakeholder Management', 'Requirements & Specs', 'BABOK3', 'Process Mapping'],
  },
  {
    title: 'Java Developer',
    company: 'Discovery Insure',
    location: 'Cape Town, South Africa',
    period: 'Prior to Discovery Invest',
    description: 'Started as a Java developer, which means I understand how software gets built from the inside. That technical fluency, combined with the business thinking that came later, is the unusual combination that makes the analysis work land differently.',
    skills: ['Java', 'PL/SQL', 'Software Development'],
  },
]

const recognitions = [
  { label: 'Best Paper', event: 'ACIS 2024 International Conference' },
  { label: 'Top 3', event: 'Discovery GradHack 2023' },
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
              key={exp.company + exp.title}
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

        {/* Recognition */}
        <motion.div {...fadeInUp} className="mt-12 lg:mt-16 flex flex-wrap gap-x-10 gap-y-3">
          {recognitions.map((r) => (
            <p key={r.event} className="text-sm text-gray-500">
              <span className="text-gray-300">🏆 {r.label}</span> — {r.event}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

