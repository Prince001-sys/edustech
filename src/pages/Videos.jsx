
import { useState } from 'react'
import { Play, Search, Users, Clock, Zap, Filter, Youtube } from 'lucide-react'
import { motion } from 'framer-motion'

const videos = [
  {
    id: 1,
    title: 'Microprocessor & Interfacing',
    creator: 'Gate Smashers',
    channel: 'verified',
    duration: '45 hours',
    views: 856000,
    rating: 4.9,
    videos: 120,
    students: 150000,
    level: 'Core',
    icon: '💻',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    title: 'Discrete Mathematics for CS',
    creator: 'Prof. Kamala Krithivasan (NPTEL)',
    channel: 'verified',
    duration: '52 hours',
    views: 420000,
    rating: 4.8,
    videos: 40,
    students: 85000,
    level: 'Math',
    icon: '📐',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 3,
    title: 'Engineering Thermodynamics',
    creator: 'Prof. S.K. Som (NPTEL)',
    channel: 'verified',
    duration: '60 hours',
    views: 380000,
    rating: 4.9,
    videos: 55,
    students: 92000,
    level: 'Core',
    icon: '🔥',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 4,
    title: 'Theory of Computation Full Course',
    creator: 'Gate Smashers',
    channel: 'verified',
    duration: '35 hours',
    views: 950000,
    rating: 4.9,
    videos: 85,
    students: 210000,
    level: 'Core',
    icon: '🧠',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 5,
    title: 'Electronic Devices & Circuits',
    creator: 'Prof. T.S. Natarajan (NPTEL)',
    channel: 'verified',
    duration: '48 hours',
    views: 310000,
    rating: 4.7,
    videos: 45,
    students: 65000,
    level: 'Core',
    icon: '⚡',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 6,
    title: 'Introduction to Algorithms',
    creator: 'MIT OpenCourseWare',
    channel: 'verified',
    duration: '50 hours',
    views: 1200000,
    rating: 5.0,
    videos: 24,
    students: 500000,
    level: 'Advanced',
    icon: '🚀',
    color: 'bg-red-100 text-red-600'
  },
]

export default function Videos() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCreator, setSelectedCreator] = useState('all')

  const filtered = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.creator.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCreator = selectedCreator === 'all' || video.creator.includes(selectedCreator)
    return matchesSearch && matchesCreator
  })

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-100 rounded-full mb-4">
            <Youtube size={16} className="text-red-600" />
            <span className="text-red-700 font-bold text-xs tracking-wider uppercase">Global Video Library</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
            Curated learning content<br/>from <span className="text-red-600">top educators</span> worldwide
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
             Gate Smashers, NPTEL, MIT OpenCourseWare, and more - organized for your syllabus.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center max-w-5xl mx-auto">
             <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search topic or professor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all shadow-sm"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                {['all', 'Gate Smashers', 'NPTEL', 'MIT'].map((creator, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedCreator(creator === 'all' ? 'all' : creator)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      (selectedCreator === creator || (selectedCreator === 'all' && creator === 'all'))
                        ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {creator === 'all' ? 'All Creators' : creator}
                  </button>
                ))}
              </div>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-pointer"
            >
              {/* Decorative BG */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${video.color.split(' ')[0]} rounded-bl-full opacity-50 -mr-8 -mt-8 transition-transform group-hover:scale-150`}></div>

              <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm ${video.color}`}>
                    {video.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-red-600 transition-colors">
                    {video.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200 uppercase tracking-wide">
                        {video.creator.split(' ')[0]}
                    </span>
                     {video.creator.includes('Gate') && (
                        <span className="text-xs font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded border border-green-200">
                            Verified
                        </span>
                     )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100 mb-4">
                    <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Students</div>
                        <div className="text-lg font-bold text-slate-900">{video.students.toLocaleString()}</div>
                    </div>
                     <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Rating</div>
                        <div className="text-lg font-bold text-slate-900 flex items-center gap-1">
                            {video.rating} <span className="text-yellow-400 text-sm">★</span>
                        </div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 group-hover:shadow-red-600/20">
                    <Play size={18} fill="currentColor" />
                    Start Learning
                  </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
