import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { GrainOverlay } from '@/components/GrainOverlay'
import { ThemeToggle } from '@/components/ThemeToggle'
import { getHoldingSpaceEntry } from '@/data/holdingSpace'
import { cn } from '@/lib/utils'

type ParsedHeading = {
  id: string
  label: string
  level: 2 | 3
}

type BodyBlock =
  | { type: 'heading'; id: string; label: string; level: 2 | 3 }
  | { type: 'paragraph'; text: string }

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function parseBody(body: string) {
  const blocks: BodyBlock[] = []
  const headings: ParsedHeading[] = []
  const usedIds = new Map<string, number>()

  body.split(/\n{2,}/).forEach((rawBlock) => {
    const block = rawBlock.trim()
    const headingMatch = /^(##|###)\s+(.+)$/.exec(block)

    if (headingMatch) {
      const level = headingMatch[1] === '##' ? 2 : 3
      const label = headingMatch[2].trim()
      const baseId = slugify(label)
      const count = usedIds.get(baseId) ?? 0
      usedIds.set(baseId, count + 1)
      const id = count ? `${baseId}-${count + 1}` : baseId
      const heading = { id, label, level }

      headings.push(heading)
      blocks.push({ type: 'heading', ...heading })
      return
    }

    if (block) {
      blocks.push({ type: 'paragraph', text: block })
    }
  })

  return { blocks, headings }
}

function renderInline(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g)

  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={`${part}-${index}`} className="italic text-gray-900 dark:text-white">
          {part.slice(1, -1)}
        </em>
      )
    }

    return part
  })
}

function formatEntryDate(date: string) {
  return format(new Date(date), 'd MMMM yyyy, HH:mm')
}

function useActiveHeading(headings: ParsedHeading[]) {
  const [activeHeading, setActiveHeading] = useState(headings[0]?.id ?? '')

  useEffect(() => {
    if (!headings.length) return

    const updateActiveHeading = () => {
      const bottomBuffer = 8
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - bottomBuffer

      if (isAtBottom) {
        setActiveHeading(headings[headings.length - 1].id)
        return
      }

      const currentHeading = headings.reduce((current, heading) => {
        const element = document.getElementById(heading.id)
        if (!element) return current

        return element.getBoundingClientRect().top <= 180 ? heading.id : current
      }, headings[0].id)

      setActiveHeading(currentHeading)
    }

    updateActiveHeading()
    window.addEventListener('scroll', updateActiveHeading, { passive: true })
    window.addEventListener('resize', updateActiveHeading)

    return () => {
      window.removeEventListener('scroll', updateActiveHeading)
      window.removeEventListener('resize', updateActiveHeading)
    }
  }, [headings])

  return activeHeading
}

export default function HoldingSpaceArticle() {
  const { slug } = useParams()
  const entry = getHoldingSpaceEntry(slug)
  const parsed = useMemo(() => parseBody(entry?.body ?? ''), [entry?.body])
  const activeHeading = useActiveHeading(parsed.headings)

  if (!entry) {
    return <Navigate to="/" replace />
  }

  const hasHeroImage = entry.heroImage.light !== 'placeholder-square'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GrainOverlay />

      <header className="fixed left-0 right-0 top-0 z-50 flex items-start justify-between p-6 md:p-10">
        <Link
          to="/#writing"
          className="text-sm text-gray-700 transition-opacity hover:opacity-60 dark:text-gray-300"
        >
          Back to Writing
        </Link>
        <ThemeToggle />
      </header>

      <main className="px-6 pb-24 pt-32 md:px-12 lg:px-16 lg:pb-32">
        <article className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
            <div className="min-w-0">
              <div className="mb-10 border-b border-gray-200 pb-8 dark:border-gray-800 md:mb-14 md:pb-10">
                <h1 className="font-display text-[17vw] leading-none tracking-tight text-gray-900 dark:text-white md:text-[12vw] lg:text-[8.5rem]">
                  {entry.title}
                </h1>
                <p className="mt-6 text-sm uppercase tracking-widest text-gray-500">
                  {entry.category} - Open Hand
                </p>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {formatEntryDate(entry.date)}
                </p>
              </div>

              <div
                className={cn(
                  'mb-12 aspect-square w-full max-w-[42rem] overflow-hidden',
                  hasHeroImage
                    ? 'bg-transparent'
                    : 'border border-gray-300 bg-gray-100 dark:border-gray-800 dark:bg-[#111]',
                )}
              >
                {!hasHeroImage ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-display text-[16vw] leading-none text-gray-300 dark:text-gray-800 md:text-8xl">
                      IMAGE
                    </span>
                  </div>
                ) : (
                  <>
                    <img
                      src={entry.heroImage.light}
                      alt=""
                      className="h-full w-full object-cover dark:hidden"
                    />
                    <img
                      src={entry.heroImage.dark}
                      alt=""
                      className="hidden h-full w-full object-cover dark:block"
                    />
                  </>
                )}
              </div>

              <div className="max-w-3xl space-y-7 text-lg leading-relaxed text-gray-700 dark:text-gray-300 md:text-xl">
                {parsed.blocks.map((block, index) => {
                  if (block.type === 'heading') {
                    const HeadingTag = block.level === 2 ? 'h2' : 'h3'

                    return (
                      <HeadingTag
                        key={block.id}
                        id={block.id}
                        className="scroll-mt-32 pt-8 font-display text-5xl leading-none tracking-tight text-gray-900 dark:text-white md:text-6xl"
                      >
                        {block.label}
                      </HeadingTag>
                    )
                  }

                  return <p key={`${block.text}-${index}`}>{renderInline(block.text)}</p>
                })}
              </div>
            </div>

            {parsed.headings.length > 0 && (
              <aside className="hidden lg:block">
                <nav className="sticky top-32 border-l border-gray-200 pl-5 dark:border-gray-800">
                  <p className="mb-4 text-xs uppercase tracking-widest text-gray-500">In this note</p>
                  <div className="space-y-3">
                    {parsed.headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={cn(
                          'block text-sm leading-snug transition-colors',
                          activeHeading === heading.id
                            ? 'text-gray-950 dark:text-white'
                            : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200',
                        )}
                      >
                        {heading.label}
                      </a>
                    ))}
                  </div>
                </nav>
              </aside>
            )}
          </div>
        </article>
      </main>
    </div>
  )
}
