import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

const coinWords = new Set(['money'])
const highlightClass = 'open-hand-find-match bg-yellow-300 text-black'

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function clearHighlights() {
  document.querySelectorAll<HTMLElement>('.open-hand-find-match').forEach((match) => {
    match.replaceWith(document.createTextNode(match.dataset.originalText ?? match.textContent ?? ''))
    match.parentElement?.normalize()
  })
}

function highlightPage(query: string) {
  clearHighlights()
  const trimmedQuery = query.trim()
  if (!trimmedQuery) return 0

  const isCoinWord = coinWords.has(trimmedQuery.toLowerCase())
  const expression = new RegExp(isCoinWord ? `\\b${escapeRegExp(trimmedQuery)}\\b` : escapeRegExp(trimmedQuery), 'gi')
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement
      if (!parent || !node.textContent?.trim()) return NodeFilter.FILTER_REJECT
      if (parent.closest('[data-find-ignore], script, style, noscript, textarea, input, select, option, svg')) {
        return NodeFilter.FILTER_REJECT
      }
      return NodeFilter.FILTER_ACCEPT
    },
  })

  const textNodes: Text[] = []
  while (walker.nextNode()) textNodes.push(walker.currentNode as Text)

  let resultCount = 0
  textNodes.forEach((node) => {
    const text = node.textContent ?? ''
    expression.lastIndex = 0
    if (!expression.test(text)) return

    expression.lastIndex = 0
    const fragment = document.createDocumentFragment()
    let cursor = 0
    let match: RegExpExecArray | null
    while ((match = expression.exec(text))) {
      if (match.index > cursor) fragment.append(text.slice(cursor, match.index))
      const highlight = document.createElement('mark')
      highlight.className = highlightClass
      highlight.dataset.originalText = match[0]
      highlight.textContent = isCoinWord ? String.fromCodePoint(0x1f4b0) : match[0]
      fragment.append(highlight)
      cursor = match.index + match[0].length
      resultCount += 1
    }

    if (cursor < text.length) fragment.append(text.slice(cursor))
    node.replaceWith(fragment)
  })

  return resultCount
}

export function FloatingFind() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const reduceMotion = useReducedMotion()
  const [isPastHero, setIsPastHero] = useState(false)
  const [query, setQuery] = useState('')
  const [resultCount, setResultCount] = useState(0)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setIsPastHero(!entry.isIntersecting), { threshold: 0.05 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setResultCount(highlightPage(query))
    return () => clearHighlights()
  }, [query])

  return (
    <AnimatePresence>
      {isPastHero && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 28, mass: 0.8 }}
          className="fixed inset-x-0 bottom-[calc(2rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-4 will-change-transform"
          data-find-ignore
        >
          <div
            className={`flex w-full max-w-sm items-center gap-3 rounded-full border px-4 py-3 shadow-lg backdrop-blur-xl transition-colors ${
              isLight
                ? 'border-white/70 bg-white/45 text-gray-900 shadow-black/10'
                : 'border-white/25 bg-white/10 text-white shadow-black/30'
            }`}
          >
            <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              aria-label="Search text on this page"
              className={`min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-70 ${
                isLight ? 'placeholder:text-gray-700' : 'placeholder:text-white/70'
              }`}
            />
            {query.trim() && <span className="text-xs tabular-nums opacity-70">{resultCount}</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
