'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Shuffle, Settings, X } from 'lucide-react'
import { DynamicThemeEngine, THEME_VARIANTS } from '@/lib/DynamicThemeEngine'

export function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [themeEngine] = useState(() => new DynamicThemeEngine())
  const [currentTheme, setCurrentTheme] = useState(themeEngine.getCurrentTheme())
  const [stats, setStats] = useState(themeEngine.getThemeStats())

  useEffect(() => {
    setStats(themeEngine.getThemeStats())
  }, [currentTheme, themeEngine])

  const handleThemeChange = (themeId: string) => {
    const theme = THEME_VARIANTS.find(t => t.id === themeId)
    if (theme) {
      themeEngine.applyTheme(theme)
      setCurrentTheme(theme)
      setStats(themeEngine.getThemeStats())
    }
  }

  const handleRandomTheme = () => {
    const randomTheme = THEME_VARIANTS[Math.floor(Math.random() * THEME_VARIANTS.length)]
    themeEngine.applyTheme(randomTheme)
    setCurrentTheme(randomTheme)
    setStats(themeEngine.getThemeStats())
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cyberpunk': return '#00ff41'
      case 'minimalist': return '#64748b'
      case 'organic': return '#059669'
      case 'retro': return '#ff0080'
      case 'futuristic': return '#3b82f6'
      case 'artistic': return '#7c3aed'
      default: return '#6b7280'
    }
  }

  return (
    <>
      {/* Floating Theme Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Palette className="h-6 w-6" />
      </motion.button>

      {/* Theme Selector Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Dynamic Theme System
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Experience {THEME_VARIANTS.length} unique portfolio variants
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Stats */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{stats.visitCount}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Visits</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{stats.totalThemes}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Theme Variants</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{currentTheme?.name || 'None'}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Current Theme</div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-4">
                  <button
                    onClick={handleRandomTheme}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                  >
                    <Shuffle className="h-4 w-4" />
                    Random Theme
                  </button>
                  <button
                    onClick={() => handleThemeChange(themeEngine.getThemeForVisit().id)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    AI Recommended
                  </button>
                </div>
              </div>

              {/* Theme Grid */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {THEME_VARIANTS.map((theme) => (
                    <motion.button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        currentTheme?.id === theme.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Theme Preview */}
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div
                          className="w-6 h-6 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                      </div>

                      {/* Theme Info */}
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {theme.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="px-2 py-1 text-xs rounded-full text-white font-medium"
                            style={{ backgroundColor: getCategoryColor(theme.category) }}
                          >
                            {theme.category}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {theme.layout.type}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                          <span>{theme.personality.mood}</span>
                          <span>Energy: {theme.personality.energy}/10</span>
                        </div>
                      </div>

                      {/* Active Indicator */}
                      {currentTheme?.id === theme.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-3 h-3 bg-purple-500 rounded-full"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  🤖 AI analyzes your context (time, location, device) to recommend the perfect theme for each visit
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
