import { useState } from 'react'
import { Code2, Play, Search, Filter, TrendingUp, Users, ChevronRight, Star, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const problems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Array',
    acceptance: '48.2%',
    submissions: 8720,
    solved: 4210,
    tags: ['Array', 'Hash Table'],
  },
  {
    id: 2,
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    topic: 'Linked List',
    acceptance: '62.5%',
    submissions: 6450,
    solved: 4031,
    tags: ['Linked List', 'Recursion'],
  },
  {
    id: 3,
    title: 'Binary Tree Traversal',
    difficulty: 'Medium',
    topic: 'Tree',
    acceptance: '55.3%',
    submissions: 5230,
    solved: 2894,
    tags: ['Tree', 'DFS', 'BFS'],
  },
  {
    id: 4,
    title: 'Longest Substring Without Repeating',
    difficulty: 'Medium',
    topic: 'String',
    acceptance: '38.7%',
    submissions: 7180,
    solved: 2780,
    tags: ['String', 'Sliding Window'],
  },
  {
    id: 5,
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    topic: 'Linked List',
    acceptance: '41.2%',
    submissions: 4520,
    solved: 1862,
    tags: ['Linked List', 'Divide & Conquer'],
  },
  {
    id: 6,
    title: 'Regular Expression Matching',
    difficulty: 'Hard',
    topic: 'String',
    acceptance: '29.8%',
    submissions: 3850,
    solved: 1149,
    tags: ['String', 'DP'],
  },
  {
    id: 7,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Stack',
    acceptance: 'Easy',
    submissions: 9210,
    solved: 6447,
    tags: ['Stack', 'String'],
  },
  {
    id: 8,
    title: 'LRU Cache',
    difficulty: 'Medium',
    topic: 'Design',
    acceptance: '42.1%',
    submissions: 4680,
    solved: 1971,
    tags: ['Hash Table', 'Design'],
  },
]

export default function Coding() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.topic.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty
    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-block px-4 py-2 bg-green-100 rounded-full mb-4">
            <span className="text-green-700 font-bold text-sm uppercase tracking-wider">Coding Lab</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-green-600 to-slate-900">
            Master Data Structures
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Interactive platform to practice coding problems across all difficulty levels
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-3 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search problems by name or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-green-500 outline-none appearance-none font-bold text-slate-700"
            >
              <option value="All">All Levels</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Problem</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Difficulty</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Acceptance</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProblems.map((problem) => (
                  <tr key={problem.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-transparent"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-bold text-slate-800 group-hover:text-green-600 transition-colors">
                          {problem.id}. {problem.title}
                        </div>
                        <div className="flex gap-2 mt-1">
                          {problem.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-black uppercase px-2 py-1 rounded-md ${
                        problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-600">{problem.acceptance}</div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all">
                        Solve <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProblems.length === 0 && (
            <div className="py-20 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-800">No problems found</h3>
              <p className="text-slate-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}