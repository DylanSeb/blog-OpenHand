import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'

type SignalItem = {
  id: string
  type: 'video' | 'article'
  url: string
  thumbnail: string
  title: string
  description: string
}

const AUTOPLAY_MS = 15000

const signalItems: SignalItem[] = [
  {
    id: 'sig-1',
    type: 'video',
    url: 'https://youtu.be/HBMmK0NsUK0?si=3BIj9fPAh9eLBsxe',
    thumbnail: 'https://img.youtube.com/vi/HBMmK0NsUK0/hqdefault.jpg',
    title: 'Why This Talk Stuck With Me',
    description:
      'A short placeholder description standing in for the real one - this needs to run past three lines so the down-arrow overflow behavior can be tested properly against real card width and font sizing before real copy goes in.',
  },
  {
    id: 'sig-2',
    type: 'video',
    url: 'https://youtu.be/duaagJ9jeno?si=uC2ppWW3SnuGsJwN',
    thumbnail: 'https://img.youtube.com/vi/duaagJ9jeno/hqdefault.jpg',
    title: 'A Founder Pattern Worth Watching',
    description:
      'Dummy copy for testing. Keep this one short enough to fit within three lines so the chevron correctly does NOT appear - used to verify the overflow-detection logic works both ways.',
  },
  {
    id: 'sig-3',
    type: 'video',
    url: 'https://youtu.be/etVCBDRXUH8?si=2fuyhOrbAnIGrFPy',
    thumbnail: 'https://img.youtube.com/vi/etVCBDRXUH8/hqdefault.jpg',
    title: 'Notes From a Rewatch',
    description:
      'Placeholder description number three, deliberately padded with extra filler words so it wraps past three lines of body copy at typical card widths, triggering the down-arrow expand affordance for QA purposes.',
  },
  {
    id: 'sig-4',
    type: 'article',
    url: 'https://www.yoco.com/za/blog/yoconext2026/',
    thumbnail: '/signal/placeholder-yoco.svg',
    title: 'Yoco Next 2026 - Placeholder Title',
    description:
      'Standing in for a real summary of this piece. Long enough to overflow three lines so the expand interaction and overlay content can be verified against realistic body copy length before final editing.',
  },
  {
    id: 'sig-5',
    type: 'article',
    url: 'https://www.swift.com/news-events/press-releases/swifts-blockchain-ledger-ready-use-17-banks-set-pioneer-tokenised-cross-border-payments-trusted-global-infrastructure',
    thumbnail: '/signal/placeholder-swift.svg',
    title: "SWIFT's Ledger Milestone - Placeholder Title",
    description:
      'Dummy description for the SWIFT piece. Short version for now, kept brief to test the case where the chevron should stay hidden because the text fits inside three lines.',
  },
  {
    id: 'sig-6',
    type: 'article',
    url: 'https://mybroadband.co.za/news/ai/657152-discovery-bank-changes-the-game.html',
    thumbnail: '/signal/placeholder-discovery.svg',
    title: 'Discovery Bank Changes the Game - Placeholder Title',
    description:
      "Placeholder body copy, intentionally verbose for testing purposes, describing a piece about a local bank's AI-driven changes, long enough to require the reader to expand it via the down arrow to see the rest.",
  },
  {
    id: 'sig-7',
    type: 'article',
    url: 'https://blog.cloudflare.com/monetization-gateway/',
    thumbnail: '/signal/placeholder-cloudflare.svg',
    title: "Cloudflare's Monetization Gateway - Placeholder Title",
    description:
      "Final placeholder entry, describing Cloudflare's gateway announcement, padded out with extra words so this card also exercises the overlay expand-and-collapse animation during testing.",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

function wrapPosition(index: number, activeIndex: number, total: number) {
  let position = index - activeIndex
  const half = Math.floor(total / 2)

  if (position > half) position -= total
  if (position < -half) position += total

  return position
}

function useViewportTier() {
  const [tier, setTier] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const updateTier = () => {
      if (window.innerWidth < 640) {
        setTier('mobile')
      } else if (window.innerWidth < 1024) {
        setTier('tablet')
      } else {
        setTier('desktop')
      }
    }

    updateTier()
    window.addEventListener('resize', updateTier)
    return () => window.removeEventListener('resize', updateTier)
  }, [])

  return tier
}

