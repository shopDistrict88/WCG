import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-stone-800/50 bg-stone-950">
      <div className="page-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-lg text-stone-100 hover:text-accent transition-colors">
              Wilson Collective
            </Link>
            <p className="mt-4 text-sm text-stone-500 leading-relaxed max-w-xs">
              The parent company behind District88, Velvair Studios, Canjustalllove, Divergent Studios, and more. We help creators build their dreams.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-4 font-sans font-medium">
              Navigate
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-stone-400 hover:text-stone-200 transition-colors">About</Link>
              <Link to="/projects" className="text-sm text-stone-400 hover:text-stone-200 transition-colors">Projects</Link>
              <Link to="/insights" className="text-sm text-stone-400 hover:text-stone-200 transition-colors">Insights</Link>
              <Link to="/apply" className="text-sm text-stone-400 hover:text-stone-200 transition-colors">Apply</Link>
              <Link to="/careers" className="text-sm text-stone-400 hover:text-stone-200 transition-colors">Careers</Link>
              <Link to="/contact" className="text-sm text-stone-400 hover:text-stone-200 transition-colors">Contact</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-4 font-sans font-medium">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@wilsoncollectivegroup.com" className="text-sm text-stone-400 hover:text-stone-200 transition-colors">
                info@wilsoncollectivegroup.com
              </a>
              <a href="https://www.instagram.com/wilsoncollectivegroupllc/" target="_blank" rel="noopener noreferrer" className="text-sm text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                @wilsoncollectivegroupllc
              </a>
              <p className="text-sm text-stone-500">
                Raleigh, North Carolina
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-stone-800/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-stone-600">
            &copy; {new Date().getFullYear()} Wilson Collective Group LLC. All rights reserved.
          </p>
          <p className="text-xs text-stone-700 italic font-serif">
            Built with intention.
          </p>
        </div>
      </div>
    </footer>
  )
}
