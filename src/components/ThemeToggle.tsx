import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="relative flex items-center w-14 h-8 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm transition-colors hover:border-white/50"
    >
      <span
        className={`absolute top-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 ${
          isLight ? 'translate-x-0.5' : 'translate-x-[26px]'
        }`}
      >
        {isLight ? (
          <Sun className="w-3.5 h-3.5 text-gray-800" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-gray-800" />
        )}
      </span>
    </button>
  )
}
