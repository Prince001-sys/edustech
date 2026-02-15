
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, 
  Sparkles, 
  Mic, 
  Send, 
  MoreVertical, 
  BookOpen, 
  GraduationCap, 
  Target, 
  TrendingUp,
  Brain,
  FileText,
  Clock,
  Zap
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useAI } from '../lib/useAI'
import { Link } from 'react-router-dom'
import { MissionCard } from '../components/ai/MissionCard'
import { getUserProfile } from '../lib/db'

// Helper Icons
function DatabaseIcon(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
}

export default function AITutor() {
  const { user } = useAuth()
  const { sendMessage, isLoading, error: aiError } = useAI()
  const [query, setQuery] = useState('')
  const [profile, setProfile] = useState(null)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'System ready. Initiate first mission or ask me anything.' }
  ])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (user?.uid) {
        getUserProfile(user.uid).then(setProfile).catch(console.error)
    }
  }, [user])

  const stats = [
    { label: 'Mastery', value: (profile?.lessonsCompleted ? Math.min(Math.round((profile.lessonsCompleted / 50) * 100), 100) : 0) + '%', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Knowledge Assets', value: profile?.points ? Math.floor(profile.points / 10) : '0', icon: DatabaseIcon, color: 'text-blue-500' },
    { label: 'Checkpoints', value: profile?.streak || '0', icon: Target, color: 'text-purple-500' },
    { label: 'Study Hours', value: profile?.studyHours || '0', icon: Clock, color: 'text-orange-500' },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!query.trim() || isLoading) return

    const userMsg = { role: 'user', content: query }
    setMessages(prev => [...prev, userMsg])
    setQuery('')

    // Stream response
    let assistantMsg = { role: 'assistant', content: '' }
    setMessages(prev => [...prev, assistantMsg])

    await sendMessage(
      userMsg.content,
      messages.slice(0, -1), // History
      (chunk) => {
        setMessages(prev => {
           const newMessages = [...prev]
           newMessages[newMessages.length - 1].content = chunk // Update last message
           return newMessages
        })
      },
      () => {
        // Complete
      },
      user?.uid
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 sticky top-28">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-500/30">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900 leading-tight">Aero AI</h2>
                        <span className="text-xs font-medium text-slate-500">Student Profile</span>
                    </div>
                </div>

                <nav className="space-y-1">
                    {[
                        { name: 'Doubt Solver', icon: Sparkles, active: true },
                        { name: 'Notes Gen', icon: FileText, link: '/ai-tutor/notes' },
                        { name: 'Mock Tests', icon: Clock, link: '/ai-tutor/tests' },
                        { name: 'Flashcards', icon: Zap, link: '/ai-tutor/flashcards' },
                        { name: 'Study Planner', icon: BookOpen, link: '/ai-tutor/planner' },
                        { name: 'Analytics', icon: TrendingUp, link: '/ai-tutor/analytics' },
                        { name: 'Career AI', icon: GraduationCap, link: '/ai-tutor/career' },
                    ].map((item, i) => (
                        item.link ? (
                            <Link 
                                key={i} 
                                to={item.link}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                    item.active 
                                    ? 'bg-blue-50 text-blue-600' 
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <item.icon size={18} />
                                {item.name}
                            </Link>
                        ) : (
                            <button
                                key={i}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                    item.active 
                                    ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <item.icon size={18} />
                                {item.name}
                            </button>
                        )
                    ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <h4 className="font-bold text-sm mb-1">Upgrade to Pro</h4>
                        <p className="text-xs opacity-70 mb-3">Get unlimited queries & advanced models.</p>
                        <button className="w-full py-2 bg-white text-slate-900 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors">
                            View Plans
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-6">
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200">
                        <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10 w-fit mb-3`}>
                            <stat.icon size={20} className={stat.color.replace('text-', '')} />
                        </div>
                        <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Mission Control Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                <MissionCard 
                    title="Generate Notes"
                    desc="Turn any topic or PDF into structured mastery notes."
                    icon={FileText}
                    link="/ai-tutor/notes"
                    color="text-blue-500"
                    delay={0.1}
                />
                <MissionCard 
                    title="Take Mock Test"
                    desc="Adaptive testing based on your personal knowledge graph."
                    icon={Clock}
                    link="/ai-tutor/tests"
                    color="text-purple-500"
                    delay={0.2}
                />
                <MissionCard 
                    title="Career Roadmap"
                    desc="Forge your path to top engineering roles with AI."
                    icon={GraduationCap}
                    link="/ai-tutor/career"
                    color="text-orange-500"
                    delay={0.3}
                />
                 <MissionCard 
                    title="Performance"
                    desc="Analyze strengths and eliminate weak topics."
                    icon={TrendingUp}
                    link="/ai-tutor/analytics"
                    color="text-green-500"
                    delay={0.4}
                />
            </div>

            {/* Chat Interface */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="font-bold text-sm text-slate-700">Direct Query</span>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical size={18} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                             <div className={`flex items-start gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    msg.role === 'user' ? 'bg-slate-900 text-white' : 'bg-blue-100 text-blue-600'
                                }`}>
                                    {msg.role === 'user' ? <span className="text-xs font-bold">U</span> : <Bot size={16} />}
                                </div>
                                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                                    msg.role === 'user' 
                                    ? 'bg-slate-900 text-white rounded-tr-none' 
                                    : 'bg-slate-100 text-slate-800 rounded-tl-none'
                                }`}>
                                    {msg.content}
                                </div>
                            </div>
                        </div>
                    ))}
                     <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-slate-100 bg-white">
                    <form onSubmit={handleSend} className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask detailed questions..."
                            className="w-full pl-4 pr-24 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                            disabled={isLoading}
                        />
                         <div className="absolute right-2 top-2 flex items-center gap-1">
                            <button type="button" className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                                <Mic size={18} />
                            </button>
                            <button 
                                type="submit" 
                                disabled={!query.trim() || isLoading}
                                className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/20"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </form>
                    <div className="mt-2 text-center">
                        <p className="text-[10px] text-slate-400 font-medium">
                            Powered by Aero Brain • Gemini 1.5 Flash
                        </p>
                    </div>
                </div>
            </div>

            {/* Pro Tip */}
             <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white flex items-start gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                    <LightbulbIcon className="text-yellow-300" size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-sm mb-1">Aero AI Protip</h4>
                    <p className="text-xs opacity-90 leading-relaxed">
                        "Mixed-subject testing increases long-term retention by 40% compared to blocked study sessions."
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}

function LightbulbIcon(props) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
}