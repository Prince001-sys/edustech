import { useState } from 'react'
import { BookOpen, Play, CheckCircle, Clock, Target, Search } from 'lucide-react'
import { motion } from 'framer-motion'

const practiceSets = [
  {
    id: 1,
    category: 'Arrays & Hashing',
    problems: 25,
    completed: 18,
    difficulty: '⭐⭐',
    duration: '15-20 min',
    desc: 'Master arrays, hash tables, and their applications',
    problems_desc: '25 problems covering array manipulation, searching, sorting',
    icon: '📊',
  },
  {
    id: 2,
    category: 'Linked Lists',
    problems: 20,
    completed: 12,
    difficulty: '⭐⭐',
    duration: '15-18 min',
    desc: 'Linked list operations, reversals, and merging',
    problems_desc: '20 problems on link manipulation and traversal',
    icon: '🔗',
  },
  {
    id: 3,
    category: 'Trees & Graphs',
    problems: 35,
    completed: 10,
    difficulty: '⭐⭐⭐',
    duration: '20-25 min',
    desc: 'Binary trees, BSTs, graphs, and traversals',
    problems_desc: '35 problems on tree structures and graph algorithms',
    icon: '🌳',
  },
  {
    id: 4,
    category: 'Dynamic Programming',
    problems: 30,
    completed: 8,
    difficulty: '⭐⭐⭐',
    duration: '25-30 min',
    desc: 'Master optimization through DP patterns',
    problems_desc: '30 problems from basic to advanced DP concepts',
    icon: '✨',
  },
  {
    id: 5,
    category: 'Strings',
    problems: 22,
    completed: 15,
    difficulty: '⭐⭐',
    duration: '15-20 min',
    desc: 'String manipulation and pattern matching',
    problems_desc: '22 problems on string algorithms and techniques',
    icon: '📝',
  },
  {
    id: 6,
    category: 'Greedy Algorithms',
    problems: 18,
    completed: 16,
    difficulty: '⭐',
    duration: '12-15 min',
    desc: 'Learn greedy strategy problem-solving',
    problems_desc: '18 problems on greedy optimization techniques',
    icon: '🎯',
  },
]

export default function Practice() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const filtered = practiceSets.filter(set => {
    const matchesSearch = set.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDiff = selectedDifficulty === 'all' || set.difficulty === selectedDifficulty
    return matchesSearch && matchesDiff
  })

  const totalProblems = practiceSets.reduce((sum, set) => sum + set.problems, 0)
  const totalCompleted = practiceSets.reduce((sum, set) => sum + set.completed, 0)
  const completionRate = Math.round((totalCompleted / totalProblems) * 100)

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="inline-block px-4 py-2 bg-cyan-100 rounded-full mb-4">
            <span className="text-cyan-700 font-bold text-sm">PRACTICE SETS</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-cyan-600 to-slate-800">
            Guided Practice Paths
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Track your progress with curated problem sets organized by topic and difficulty
          </p>
        </motion.div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: '📚', label: 'Total Problems', value: totalProblems },
            { icon: '✅', label: 'Completed', value: totalCompleted },
            { icon: '📈', label: 'Completion Rate', value: completionRate + '%' },
            { icon: '🔥', label: 'Current Streak', value: '7 days' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
              <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4 bg-white p-6 rounded-xl border border-slate-200">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search practice sets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {['all', '⭐', '⭐⭐', '⭐⭐⭐'].map((diff, i) => (
              <button
                key={i}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {diff === 'all' ? 'All Levels' : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Practice Sets Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((set, i) => {
            const completion = Math.round((set.completed / set.problems) * 100)
            return (
              <motion.div
                key={set.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="bg-white rounded-xl border border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all overflow-hidden group"
              >
                {/* Header with icon */}
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{set.category}</h3>
                    <p className="text-slate-600">{set.desc}</p>
                  </div>
                  <div className="text-5xl">{set.icon}</div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Problems info */}
                  <div className="text-sm text-slate-600">
                    <p>{set.problems_desc}</p>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-slate-700">Progress</span>
                      <span className="text-sm font-bold text-cyan-600">{set.completed}/{set.problems}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completion}%` }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      />
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200">
                    <div className="text-center">
                      <p className="text-xs text-slate-600 mb-1">Difficulty</p>
                      <p className="font-semibold text-slate-800">{set.difficulty}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-600 mb-1">Avg Time</p>
                      <p className="font-semibold text-slate-800 text-sm">{set.duration}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-600 mb-1">Completion</p>
                      <p className="font-semibold text-slate-800">{completion}%</p>
                    </div>
                  </div>

                  {/* Action button */}
                  <button className="w-full mt-4 px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 group-hover:scale-105">
                    <Play size={18} />
                    Continue Practice
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}