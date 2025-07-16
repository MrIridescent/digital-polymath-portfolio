'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, RotateCcw, Maximize, Code, Eye } from 'lucide-react'

interface InteractiveDemoProps {
  title: string
  description: string
  codeSnippet: string
  demoUrl?: string
  technologies: string[]
}

export function InteractiveDemo({ 
  title, 
  description, 
  codeSnippet, 
  demoUrl, 
  technologies 
}: InteractiveDemoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      // Handle fullscreen change if needed
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-slate-600">{description}</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className={`p-2 rounded-lg transition-colors ${
                showCode ? 'bg-primary-100 text-primary-600' : 'bg-slate-200 text-slate-600'
              }`}
            >
              <Code className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowCode(false)}
              className={`p-2 rounded-lg transition-colors ${
                !showCode ? 'bg-primary-100 text-primary-600' : 'bg-slate-200 text-slate-600'
              }`}
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="bg-slate-200 text-slate-700 px-2 py-1 rounded text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Demo Area */}
      <div className="relative">
        {showCode ? (
          <div className="p-6 bg-slate-900 text-slate-100 font-mono text-sm overflow-x-auto">
            <pre>{codeSnippet}</pre>
          </div>
        ) : (
          <div className="relative h-96 bg-slate-100">
            {demoUrl ? (
              <iframe
                ref={iframeRef}
                src={demoUrl}
                className="w-full h-full border-0"
                title={title}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-slate-600">Interactive demo placeholder</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Live demo would be embedded here
                  </p>
                </div>
              </div>
            )}
            
            {/* Demo Controls */}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button className="bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors">
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors"
              >
                <Maximize className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}