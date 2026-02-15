
import { Link } from 'react-router-dom'
import { Rocket, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Address */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="p-2 bg-blue-600 rounded-lg text-white group-hover:scale-110 transition-transform">
                <Rocket size={24} />
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900">Aerophysics</span>
            </Link>
            
            <div className="space-y-4 text-sm text-slate-500">
                <div>
                    <h4 className="font-bold text-slate-900 mb-1">Corporate & Communications Address:</h4>
                    <p>UIET Kanpur, CSJMU Campus,<br/>Kalyanpur, Kanpur, Uttar Pradesh (208024)</p>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-1">Registered Address:</h4>
                    <p>Aerophysics Student Club,<br/>Lecture Hall Complex,<br/>UIET, Kanpur (208024)</p>
                </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6">Company</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-600">
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link to="/legal" className="hover:text-blue-600 transition-colors">Legal</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/careers" className="hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6">Explore</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-600">
              <li><Link to="/community" className="hover:text-blue-600 transition-colors">Connect</Link></li>
              <li><Link to="/practice" className="hover:text-blue-600 transition-colors">Practice Problems</Link></li>
              <li><Link to="/showcase" className="hover:text-blue-600 transition-colors">Projects</Link></li>
              <li><Link to="/internships" className="hover:text-blue-600 transition-colors">Internships</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6">Resources</h3>
            <ul className="space-y-4 text-sm font-medium text-slate-600">
              <li><Link to="/resources" className="hover:text-blue-600 transition-colors">Syllabus</Link></li>
              <li><Link to="/library" className="hover:text-blue-600 transition-colors">Books</Link></li>
              <li><Link to="/videos" className="hover:text-blue-600 transition-colors">Video Lectures</Link></li>
              <li><Link to="/coding" className="hover:text-blue-600 transition-colors">DSA Sheets</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 Aerophysics Student Club. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
             <Link to="/terms" className="hover:text-slate-900">Terms</Link>
             <Link to="/privacy" className="hover:text-slate-900">Privacy</Link>
             <Link to="/sitemap" className="hover:text-slate-900">Sitemap</Link>
          </div>
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Kanpur
          </p>
        </div>
      </div>
    </footer>
  )
}
