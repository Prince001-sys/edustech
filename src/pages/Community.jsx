import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare, 
  Users, 
  CheckCircle, 
  TrendingUp,
  Plus,
  Search,
  MessageCircle,
  HelpCircle,
  Clock,
  Award,
  Star
} from 'lucide-react'
import { getAllDiscussions, getAllStudyGroups, getLeaderboard } from '../lib/db'

export default function Community() {
  const [activeTab, setActiveTab] = useState('Discussions')
  const [activeFilter, setActiveFilter] = useState('All')
  const [discussions, setDiscussions] = useState([])
  const [studyGroups, setStudyGroups] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [discData, groupsData, leadData] = await Promise.all([
                getAllDiscussions(),
                getAllStudyGroups(),
                getLeaderboard(5)
            ])
            setDiscussions(discData || [])
            setStudyGroups(groupsData || [])
            setLeaderboard(leadData || [])
        } catch (err) {
            console.error('Failed to fetch community data:', err)
        } finally {
            setLoading(false)
        }
    }
    fetchData()
  }, [])

  const stats = [
    { label: 'ACTIVE MEMBERS', value: '1,250', icon: Users, color: 'text-cyan-600' },
    { label: 'DISCUSSIONS', value: discussions.length, icon: MessageSquare, color: 'text-blue-600' },
    { label: 'SOLVED DOUBTS', value: '2,180', icon: CheckCircle, color: 'text-green-600' },
    { label: 'STUDY GROUPS', value: studyGroups.length, icon: TrendingUp, color: 'text-purple-600' },
  ]

  const filters = ['All', 'Study Help', 'Resources', 'Doubt', 'Study Group', 'Project']

  const quickActions = [
      { label: 'Ask a Doubt', icon: MessageCircle, primary: true },
      { label: 'Create Study Group', icon: Users, primary: false },
      { label: 'Browse FAQs', icon: HelpCircle, primary: false },
  ]

  const trending = [
      { tag: '#SIH2024', count: '1.2k posts' },
      { tag: '#EndSemExams', count: '856 posts' },
      { tag: '#Internships', count: '643 posts' },
  ]

  const filteredDiscussions = discussions.filter(d => 
    activeFilter === 'All' || d.tags?.includes(activeFilter)
  )

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600">
                        <Users size={24} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Community Platform</h1>
                </div>
                <p className="text-slate-500 font-medium ml-1">Connect with peers, ask doubts, and collaborate on projects</p>
            </div>
            <button className="px-6 py-2.5 bg-[#0089a7] hover:bg-[#00758f] text-white font-bold rounded-lg shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2">
                <Plus size={18} />
                New Discussion
            </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
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

        {/* Main Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Column (Content) */}
            <div className="lg:col-span-8">
                
                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-slate-200 pb-1">
                    {['Discussions', 'Study Groups', 'Leaderboard'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 ${
                                activeTab === tab 
                                    ? 'text-[#0089a7] border-[#0089a7] bg-cyan-50/50' 
                                    : 'text-slate-500 border-transparent hover:text-slate-700'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Discussions View */}
                {activeTab === 'Discussions' && (
                  <>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    activeFilter === filter
                                        ? 'bg-cyan-100 text-[#0089a7]'
                                        : 'bg-white text-slate-500 border border-slate-200 hover:border-cyan-200'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                      {loading ? (
                        <div className="p-12 text-center text-slate-400">Loading sessions...</div>
                      ) : filteredDiscussions.length > 0 ? (
                        filteredDiscussions.map((disc, i) => (
                            <motion.div 
                                key={disc.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-cyan-200 transition-all cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-bold">
                                            {disc.author?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">{disc.title}</h4>
                                            <p className="text-xs text-slate-400 font-medium">shared by {disc.author} • {new Date(disc.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {(disc.tags || []).map(t => (
                                            <span key={t} className="px-2 py-1 bg-slate-50 text-[10px] font-bold text-slate-500 rounded uppercase tracking-wider">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 mb-6 line-clamp-2">{disc.content}</p>
                                <div className="flex items-center gap-6 text-slate-400 text-xs font-bold">
                                    <span className="flex items-center gap-1.5"><Star size={14} className="text-amber-500" /> {disc.likes_count || 0} Likes</span>
                                    <span className="flex items-center gap-1.5"><MessageCircle size={14} className="text-blue-500" /> {disc.replies_count || 0} Replies</span>
                                </div>
                            </motion.div>
                        ))
                      ) : (
                        <div className="bg-white rounded-3xl border border-slate-200 border-dashed p-12 flex flex-col items-center justify-center text-center min-h-[300px]">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-300">
                                <MessageSquare size={32} />
                            </div>
                            <h3 className="text-slate-500 font-medium mb-2">No discussions found in this category.</h3>
                            <button className="text-[#0089a7] font-bold text-sm hover:underline">
                                Start the first one!
                            </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Study Groups View */}
                {activeTab === 'Study Groups' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {loading ? (
                             <div className="col-span-full p-12 text-center text-slate-400">Loading units...</div>
                        ) : studyGroups.length > 0 ? (
                            studyGroups.map((group, i) => (
                                <motion.div 
                                    key={group.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-purple-200 transition-all group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                                            <Users size={20} />
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${group.active ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                                            {group.active ? 'LIVE NOW' : 'OFFLINE'}
                                        </span>
                                    </div>
                                    <h4 className="font-black text-slate-800 mb-1 uppercase tracking-tight">{group.name}</h4>
                                    <p className="text-xs text-slate-400 font-bold mb-6 italic">{group.topic}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100" />
                                            ))}
                                            <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500">
                                                +{group.members_count}
                                            </div>
                                        </div>
                                        <button className="text-sm font-bold text-purple-600 hover:underline">Join Room</button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full bg-white rounded-3xl border border-slate-200 border-dashed p-12 flex flex-col items-center justify-center text-center">
                                <Users size={48} className="text-slate-200 mb-4" />
                                <p className="text-slate-500 font-medium">No active study groups found.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Leaderboard View */}
                {activeTab === 'Leaderboard' && (
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Award size={20} className="text-cyan-600" />
                                Top Contributors
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {loading ? (
                                <div className="p-8 text-center text-slate-400">Loading ranks...</div>
                            ) : leaderboard.map((user, i) => (
                                <div key={user.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                                            i === 0 ? 'bg-amber-100 text-amber-600' : 
                                            i === 1 ? 'bg-slate-100 text-slate-500' : 
                                            i === 2 ? 'bg-orange-100 text-orange-600' : 
                                            'text-slate-400'
                                        }`}>
                                            {i + 1}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                                {user.profiles?.full_name?.[0] || 'U'}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-700 text-sm">{user.profiles?.full_name}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user.profiles?.department} • Year {user.profiles?.year}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-black text-cyan-600">{user.points}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Points</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* Quick Actions Card */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                        {quickActions.map((action, i) => (
                            <button 
                                key={i}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${
                                    action.primary 
                                        ? 'bg-[#0089a7] text-white shadow-lg shadow-cyan-500/20 hover:bg-[#00758f]' 
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <action.icon size={18} />
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

                 {/* Trending Topics Card */}
                 <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <TrendingUp size={16} className="text-orange-500" />
                        Trending Topics
                    </h3>
                    <div className="space-y-4">
                        {trending.map((trend, i) => (
                            <div key={i} className="flex justify-between items-center group cursor-pointer">
                                <span className="font-bold text-slate-600 text-sm group-hover:text-[#0089a7] transition-colors">{trend.tag}</span>
                                <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded">{trend.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
      </div>
    </div>
  )
}
