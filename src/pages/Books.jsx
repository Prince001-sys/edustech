import { useState, useEffect } from 'react'
import { BookOpen, Search, Star, Users, Download, Library, Filter, FileText, FolderOpen, GraduationCap, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllBooks, getAllResources } from '../lib/db'

export default function Books() {
  const [activeTab, setActiveTab] = useState('books') // 'books' | 'notes'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedDept, setSelectedDept] = useState('all')
  
  const [booksData, setBooksData] = useState([])
  const [notesData, setNotesData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [books, resources] = await Promise.all([
          getAllBooks(),
          getAllResources()
        ])
        setBooksData(books || [])
        setNotesData(resources || [])
      } catch (err) {
        console.error('Failed to fetch academic data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Helper to filter data based on active tab
  const getFilteredData = () => {
    if (activeTab === 'books') {
      return booksData.filter(book => {
        const matchesSearch = book.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             book.author?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesSubject = selectedSubject === 'all' || book.subject === selectedSubject
        return matchesSearch && matchesSubject
      })
    } else {
      return notesData.filter(note => {
        const matchesSearch = note.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             note.category?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesYear = selectedYear === 'all' || note.semester?.toString() === selectedYear.charAt(0)
        const matchesDept = selectedDept === 'all' || note.department === selectedDept
        return matchesSearch && matchesYear && matchesDept
      })
    }
  }

  const filtered = getFilteredData()
  const bookSubjects = ['all', ...new Set(booksData.map(b => b.subject).filter(Boolean))]

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-slate-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 ${activeTab === 'books' ? 'bg-amber-100' : 'bg-purple-100'}`}>
            {activeTab === 'books' ? <Library size={16} className="text-amber-600" /> : <FolderOpen size={16} className="text-purple-600" />}
            <span className={`font-bold text-xs tracking-wider uppercase ${activeTab === 'books' ? 'text-amber-700' : 'text-purple-700'}`}>
              {activeTab === 'books' ? 'Reference Library' : 'Study Notes Hub'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
            {activeTab === 'books' ? (
              <>Academic <span className="text-amber-600">Masterpieces</span></>
            ) : (
              <>Curated <span className="text-purple-600">Knowledge Base</span></>
            )}
            <br className="hidden md:block" />
            <span className="text-2xl md:text-5xl font-extrabold text-slate-400">
                {activeTab === 'books' ? 'for Engineering Excellence' : 'for Top Scorers'}
            </span>
          </h1>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
            <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
                <button
                    onClick={() => setActiveTab('books')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                        activeTab === 'books' 
                        ? 'bg-amber-100 text-amber-700 shadow-sm' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                >
                    <BookOpen size={18} />
                    Textbooks
                </button>
                <button
                    onClick={() => setActiveTab('notes')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                        activeTab === 'notes' 
                        ? 'bg-purple-100 text-purple-700 shadow-sm' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                >
                    <FileText size={18} />
                    Notes & Handouts
                </button>
            </div>
        </div>

        {/* Filters Section (Dynamic) */}
        <div className="mb-12 flex flex-col xl:flex-row gap-4 justify-between items-center max-w-6xl mx-auto">
             <div className="relative w-full xl:w-96">
                <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder={activeTab === 'books' ? "Search by title, author, ISBN..." : "Search notes, subjects..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none transition-all shadow-sm focus:ring-4 ${
                      activeTab === 'books' ? 'focus:border-amber-500 focus:ring-amber-100' : 'focus:border-purple-500 focus:ring-purple-100'
                  }`}
                />
              </div>

              {activeTab === 'books' ? (
                  /* Books Filters */
                  <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                    {bookSubjects.map((subject, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedSubject(subject)}
                        className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        selectedSubject === subject
                            ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30'
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                    >
                        {subject === 'all' ? 'All Subjects' : subject}
                    </button>
                    ))}
                </div>
              ) : (
                  /* Notes Filters */
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
              )}
        </div>

        {/* Content Grid */}
        <AnimatePresence mode='wait'>
            <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
            {filtered.map((item, i) => (
                <div
                key={item.id}
                className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                {/* --- Different Layouts for Books vs Notes --- */}
                
                {activeTab === 'books' ? (
                    /* Book Card Layout */
                    <>
                        <div className="flex items-start gap-4 mb-4">
                            <div className={`w-16 h-20 rounded-lg flex items-center justify-center text-4xl shadow-md ${item.color || 'bg-amber-100 text-amber-600'} bg-opacity-20`}>
                                {item.icon || '📖'}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2 group-hover:text-amber-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm font-medium text-slate-500 mb-1 leading-snug">
                                    {item.author}
                                </p>
                                {item.is_verified && (
                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700 border border-green-100">
                                        Verified <span className="text-green-500">✓</span>
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100 mb-4 bg-slate-50/50 rounded-xl px-4">
                            <div>
                                <div className="text-xs text-slate-500 font-semibold uppercase">Subject</div>
                                <div className="text-sm font-bold text-slate-900 truncate">{item.subject}</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 font-semibold uppercase">Semester</div>
                                <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
                                    {item.semester}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <a 
                                href={item.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-2.5 bg-amber-600 text-white rounded-xl text-center font-bold text-sm hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20"
                            >
                                Read Now
                            </a>
                            <a 
                                href={item.file_url}
                                download
                                className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
                            >
                                <Download size={18} />
                            </a>
                        </div>
                    </>
                ) : (
                    /* Note Card Layout */
                    <>
                         <div className={`absolute top-0 right-0 w-32 h-32 ${item.color?.split(' ')[0] || 'bg-purple-100'} rounded-bl-full opacity-30 -mr-8 -mt-8 transition-transform group-hover:scale-150`}></div>
                         <div className="flex items-start gap-4 mb-4 relative z-10">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${item.color || 'bg-purple-100 text-purple-600'}`}>
                                <FileText size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                        {item.category}
                                    </span>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                        Sem {item.semester}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100 mb-4 bg-slate-50/50 rounded-xl px-4 relative z-10">
                            <div>
                                <div className="text-xs text-slate-500 font-semibold uppercase">Type</div>
                                <div className="text-sm font-bold text-slate-900">{item.file_type || 'PDF'}</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 font-semibold uppercase">Dept</div>
                                <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
                                    {item.department || 'GEN'} 
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 relative z-10">
                            <a 
                                href={item.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-center font-bold text-sm hover:bg-purple-600 transition-colors shadow-lg shadow-slate-900/10 group-hover:shadow-purple-600/20 flex items-center justify-center gap-2"
                            >
                                <Download size={16} />
                                Download
                            </a>
                        </div>
                    </>
                )}
                
                </div>
            ))}
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}