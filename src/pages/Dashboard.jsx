import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, BrainCircuit, Code, Rocket, PlayCircle, MessageSquare, Trophy, Target, Clock, Zap, ArrowRight, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const [stats, setStats] = useState({
    streakDays: 12,
    tasksDone: 47,
    hoursLearned: 23.5,
    rank: 128,
  })

  const hubs = [
    {
      title: 'Resource Library',
      icon: <BookOpen className="text-blue-400" size={28} />,
      desc: 'Access syllabus, notes, and PYQs organized by department',
      href: '/resources',
      color: 'bg-blue-500/10 border-blue-500/20',
      count: '600+',
    },
    {
      title: 'AI Tutor',
      icon: <BrainCircuit className="text-purple-400" size={28} />,
      desc: 'Get instant answers to your doubts with AI assistance',
      href: '/ai-tutor',
      color: 'bg-purple-500/10 border-purple-500/20',
      count: '24/7',
    },
    {
      title: 'Coding Lab',
      icon: <Code className="text-green-400" size={28} />,
      desc: 'Practice DSA problems and build real projects',
      href: '/coding',
      color: 'bg-green-500/10 border-green-500/20',
      count: '150+',
    },
    {
      title: 'Career Hub',
      icon: <Rocket className="text-orange-400" size={28} />,
      desc: 'Find internships and launch your career',
      href: '/internships',
      color: 'bg-orange-500/10 border-orange-500/20',
      count: '50+',
    },
    {
      title: 'Community',
      icon: <MessageSquare className="text-pink-400" size={28} />,
      desc: 'Connect with peers and discuss academic topics',
      href: '/community',
      color: 'bg-pink-500/10 border-pink-500/20',
      count: '5K+',
    },
    {
      title: 'Video Vault',
      icon: <PlayCircle className="text-red-400" size={28} />,
      desc: 'Watch curated educational playlists',
      href: '/videos',
      color: 'bg-red-500/10 border-red-500/20',
      count: '200+',
    }
  ]

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-2">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {profile?.name?.split(' ')[0] || user?.displayName?.split(' ')[0] || 'Scholar'}
            </span>! 👋
          </h1>
          <p className="text-white/50 font-medium">
            {profile?.department ? `${profile.department} • ${profile.year}` : 'Continue your learning journey'}
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Study Streak', value: `${stats.streakDays}`, unit: 'Days', icon: <Zap size={20} />, color: 'from-yellow-500 to-yellow-600' },
            { label: 'Tasks Done', value: `${stats.tasksDone}`, unit: 'This month', icon: <Target size={20} />, color: 'from-green-500 to-green-600' },
            { label: 'Hours Learned', value: `${stats.hoursLearned}`, unit: 'Total', icon: <Clock size={20} />, color: 'from-blue-500 to-blue-600' },
            { label: 'Your Rank', value: `#${stats.rank}`, unit: 'Campus-wide', icon: <Trophy size={20} />, color: 'from-purple-500 to-purple-600' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl text-white overflow-hidden relative group`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-sm font-bold uppercase tracking-wider">{stat.label}</span>
                  <div className="bg-white/20 p-2 rounded-lg">{stat.icon}</div>
                </div>
                <div className="text-3xl font-black">{stat.value}</div>
                <div className="text-sm text-white/60 mt-1">{stat.unit}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Hubs */}
        <div>
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
            <TrendingUp className="text-blue-400" /> Your Learning Hubs
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubs.map((hub, i) => (
              <Link key={i} to={hub.href}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`p-6 rounded-2xl border h-full transition-all hover:bg-white/5 ${hub.color} relative group overflow-hidden cursor-pointer`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="mb-4">{hub.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{hub.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed mb-4">{hub.desc}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-blue-400">{hub.count}</span>
                      <div className="bg-white/10 group-hover:bg-white/20 p-2 rounded-lg transition-all">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}