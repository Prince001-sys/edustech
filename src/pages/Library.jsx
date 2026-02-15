
import { useState } from 'react'
import { FileText, Download, Search, Filter, BookOpen, GraduationCap, FolderOpen, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const materials = [
  {
    id: 1,
    title: 'Data Structures - Linear Structures',
    subject: 'DSA',
    year: '2nd Year',
    type: 'Notes',
    pages: 45,
    downloads: 1250,
    rating: 4.8,
    size: '2.4 MB',
    department: 'CSE',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 2,
    title: 'Web Development - HTML & CSS Basics',
    subject: 'Web Tech',
    year: '2nd Year',
    type: 'Notes',
    pages: 38,
    downloads: 890,
    rating: 4.7,
    size: '1.8 MB',
    department: 'CSE',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 3,
    title: 'Database Management Systems - SQL',
    subject: 'DBMS',
    year: '2nd Year',
    type: 'Notes',
    pages: 52,
    downloads: 1150,
    rating: 4.9,
    size: '3.1 MB',
    department: 'CSE',
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    id: 4,
    title: 'Operating Systems - Process Management',
    subject: 'OS',
    year: '3rd Year',
    type: 'Notes',
    pages: 48,
    downloads: 920,
    rating: 4.6,
    size: '2.8 MB',
    department: 'CSE',
    color: 'bg-pink-100 text-pink-600'
  },
  {
    id: 5,
    title: 'Digital Logic & Circuit Design',
    subject: 'DLD',
    year: '2nd Year',
    type: 'Notes',
    pages: 42,
    downloads: 750,
    rating: 4.5,
    size: '2.1 MB',
    department: 'ECE',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    id: 6,
    title: 'Signals & Systems - Fundamentals',
    subject: 'Signals',
    year: '3rd Year',
    type: 'Notes',
    pages: 55,
    downloads: 680,
    rating: 4.7,
    size: '3.4 MB',
    department: 'ECE',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 7,
    title: 'Thermodynamics - Complete Notes',
    subject: 'Thermodynamics',
    year: '2nd Year',
    type: 'Notes',
    pages: 50,
    downloads: 640,
    rating: 4.6,
    size: '2.9 MB',
    department: 'ME',
    color: 'bg-red-100 text-red-600'
  },
  {
    id: 8,
    title: 'Fluid Mechanics - Detailed Study Material',
    subject: 'Fluid Mechanics',
    year: '3rd Year',
    type: 'Notes',
    pages: 58,
    downloads: 720,
    rating: 4.8,
    size: '3.5 MB',
    department: 'ME',
    color: 'bg-cyan-100 text-cyan-600'
  },
]

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedDept, setSelectedDept] = useState('all')

  const filtered = materials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         m.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesYear = selectedYear === 'all' || m.year === selectedYear
    const matchesDept = selectedDept === 'all' || m.department === selectedDept
    return matchesSearch && matchesYear && matchesDept
  })

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 rounded-full mb-4">
            <FolderOpen size={16} className="text-purple-600" />
            <span className="text-purple-700 font-bold text-xs tracking-wider uppercase">Study Material & Notes</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
            Curated <span className="text-purple-600">Knowledge Base</span><br/>for Top Scorers
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
             Handwritten notes, cheat sheets, and lecture summaries organized by semester.
          </p>
        </motion.div>

        {/* Search & Filters */}
         <div className="mb-12 flex flex-col xl:flex-row gap-4 justify-between items-center max-w-6xl mx-auto">
             <div className="relative w-full xl:w-96">
                <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search notes, subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all shadow-sm"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 w-full xl:w-auto">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200">
                    <GraduationCap size={16} className="text-slate-400"/>
                    <select 
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer"
                    >
                        <option value="all">All Years</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                    </select>
                </div>

                 <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200">
                    <BookOpen size={16} className="text-slate-400"/>
                    <select 
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        className="bg-transparent text-sm font-bold text-slate-600 outline-none cursor-pointer"
                    >
                        <option value="all">All Departments</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                         <option value="ME">ME</option>
                         <option value="CHE">CHE</option>
                    </select>
                </div>
              </div>
        </div>

        {/* Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((material, i) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
               {/* Decorative Gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${material.color.split(' ')[0]} rounded-bl-full opacity-30 -mr-8 -mt-8 transition-transform group-hover:scale-150`}></div>

              <div className="flex items-start gap-4 mb-4 relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${material.color}`}>
                    <FileText size={24} />
                  </div>
                  
                  <div className="flex-1">
                       <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {material.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            {material.subject}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            {material.year}
                        </span>
                      </div>
                  </div>
              </div>

               <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100 mb-4 bg-slate-50/50 rounded-xl px-4 relative z-10">
                    <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Size</div>
                        <div className="text-sm font-bold text-slate-900">{material.size}</div>
                    </div>
                     <div>
                        <div className="text-xs text-slate-500 font-semibold uppercase">Rating</div>
                        <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
                            {material.rating} <span className="text-yellow-400 text-xs">★</span> 
                        </div>
                    </div>
                  </div>

               <div className="flex gap-3 relative z-10">
                  <button className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-purple-600 transition-colors shadow-lg shadow-slate-900/10 group-hover:shadow-purple-600/20 flex items-center justify-center gap-2">
                     <Download size={16} />
                     Download
                  </button>
               </div>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}