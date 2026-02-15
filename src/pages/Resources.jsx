import { useState, useEffect } from 'react'
import { BookOpen, Search, FileText, ChevronRight, ArrowLeft, Download, Video, UploadCloud, Book, ScrollText, ExternalLink, Calendar, GraduationCap, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { departments } from '../data/departments'
import { getAcademicCalendar, getAllResources } from '../lib/db'
const resourceTypes = [
  { name: 'Lecture Notes', icon: '📝', count: 'Unit-wise PDFs', sub: 'and handwritten notes', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  { name: 'PYQs', icon: '📋', count: 'Previous Year', sub: 'with solutions', color: 'bg-green-50 text-green-700 border-green-100' },
  { name: 'Video Lectures', icon: '🎥', count: 'Curated Playlists', sub: 'YouTube & NPTEL', color: 'bg-purple-50 text-purple-700 border-purple-100' },
  { name: 'Syllabus & Books', icon: '📚', count: 'Official Syllabus', sub: '& recommended books', color: 'bg-orange-50 text-orange-700 border-orange-100' },
]

const quickLinks = [
    { title: 'Result Portal', icon: GraduationCap, color: 'text-blue-600 bg-blue-50', link: 'http://results.csjmu.ac.in/' },
    { title: 'ERP Login', icon: Globe, color: 'text-purple-600 bg-purple-50', link: 'https://erp.csjmu.ac.in/' },
    { title: 'Academic Calendar', icon: Calendar, color: 'text-orange-600 bg-orange-50', link: '/calendar' }, // Link to a new calendar page or modal
    { title: 'University Website', icon: ExternalLink, color: 'text-slate-600 bg-slate-50', link: 'https://csjmu.ac.in/' },
]
export default function Resources() {
  const [selectedDept, setSelectedDept] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState(3) // Default to Sem 3 as requested for demo
  const [searchQuery, setSearchQuery] = useState('')
  const [calendar, setCalendar] = useState([])
  const [allResources, setAllResources] = useState([])

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [calData, resData] = await Promise.all([
                getAcademicCalendar(),
                getAllResources()
            ])
            setCalendar(calData || [])
            setAllResources(resData || [])
        } catch (err) {
            console.error('Failed to fetch resource data:', err)
        }
    }
    fetchData()
  }, [])

  const filteredDepts = departments.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getResource = (subjectName, type) => {
    return allResources.find(r => 
        r.title?.toLowerCase().includes(subjectName.toLowerCase()) && 
        r.category?.toLowerCase() === type.toLowerCase()
    )
  }

  // Get subjects for selected department and semester
  const currentSubjects = selectedDept 
    ? selectedDept.semesters.find(s => s.id === selectedSemester)?.subjects || [] 
    : []

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedDept ? (
            <motion.div
              key="department-list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Header */}
              <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 rounded-full mb-4">
                  <GraduationCap size={16} className="text-blue-600" />
                  <span className="text-blue-700 font-bold text-xs tracking-wider uppercase">Official Student Portal</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
                  UIET <span className="text-blue-600">Resources Hub</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                   All your academic needs in one place: Syllabus, Notes, PYQs, and Video Lectures.
                </p>
                
                {/* Quick Links Dashboard */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 mb-16">
                    {quickLinks.map((link, i) => (
                        <a 
                            key={i} 
                            href={link.link}
                            className="flex flex-col items-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                <link.icon size={24} />
                            </div>
                            <span className="font-bold text-slate-700 text-sm group-hover:text-blue-600 transition-colors">{link.title}</span>
                        </a>
                    ))}
                </div>

                {/* Resource Stats/Types */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                  {resourceTypes.map((type, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + (0.05 * i) }}
                      className={`p-4 rounded-2xl text-center border ${type.color} bg-opacity-50`}
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <div className="font-bold text-slate-900">{type.name}</div>
                      <div className="text-xs font-semibold opacity-80 mt-1">{type.count}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Departments Grid */}
              <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                     <h2 className="text-3xl font-bold text-slate-900">Select Department</h2>
                     <p className="text-slate-500 font-medium">Choose your branch to access specific resources</p>
                </div>
                
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search departments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-sm bg-white shadow-sm transition-all"
                    />
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {filteredDepts.map((dept, i) => {
                  const Icon = dept.icon
                  return (
                    <motion.div
                      key={dept.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
                      onClick={() => setSelectedDept(dept)}
                    >
                      {/* Gradient Backdrop */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${dept.color} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150`}></div>
                      
                      <div className="flex items-start justify-between mb-6 relative z-10">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dept.color} text-white flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform`}>
                            <Icon size={28} />
                        </div>
                        <div className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-slate-200">
                            {dept.id}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors relative z-10">{dept.name}</h3>
                      <p className="text-sm text-slate-500 font-medium mb-6 relative z-10">{dept.description}</p>
                      
                      <div className="flex items-center gap-3 mt-auto relative z-10">
                        <button className="flex-1 bg-slate-900 text-white text-sm font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10">
                            <span>Access Resources</span>
                            <ChevronRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Share Notes Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 text-center relative overflow-hidden shadow-lg"
              >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  <div className="relative z-10 max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
                        <UploadCloud size={40} />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Have Notes to Share?</h2>
                    <p className="text-xl text-slate-600 mb-10 font-medium">
                        Help your juniors by uploading your handwritten notes, solved papers, or study materials. 
                        Get credited on the site and help build a better resource library!
                    </p>
                    <button className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 text-lg flex items-center mx-auto gap-2">
                        <UploadCloud size={24} />
                        Upload Materials
                    </button>
                  </div>
              </motion.div>

            </motion.div>
          ) : (
            <motion.div
              key="resource-list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <button 
                onClick={() => setSelectedDept(null)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-colors group bg-white px-4 py-2 rounded-xl border border-slate-200 hover:border-slate-300 w-fit"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                    <ArrowLeft size={16} />
                </div>
                Back to Departments
              </button>

              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${selectedDept.color} opacity-10 rounded-bl-full -mr-10 -mt-10 pointer-events-none`}></div>
                
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedDept.color} text-white flex items-center justify-center shadow-lg relative z-10`}>
                  <selectedDept.icon size={40} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">{selectedDept.name}</h2>
                        <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-lg text-sm border border-slate-200">
                          {selectedDept.id}
                        </span>
                    </div>
                  
                  <p className="text-slate-600 font-medium text-lg">{selectedDept.description}</p>
                </div>
                <div className="md:ml-auto flex gap-3 relative z-10">
                    <button className="px-6 py-3 bg-slate-900 text-white border border-slate-900 rounded-xl text-sm font-bold hover:bg-blue-600 hover:border-blue-600 flex items-center gap-2 shadow-lg shadow-slate-900/10 transition-all">
                        <Download size={18} />
                        Download Syllabus
                    </button>
                </div>
              </div>

            {/* Semester Tabs */}
            <div className="flex overflow-x-auto pb-4 mb-8 no-scrollbar gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <button
                        key={sem}
                        onClick={() => setSelectedSemester(sem)}
                        className={`flex-shrink-0 px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                            selectedSemester === sem
                                ? `bg-gradient-to-r ${selectedDept.color} text-white shadow-lg shadow-blue-500/25`
                                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                    >
                        Semester {sem}
                    </button>
                ))}
            </div>

            {/* Subject List */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                <div className="p-8 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-slate-800">
                        Semester {selectedSemester} Subjects
                    </h3>
                    <span className="text-slate-500 font-bold bg-white px-3 py-1 rounded-lg border border-slate-200 text-sm">
                        {currentSubjects.length} Subjects
                    </span>
                </div>
                
                <div className="divide-y divide-slate-100">
                    {currentSubjects.length > 0 ? (
                        currentSubjects.map((subject, idx) => (
                            <div key={idx} className="p-8 hover:bg-slate-50/50 transition-colors group">
                                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                                    {/* Subject Info */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <h4 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                                {subject.name}
                                            </h4>
                                            {subject.code && (
                                                <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">
                                                    {subject.code}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                                                subject.type === 'Core' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                subject.type === 'Lab' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                subject.type === 'Math' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                                {subject.type}
                                            </span>
                                            <span>•</span>
                                            <span>{subject.credits} Credits</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            { label: 'Notes', icon: FileText, color: 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200' },
                                            { label: 'PYQ', icon: ScrollText, color: 'hover:bg-green-50 hover:text-green-600 hover:border-green-200' },
                                            { label: 'Video', icon: Video, color: 'hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200' },
                                            { label: 'Book', icon: Book, color: 'hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200' },
                                        ].map((btn, bIdx) => {
                                            const res = getResource(subject.name, btn.label)
                                            return (
                                                <a
                                                    key={bIdx}
                                                    href={res ? res.file_url : '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 transition-all flex items-center gap-2 ${btn.color} ${!res && 'opacity-40 cursor-not-allowed grayscale'}`}
                                                    onClick={(e) => !res && e.preventDefault()}
                                                >
                                                    <btn.icon size={18} />
                                                    {btn.label}
                                                </a>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-16 text-center text-slate-400">
                            <BookOpen size={64} className="mx-auto mb-6 opacity-20" />
                            <p className="text-xl font-bold text-slate-500 mb-2">No subjects found</p>
                            <p className="text-slate-400">Content for Semester {selectedSemester} is coming soon.</p>
                        </div>
                    )}
                </div>
            </div>
 
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}