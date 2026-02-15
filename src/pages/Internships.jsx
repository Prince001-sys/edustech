import { useState, useEffect } from 'react'
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Search, 
  Star, 
  Building2, 
  TrendingUp, 
  Rocket, 
  CheckCircle,
  ExternalLink,
  GraduationCap
} from 'lucide-react'
import { motion } from 'framer-motion'
import { getAllInternships } from '../lib/db'

export default function Internships() {
  const [searchQuery, setSearchQuery] = useState('')
  const [allOpportunities, setAllOpportunities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInternships()
        setAllOpportunities(data || [])
      } catch (err) {
        console.error('Failed to fetch internships:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = allOpportunities.filter(opp => 
    opp.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.company?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const featuredOpportunities = allOpportunities.slice(0, 3).map((opp, i) => ({
    ...opp,
    title: opp.role || opp.title, // Mapping role to title if needed
    badge: i === 0 ? 'Trending' : 'Official',
    color: i === 0 ? 'from-blue-600 to-blue-500' : (i === 1 ? 'from-indigo-600 to-indigo-500' : 'from-amber-500 to-orange-500')
  }))

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 rounded-full mb-6"
            >
                <Rocket size={16} className="text-emerald-600" />
                <span className="text-emerald-700 font-bold text-xs tracking-wider uppercase">Career Launch Pad</span>
            </motion.div>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight"
            >
                Launch Your <span className="text-emerald-600">Future Career</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600 max-w-2xl mx-auto font-medium mb-10"
            >
                Curated internship and job opportunities from top campus recruiters and tech giants.
            </motion.p>
        </div>

        {/* Featured Section */}
        <div className="mb-16">
            <div className="flex items-center gap-2 mb-6 ml-1">
                <Star className="text-yellow-400 fill-yellow-400" size={24} />
                <h2 className="text-2xl font-bold text-slate-800">Featured Opportunities</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
                {featuredOpportunities.map((opp, i) => (
                    <motion.div
                        key={opp.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`rounded-3xl p-6 text-white bg-gradient-to-br ${opp.color} shadow-xl hover:-translate-y-1 transition-transform relative overflow-hidden group`}
                    >
                         <div className="absolute top-0 right-0 p-3 bg-white/10 rounded-bl-2xl backdrop-blur-sm font-bold text-xs uppercase tracking-wider">
                            {opp.badge}
                         </div>

                        <div className="mb-6">
                             <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                <Building2 size={24} className="text-white" />
                             </div>
                             <h3 className="text-xl font-bold mb-1 leading-tight">{opp.title}</h3>
                             <p className="text-white/80 font-medium text-sm">{opp.company}</p>
                        </div>

                        <div className="space-y-2 mb-6 text-sm font-medium text-white/90">
                            <div className="flex items-center gap-2">
                                <MapPin size={16} /> {opp.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} /> {opp.duration}
                            </div>
                            <div className="flex items-center gap-2">
                                <Briefcase size={16} /> {opp.stipend}
                            </div>
                        </div>

                        <a 
                            href={opp.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-3 bg-white text-slate-900 text-center rounded-xl font-bold hover:bg-slate-50 transition-colors"
                        >
                            View Details
                        </a>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* All Opportunities List */}
        <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-4 space-y-6">
                 <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-28">
                     <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                         <Search size={18} /> Find Roles
                     </h3>
                     <div className="relative mb-6">
                        <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Role, Company..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none text-sm bg-slate-50"
                        />
                     </div>
                     
                     <div className="space-y-3">
                         <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer transition-all">
                             <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                             <span className="font-bold text-slate-700 text-sm">Internships</span>
                         </label>
                         <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer transition-all">
                             <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                             <span className="font-bold text-slate-700 text-sm">Full Time Jobs</span>
                         </label>
                         <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer transition-all">
                             <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                             <span className="font-bold text-slate-700 text-sm">Remote</span>
                         </label>
                     </div>
                 </div>

                 {/* Resume Promo */}
                 <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-lg">
                     <GraduationCap size={32} className="mb-4 text-emerald-400" />
                     <h3 className="text-xl font-bold mb-2">Resume Review</h3>
                     <p className="text-slate-300 text-sm mb-6">Get your resume reviewed by seniors and alumni before applying.</p>
                     <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold transition-colors">
                         Request Review
                     </button>
                 </div>
            </div>

            {/* Main List */}
            <div className="lg:col-span-8 space-y-4">
                 <div className="flex justify-between items-center mb-2">
                     <h3 className="font-bold text-slate-700">All Opportunities ({filtered.length})</h3>
                     <span className="text-xs font-bold text-slate-400">Sorted by: Newest</span>
                 </div>

                 {filtered.map((opp) => (
                     <motion.div
                         key={opp.id}
                         initial={{ opacity: 0, y: 10 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all group"
                     >
                         <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                             <div className="flex gap-4">
                                 <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                                     <Briefcase size={20} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
                                 </div>
                                 <div>
                                     <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{opp.title}</h3>
                                     <p className="text-slate-600 font-medium text-sm">{opp.company} • {opp.location}</p>
                                     <div className="flex flex-wrap gap-2 mt-3">
                                         {opp.tags?.map((tag, i) => (
                                             <span key={i} className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-bold text-slate-500">
                                                 {tag}
                                             </span>
                                         ))}
                                     </div>
                                 </div>
                             </div>

                             <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-1 w-full md:w-auto mt-2 md:mt-0">
                                 <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">{opp.posted}</span>
                                 <a 
                                    href={opp.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-lg hover:bg-emerald-600 hover:text-white transition-all text-sm flex items-center gap-2"
                                 >
                                     Apply <ExternalLink size={14} />
                                 </a>
                             </div>
                         </div>
                     </motion.div>
                 ))}
            </div>
        </div>

      </div>
    </div>
  )
}
