import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' }
}

const rotatingQuotes = [
  {
    lines: [
      'PLAN DILIGENTLY,',
      'HOLD IT LOOSELY.',
      'THE ENGINEERS I TRUST',
      'ARE RUTHLESS WITH PLANS',
      'AND GENTLE WITH OUTCOMES.'
    ],
    attribution: '(NO VERSE - PERSONAL LINE)'
  },
  {
    lines: [
      'IN THEIR HEARTS HUMANS',
      'PLAN THEIR COURSE,',
      'BUT THE LORD ESTABLISHES',
      'THEIR STEPS.'
    ],
    attribution: 'PROVERBS 16:9'
  },
  {
    lines: [
      'TO HUMANS BELONG',
      'THE PLANS OF THE HEART,',
      'BUT FROM THE LORD COMES',
      'THE PROPER ANSWER',
      'OF THE TONGUE.'
    ],
    attribution: 'PROVERBS 16:1'
  }
]

function ThemeAwareImage({
  lightSrc,
  darkSrc,
  alt,
  caption
}: {
  lightSrc: string
  darkSrc: string
  alt: string
  caption: string
}) {
  return (
    <>
      <div className="overflow-visible bg-transparent">
        <img
          src={lightSrc}
          alt={alt}
          className="block w-full h-auto dark:hidden"
          loading="lazy"
        />
        <img
          src={darkSrc}
          alt={alt}
          className="hidden w-full h-auto dark:block"
          loading="lazy"
        />
      </div>
      <p className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
        {caption}
      </p>
    </>
  )
}

function RotatingQuote() {
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % rotatingQuotes.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div
      className="relative h-[62vw] min-h-[18rem] sm:h-[50vw] md:h-[42vw] lg:h-[40rem]"
      aria-live="polite"
    >
      {rotatingQuotes.map((quote, quotePosition) => {
        const emphasizedLine = quote.lines.includes('HOLD IT LOOSELY.')
          ? 'HOLD IT LOOSELY.'
          : quote.lines[quote.lines.length - 1]

        return (
          <div
            key={quote.attribution}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              quotePosition === quoteIndex ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={quotePosition !== quoteIndex}
          >
            <h2 className="font-display text-[8vw] lg:text-section leading-none tracking-tight text-gray-600 dark:text-gray-300">
              "
              {quote.lines.map((line, index) => (
                <span key={`${line}-${index}`}>
                  {line === emphasizedLine ? (
                    <span className="text-gray-900 dark:text-white underline underline-offset-8">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                  {index < quote.lines.length - 1 && <br />}
                </span>
              ))}
              "
            </h2>
            <p className="mt-6 text-xs lg:text-sm text-gray-500 dark:text-gray-400 tracking-widest uppercase">
              {quote.attribution}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">About</span>
          <div className="w-6 h-px bg-gray-400 dark:bg-gray-600 mt-2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div {...fadeInUp} className="order-2 lg:order-1">
            <ThemeAwareImage
              lightSrc="/assets/about-block-1-light-transparent.png"
              darkSrc="/assets/about-block-1-dark-transparent.png"
              alt="A clay-style mascot walking forward while holding a glowing pattern and a small grid cube"
              caption="OLD SYSTEMS - NEW PATTERNS"
            />
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="order-1 lg:order-2 flex items-center"
          >
            <div className="space-y-6 text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                I spent years inside enterprise systems as a developer, then moved to
                the side of the table where you decide what gets built and why. That
                shift changes how you see a problem. Less "how do I write this?" more
                "what's actually going on here, and what pattern is this?"
              </p>
              <p>
                Four and a half years ago I wrote{' '}
                <a
                  href="https://aisel.aisnet.org/acis2024/117/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  my Honours thesis
                </a>{' '}
                on how university students were already absorbing ChatGPT into daily
                life, faster than most institutions had noticed. I was watching that
                shift up close before most people had settled on an opinion about it.
                Computers took decades to become the phone in your pocket. AI is running
                that same evolution on a compressed timeline - and I'd rather be
                building with it than debating what it is.
              </p>
              <p>
                This site is where I run that out loud: the patterns I'm testing in
                markets, the systems I'm building with AI, and the things I make just to
                see what's actually possible with the tools sitting in front of me right
                now.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div {...fadeInUp} className="mb-24 lg:mb-32">
          <RotatingQuote />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-24 lg:mb-32">
          <motion.div {...fadeInUp} className="flex items-center lg:text-right">
            <div className="space-y-6 text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Most evenings, I'm reading through my ideas through AI, or writing .mp
                files to check whether an idea I have about a business/project actually
                holds up once you look at the implementation. I'm not trying to discover
                the next best business/app/stock. I'm trying to get better at
                recognizing the same three or four patterns before everyone agrees
                they're obvious.
              </p>
              <p>
                AI ends up doing a lot of that work for me - not writing the
                conclusions, just helping me test them faster.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <ThemeAwareImage
              lightSrc="/assets/about-block-3-light-transparent.png"
              darkSrc="/assets/about-block-3-dark-transparent.png"
              alt="A clay-style mascot studying a laptop as a small glowing pattern forms above the screen"
              caption="TESTING THE PATTERN AGAINST THE NUMBERS"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
          <motion.div {...fadeInUp}>
            <ThemeAwareImage
              lightSrc="/assets/about-block-4-light-transparent.png"
              darkSrc="/assets/about-block-4-dark-transparent.png"
              alt="A clay-style mascot in a karate stance with a translucent gi afterimage behind him"
              caption="I STILL PRACTICE KATA"
            />
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="flex items-center"
          >
            <div className="space-y-6 text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                <strong className="font-semibold text-gray-900 dark:text-white">
                  Did you know
                </strong>
                : I trained karate from age 8 to 18 and I'm a black belt, though I
                haven't trained in over ten years now.
              </p>
              <p>
                When I was picking an image for the homepage, the open hand wasn't the
                plan. I was inspired by a random image I generated on ElevenLabs. And
                the karate versions of me - made by my imagination. ChatGPT made that
                image from one prompt, by the way. That's mostly how this whole site
                works: I'm printing out my imagination as I go, building the thing while
                I'm still figuring out what it's supposed to be.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