export function Signal() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isInteracting, setIsInteracting] = useState(false)
  const [overlayItem, setOverlayItem] = useState<SignalItem | null>(null)
  const [isActiveDescriptionOverflowing, setIsActiveDescriptionOverflowing] = useState(false)
  const activeDescriptionRef = useRef<HTMLParagraphElement | null>(null)
  const progressRef = useRef(0)
  const tier = useViewportTier()
  const shouldReduceMotion = useReducedMotion()
  const activeItem = signalItems[activeIndex]

  const isPaused = isInteracting || Boolean(overlayItem) || Boolean(shouldReduceMotion)

  const transformConfig = useMemo(() => {
    if (tier === 'mobile') return { nearX: 150, farX: 268, nearZ: -80, farZ: -170, nearRotate: 14, farRotate: 24 }
    if (tier === 'tablet') return { nearX: 278, farX: 462, nearZ: -120, farZ: -240, nearRotate: 20, farRotate: 34 }
    return { nearX: 370, farX: 610, nearZ: -130, farZ: -280, nearRotate: 24, farRotate: 40 }
  }, [tier])

  const resetProgress = () => {
    progressRef.current = 0
  }

  const moveCarousel = (direction: 1 | -1) => {
    setDirection(direction)
    setActiveIndex((current) => (current + direction + signalItems.length) % signalItems.length)
    resetProgress()
  }

  const bringToCenter = (index: number) => {
    const nextDirection = wrapPosition(index, activeIndex, signalItems.length) > 0 ? 1 : -1
    setDirection(nextDirection)
    setActiveIndex(index)
    resetProgress()
  }

  useEffect(() => {
    const measureOverflow = () => {
      const element = activeDescriptionRef.current
      setIsActiveDescriptionOverflowing(Boolean(element && element.scrollHeight > element.clientHeight + 1))
    }

    measureOverflow()

    const observer = new ResizeObserver(measureOverflow)
    if (activeDescriptionRef.current) observer.observe(activeDescriptionRef.current)

    return () => observer.disconnect()
  }, [activeIndex, tier])

  useEffect(() => {
    if (isPaused) return undefined

    let frame = 0
    let startedAt = performance.now() - progressRef.current * AUTOPLAY_MS

    const tick = (time: number) => {
      const nextProgress = Math.min((time - startedAt) / AUTOPLAY_MS, 1)
      progressRef.current = nextProgress

      if (nextProgress >= 1) {
        startedAt = time
        progressRef.current = 0
        setDirection(1)
        setActiveIndex((current) => (current + 1) % signalItems.length)
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isPaused])

  useEffect(() => {
    if (!overlayItem) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOverlayItem(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [overlayItem])

  return (
    <section id="signal" className="signal-section relative overflow-hidden bg-gray-50 dark:bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-10">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Watching & Reading</span>
          <div className="w-6 h-px bg-gray-400 dark:bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-6 lg:mb-8"
        >
          SIGNAL
        </motion.h2>

        <motion.div
          {...fadeInUp}
          className="relative"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onFocus={() => setIsInteracting(true)}
          onBlur={() => setIsInteracting(false)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') moveCarousel(-1)
            if (event.key === 'ArrowRight') moveCarousel(1)
          }}
          tabIndex={0}
          aria-label="Signal carousel. Use left and right arrow keys to move between items."
        >
          <motion.div
            className="signal-glass-stage relative mx-auto h-[19rem] w-full max-w-[1180px] overflow-hidden sm:h-[21rem] lg:h-[22rem]"
            drag={shouldReduceMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragStart={() => setIsInteracting(true)}
            onDragEnd={(_, info) => {
              const swipe = info.offset.x + info.velocity.x * 0.18
              if (swipe < -70) moveCarousel(1)
              if (swipe > 70) moveCarousel(-1)
              setIsInteracting(false)
            }}
            style={{ perspective: tier === 'mobile' ? 760 : 1200 }}
          >
            {signalItems.map((item, index) => {
              const position = wrapPosition(index, activeIndex, signalItems.length)
              const distance = Math.abs(position)
              const isActive = position === 0
              const isVisible = distance <= 2
              if (!isVisible) return null

              const side = Math.sign(position)
              const x = distance === 0 ? 0 : side * (distance === 1 ? transformConfig.nearX : transformConfig.farX)
              const rotateY = shouldReduceMotion || distance === 0 ? 0 : side * -(distance === 1 ? transformConfig.nearRotate : transformConfig.farRotate)
              const rotateZ = shouldReduceMotion || distance === 0 ? 0 : side * (distance === 1 ? 1.5 : 3)
              const scale = shouldReduceMotion ? (isActive ? 1 : 0.92) : distance === 0 ? 1 : distance === 1 ? 0.86 : 0.68
              const translateZ = shouldReduceMotion || distance === 0 ? 0 : distance === 1 ? transformConfig.nearZ : transformConfig.farZ
              const opacity = !isVisible ? 0 : distance === 0 ? 1 : distance === 1 ? 0.76 : 0.36

              return (
                <motion.article
                  key={item.id}
                  className="absolute left-1/2 top-1/2 h-[16rem] w-[76vw] max-w-[19rem] sm:h-[17rem] sm:w-[21rem] sm:max-w-[21rem] lg:h-[18rem] lg:w-[22rem] lg:max-w-[22rem]"
                  animate={{
                    x,
                    rotateY,
                    rotateZ,
                    scale,
                    z: translateZ,
                    opacity,
                    filter: 'blur(0px)',
                  }}
                  transition={{ type: 'spring', stiffness: shouldReduceMotion ? 1000 : 120, damping: shouldReduceMotion ? 100 : 24 }}
                  style={{
                    translate: '-50% -50%',
                    transformStyle: 'preserve-3d',
                    pointerEvents: isVisible ? 'auto' : 'none',
                    zIndex: 20 - distance,
                  }}
                  aria-hidden={!isActive}
                >
                  <button
                    type="button"
                    className={`signal-carousel-panel group flex h-full w-full flex-col justify-between overflow-hidden rounded-[2rem] p-6 text-left outline-none sm:p-8 ${isActive ? 'signal-carousel-panel--active' : ''}`}
                    onClick={() => {
                      if (!isActive) {
                        bringToCenter(index)
                        return
                      }

                      window.open(item.url, '_blank', 'noopener,noreferrer')
                    }}
                    aria-label={
                      isActive
                        ? `Open ${item.title} in a new tab`
                        : `Bring ${item.title} into focus`
                    }
                    tabIndex={isActive ? 0 : -1}
                  >
                    <span className="signal-carousel-shine" aria-hidden="true" />
                    <div className="relative z-10 flex items-center justify-between text-[0.66rem] uppercase tracking-[0.32em] text-white/72">
                      <span>{item.type === 'video' ? 'Watch' : 'Read'}</span>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    <div className="relative z-10 grid flex-1 place-items-center py-5">
                      <div className="relative aspect-square w-[46%] min-w-24 overflow-hidden rounded-[1.5rem] border border-white/35 bg-white/[0.16] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_18px_28px_rgba(0,0,0,0.22),0_34px_80px_rgba(0,0,0,0.2)] backdrop-blur-2xl [transform:translateZ(34px)]">
                        <img
                          src={item.thumbnail}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/18 via-transparent to-black/28" />
                      </div>
                    </div>

                    <div className="relative z-10">
                      <p className="max-w-[17rem] text-sm leading-6 text-white/78">
                        {item.title}
                      </p>
                    </div>
                  </button>
                </motion.article>
              )
            })}
          </motion.div>

          <div className="relative mx-auto mt-8 flex min-h-[14rem] max-w-3xl items-start justify-center px-14 text-center sm:mt-10 sm:px-20">
            <button
              type="button"
              className="absolute left-0 top-2 flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-800 transition hover:bg-gray-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:border-gray-700 dark:text-white dark:hover:bg-white dark:hover:text-gray-950"
              onClick={() => moveCarousel(-1)}
              aria-label="Previous Signal item"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="relative h-[12rem] w-full overflow-hidden sm:h-[13rem]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={activeItem.id}
                  custom={direction}
                  className="absolute inset-x-0 top-0"
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: direction * 88 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: direction * -88 }}
                  transition={{
                    y: { duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: shouldReduceMotion ? 0 : 0.16, ease: 'linear' },
                  }}
                >
                  <h3 className="font-display text-5xl leading-none text-gray-950 dark:text-white sm:text-6xl lg:text-7xl">
                    <span className="block truncate">{activeItem.title}</span>
                  </h3>
                  <p
                    ref={activeDescriptionRef}
                    className="mx-auto mt-4 max-w-xl text-xs leading-5 text-gray-600 dark:text-gray-400 sm:text-sm sm:leading-6 [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden"
                  >
                    {activeItem.description}
                  </p>

                  {isActiveDescriptionOverflowing && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-white dark:hover:text-gray-950"
                      onClick={(event) => {
                        event.stopPropagation()
                        setOverlayItem(activeItem)
                        resetProgress()
                      }}
                      aria-label={`Read full description for ${activeItem.title}`}
                    >
                      <ChevronDown className="h-5 w-5" aria-hidden="true" />
                    </motion.button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              className="absolute right-0 top-2 flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-800 transition hover:bg-gray-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:border-gray-700 dark:text-white dark:hover:bg-white dark:hover:text-gray-950"
              onClick={() => moveCarousel(1)}
              aria-label="Next Signal item"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {overlayItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 backdrop-blur-lg sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOverlayItem(null)}
          >
            <motion.div
              className="signal-overlay-panel relative max-h-[92vh] w-full overflow-y-auto rounded-t-[2rem] border border-white/25 bg-white/78 p-6 text-gray-950 shadow-2xl backdrop-blur-2xl dark:border-white/15 dark:bg-[#101010]/78 dark:text-white sm:max-w-3xl sm:rounded-[2rem] sm:p-10"
              initial={{ opacity: 0, y: 120, scale: 0.78, transformOrigin: '50% 100%' }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 120, scale: 0.78 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="signal-overlay-title"
            >
              <button
                type="button"
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:bg-gray-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-white dark:hover:text-gray-950"
                onClick={() => setOverlayItem(null)}
                aria-label="Close full description"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="pr-12">
                <div className="mb-8 h-28 w-28 overflow-hidden border border-gray-300 bg-white/60 dark:border-white/15 dark:bg-white/10">
                  <img
                    src={overlayItem.thumbnail}
                    alt=""
                    className="h-full w-full object-cover grayscale"
                    loading="lazy"
                  />
                </div>
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-500">
                  {overlayItem.type === 'video' ? 'Watch' : 'Read'}
                </p>
                <h3 id="signal-overlay-title" className="font-display text-5xl leading-none sm:text-7xl">
                  {overlayItem.title}
                </h3>
                <p className="mt-8 text-base leading-8 text-gray-800 dark:text-gray-100 sm:text-lg">
                  {overlayItem.description}
                </p>
                <a
                  href={overlayItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 rounded-full bg-gray-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
                >
                  {overlayItem.type === 'video' ? 'Watch on YouTube' : 'Read the article'}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
