import { Github, Linkedin, Mail, Code } from 'lucide-react'
import Link from 'next/link'
import { FooterQuote } from './PolymathQuotes'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-8 w-8 text-primary-400" />
              <span className="font-bold text-xl">Polymathic Coder</span>
            </div>
            <p className="text-slate-300 max-w-md">
              Digital Polymath and Senior Full Stack Architect specializing in interdisciplinary
              problem-solving at the intersection of technology, design, and systems thinking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/philosophy" className="text-slate-300 hover:text-white transition-colors">
                  Philosophy
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-slate-300 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/writings" className="text-slate-300 hover:text-white transition-colors">
                  Writings
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                className="text-slate-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:hello@polymathiccoder.dev"
                className="text-slate-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Polymath Quote Ticker */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <FooterQuote />
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {currentYear} Polymathic Coder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

