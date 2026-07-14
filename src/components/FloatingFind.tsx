import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

const highlightClass = 'open-hand-find-match bg-yellow-300 text-black'
const coinWords = new Set(['money', 'open', 'hand'])
const coinClass = 'open-hand-find-match bg-transparent align-baseline text-xl leading-none'
const phraseCoinClass = 'open-hand-find-match bg-transparent align-baseline text-3xl leading-none'
const moneyBag = String.fromCodePoint(0x1f4b0)

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function clearHighlights() {
  document.querySelectorAll<HTMLElement>('.open-hand-find-match, .open-hand-find-restore').forEach((match) => {
    const parent = match.parentElement
    match.replaceWith(document.createTextNode(match.dataset.originalText ?? match.textContent ?? ''))
    parent?.normalize()
  })
}

function createReplacement(originalText: string, displayText: string, className: string) {
  const replacement = document.createElement('mark')
  replacement.className = className
  replacement.dataset.originalText = originalText
  replacement.textContent = displayText

  return replacement
}

function createRestoreMarker(originalText: string) {
  const marker = document.createElement('span')
  marker.className = 'open-hand-find-restore hidden'
  marker.dataset.originalText = originalText
  marker.setAttribute('aria-hidden', 'true')

  return marker
}

function getSearchableTextNodes() {
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

  return textNodes
}

function highlightMatchesInNode(node: Text, expression: RegExp) {
  const text = node.textContent ?? ''
  expression.lastIndex = 0
  if (!expression.test(text)) return 0

  expression.lastIndex = 0
  const fragment = document.createDocumentFragment()
  let cursor = 0
  let resultCount = 0
  let match: RegExpExecArray | null

  while ((match = expression.exec(text))) {
    if (match.index > cursor) fragment.append(text.slice(cursor, match.index))
    const originalText = match[0]
    fragment.append(createReplacement(originalText, originalText, highlightClass))
    cursor = match.index + originalText.length
    resultCount += 1
  }

  if (cursor < text.length) fragment.append(text.slice(cursor))
  node.replaceWith(fragment)

  return resultCount
}

function replaceCoinMatchesInNode(node: Text, expression: RegExp, className: string) {
  const text = node.textContent ?? ''
  expression.lastIndex = 0
  if (!expression.test(text)) return 0

  expression.lastIndex = 0
  const fragment = document.createDocumentFragment()
  let cursor = 0
  let resultCount = 0
  let match: RegExpExecArray | null

  while ((match = expression.exec(text))) {
    if (match.index > cursor) fragment.append(text.slice(cursor, match.index))
    const originalText = match[0]
    fragment.append(createReplacement(originalText, moneyBag, className))
    cursor = match.index + originalText.length
    resultCount += 1
  }

  if (cursor < text.length) fragment.append(text.slice(cursor))
  node.replaceWith(fragment)

  return resultCount
}

function replaceSplitOpenHandPhrase(textNodes: Text[]) {
  let resultCount = 0

  for (let index = 0; index < textNodes.length - 1; index += 1) {
    const openNode = textNodes[index]
    const handNode = textNodes[index + 1]
    const openText = openNode.textContent ?? ''
    const handText = handNode.textContent ?? ''
    const openMatch = openText.match(/\bopen\s*$/i)
    const handMatch = handText.match(/^\s*hand\b/i)

    if (!openMatch || !handMatch || !openNode.isConnected || !handNode.isConnected) continue

    const openStart = openMatch.index ?? 0
    const beforeOpen = openText.slice(0, openStart)
    const afterHand = handText.slice(handMatch[0].length)
    const openFragment = document.createDocumentFragment()
    const handFragment = document.createDocumentFragment()

    if (beforeOpen) openFragment.append(beforeOpen)
    openFragment.append(createReplacement(openMatch[0], moneyBag, phraseCoinClass))
    handFragment.append(createRestoreMarker(handMatch[0]))
    if (afterHand) handFragment.append(afterHand)

    openNode.replaceWith(openFragment)
    handNode.replaceWith(handFragment)
    resultCount += 1
  }

  return resultCount
}

function highlightPage(query: string) {
  clearHighlights()
  const trimmedQuery = query.trim()
  if (!trimmedQuery) return 0

  const normalizedQuery = trimmedQuery.toLowerCase()
  const isOpenHandPhrase = normalizedQuery === 'open hand'
  const isCoinWord = coinWords.has(normalizedQuery)
  const expression = new RegExp(
    isOpenHandPhrase
      ? '\\bopen\\s+hand\\b'
      : isCoinWord
        ? `\\b${escapeRegExp(trimmedQuery)}\\b`
        : escapeRegExp(trimmedQuery),
    'gi',
  )
  const textNodes = getSearchableTextNodes()
  let resultCount = 0

  textNodes.forEach((node) => {
    resultCount += isCoinWord || isOpenHandPhrase
      ? replaceCoinMatchesInNode(node, expression, isOpenHandPhrase ? phraseCoinClass : coinClass)
      : highlightMatchesInNode(node, expression)
  })

  if (isOpenHandPhrase) resultCount += replaceSplitOpenHandPhrase(getSearchableTextNodes())

  return resultCount
}

export function FloatingFind() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const reduceMotion = useReducedMotion()
  const inputRef = useRef<HTMLInputElement>(null)
  const [isPastHero, setIsPastHero] = useState(false)
  const [isInSupport, setIsInSupport] = useState(false)
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false)
  const [isDismissedInHero, setIsDismissedInHero] = useState(false)
  const [query, setQuery] = useState('')
  const [resultCount, setResultCount] = useState(0)
  const [hasQuery, setHasQuery] = useState(false)
  const updateSearch = useCallback((value: string) => {
    setQuery(value)
    setHasQuery(Boolean(value.trim()))
    setResultCount(highlightPage(value))
  }, [])

  const closeInHero = () => {
    setIsDismissedInHero(true)
    updateSearch('')
  }

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => {
      const nextIsPastHero = !entry.isIntersecting
      setIsPastHero(nextIsPastHero)
      if (nextIsPastHero) {
        setHasBeenRevealed(true)
        setIsDismissedInHero(false)
      }
    }, { threshold: 0.05 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsInSupport(entry.isIntersecting)
    }, { threshold: 0.35 })

    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  const isVisible = !isInSupport && (isPastHero || (hasBeenRevealed && !isDismissedInHero))
  const showCloseButton = !isPastHero

  useEffect(() => {
    const input = inputRef.current
    if (!input) return undefined
    const handleInput = () => updateSearch(input.value)

    input.addEventListener('input', handleInput)
    return () => input.removeEventListener('input', handleInput)
  }, [isVisible, updateSearch])

  useEffect(() => clearHighlights, [])

  return (
    <AnimatePresence>
      {isVisible && (
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
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => updateSearch(event.currentTarget.value)}
              onInput={(event) => updateSearch(event.currentTarget.value)}
              placeholder="Search"
              aria-label="Search text on this page"
              className={`min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-70 ${
                isLight ? 'placeholder:text-gray-700' : 'placeholder:text-white/70'
              }`}
            />
            {hasQuery && <span className="text-xs tabular-nums opacity-70">{resultCount}</span>}
            {showCloseButton && (
              <button
                type="button"
                onClick={closeInHero}
                aria-label="Close search"
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors ${
                  isLight ? 'text-gray-700 hover:bg-black/10' : 'text-white/80 hover:bg-white/15'
                }`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
