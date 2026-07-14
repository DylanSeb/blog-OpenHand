import { motion } from 'framer-motion'

const contacts = [
  { label: 'LEAVE A TIP', link: 'https://ko-fi.com/dylansebastian' },
  { label: 'READ THE FEATURED ESSAY', link: '#writing' },
]

const footerLinks = [
  { label: 'MailMe', href: 'mailto:wewahneat@gmail.com', newTab: false },
  { label: 'Projects', href: '#work', newTab: false },
  { label: 'Proverbs16', href: '/assets/proverbs16.txt', newTab: true },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

export function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Support</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-display text-[12vw] lg:text-hero leading-none tracking-tight mb-8"
        >
          Keep the room quiet
        </motion.h2>

        <motion.div {...fadeInUp} className="w-full h-px bg-gray-300 dark:bg-gray-700 mb-12 lg:mb-16" />

        <motion.div
          {...fadeInUp}
          className="mb-12 lg:mb-16 max-w-2xl"
        >
          <h3 className="text-xl md:text-2xl lg:text-3xl text-gray-900 dark:text-white font-light leading-tight mb-4">
            THERE IS NO PAYWALL YET<br />
            AND NO NEWSLETTER YET &mdash;<br />
            JUST WRITING, HELD LOOSELY
          </h3>
          <p className="text-sm text-gray-500 tracking-widest uppercase">
            IF A PIECE WAS WORTH YOUR MORNING, A SMALL TIP KEEPS THE PAGE AD-FREE
          </p>
        </motion.div>

        <div className="space-y-0 max-w-2xl">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 py-5 md:py-6 group hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-colors px-4 -mx-4"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400 tracking-widest">
                {contact.label}
              </span>
              <span className="text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                &#8599;
              </span>
            </motion.a>
          ))}
          <div className="border-t border-gray-200 dark:border-gray-800" />
        </div>

        <motion.div
          {...fadeInUp}
          className="mt-16 lg:mt-24 pt-12 lg:pt-16 border-t border-gray-200 dark:border-gray-800"
        >
          <p className="text-sm text-gray-500 mb-6 lg:mb-8 tracking-widest uppercase">
            Or reach me directly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-16">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.newTab ? '_blank' : undefined}
                rel={link.newTab ? 'noopener noreferrer' : undefined}
                className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors underline underline-offset-4"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.footer
          {...fadeInUp}
          className="mt-24 lg:mt-32 pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Open Hand. Written slowly.
          </p>
          <p className="text-xs text-gray-500">
            Plan diligently, hold it loosely.
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
