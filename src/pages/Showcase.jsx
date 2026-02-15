import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Code2, 
  ExternalLink, 
  Github, 
  Search, 
  Users, 
  Star, 
  Eye, 
  Filter, 
  UploadCloud,
  Layers,
  GitCommit
} from 'lucide-react'
import { getAllProjects } from '../lib/db'

export default function Showcase() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [allProjects, setAllProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProjects()
        setAllProjects(data || [])
      } catch (err) {
        console.error('Failed to fetch projects:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const categories = ['All', 'Web Development', 'Machine Learning', 'Data Science', 'App Dev', 'IoT']

  const filtered = allProjects.filter(p => {
    const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
                        <Code2 size={24} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Project Showcase</h1>
                </div>
                <p className="text-slate-500 font-medium ml-1">Explore amazing projects built by students</p>
            </div>
            <button className="px-6 py-2.5 bg-[#db2777] hover:bg-[#be185d] text-white font-bold rounded-lg shadow-lg shadow-pink-500/20 transition-all flex items-center gap-2">
                <UploadCloud size={18} />
                Upload Project
            </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
                { label: 'TOTAL PROJECTS', value: (allProjects.length || 0) + '+', icon: Code2, color: 'text-pink-600' },
                { label: 'AVG STARS', value: allProjects.length ? Math.round(allProjects.reduce((acc, p) => acc + (p.stars_count || 0), 0) / allProjects.length) : '0', icon: Star, color: 'text-yellow-500' },
                { label: 'TOTAL VIEWS', value: (allProjects.reduce((acc, p) => acc + (p.views_count || 0), 0) / 1000).toFixed(1) + 'K', icon: Eye, color: 'text-blue-500' },
                { label: 'CONTRIBUTORS', value: '500+', icon: Users, color: 'text-green-500' },
            ].map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                >
                    <stat.icon className={`mb-4 ${stat.color} opacity-80`} size={28} />
                    <div className="text-3xl font-black text-slate-800 mb-1">{stat.value}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </motion.div>
            ))}
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 mb-10 shadow-sm flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Search by project name or technology..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none text-sm transition-all shadow-sm"
                />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 w-full md:w-auto">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                            selectedCategory === cat
                                ? 'bg-pink-50 text-pink-600 border-pink-200'
                                : 'bg-white text-slate-500 border-slate-200 hover:border-pink-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div className="flex justify-between items-center mb-6">
            <p className="text-slate-500 font-medium text-sm">Showing <span className="font-bold text-slate-800">{filtered.length}</span> projects</p>
        </div>

        {/* Projects Grid */}
        {loading ? (
            <div className="p-16 text-center text-slate-400">Loading projects...</div>
        ) : filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
                <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="bg-white rounded-2xl border border-slate-200 hover:border-pink-300 hover:shadow-lg transition-all overflow-hidden group cursor-pointer"
                >
                <div className="bg-gradient-to-br from-pink-50 to-rose-100 h-40 flex items-center justify-center group-hover:scale-105 transition-transform relative overflow-hidden">
                    {project.thumbnail_url ? (
                        <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-6xl filter drop-shadow-lg">🚀</div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        {project.stars_count || 0}
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-pink-600 transition-colors line-clamp-1">
                        {project.title}
                        </h3>
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-6 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                    {(project.tech_stack || []).map((t, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-50 text-slate-600 border border-slate-200 rounded text-[10px] font-bold uppercase tracking-wide">
                        {t}
                        </span>
                    ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                         <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                                {project.author?.charAt(0) || 'U'}
                            </div>
                            <span className="text-xs font-bold text-slate-600">{project.author || 'Anonymous'}</span>
                         </div>
                         <div className="flex items-center gap-3 text-slate-400">
                            <div className="flex items-center gap-1 text-xs font-bold">
                                <Eye size={14} /> {project.views_count || 0}
                            </div>
                            <div className="flex items-center gap-1 text-xs font-bold hover:text-pink-600 transition-colors">
                                <Github size={14} /> Link
                            </div>
                         </div>
                    </div>
                </div>
                </motion.div>
            ))}
            </div>
        ) : (
            <div className="bg-white rounded-3xl border border-slate-200 border-dashed border-2 p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300 animate-pulse">
                    <Code2 size={40} />
                </div>
                <h3 className="text-slate-500 font-medium mb-2">No projects found matching your filters.</h3>
                <button className="text-[#db2777] font-bold text-sm hover:underline" onClick={() => {setSearchQuery(''); setSelectedCategory('All')}}>
                    Clear Filters
                </button>
            </div>
        )}

      </div>
    </div>
  )
}
