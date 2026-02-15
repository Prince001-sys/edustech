import { useState } from 'react'
import { Calendar, MapPin, Users, Clock, ArrowRight, Search } from 'lucide-react'
import { motion } from 'framer-motion'

const events = [
  {
    id: 1,
    title: 'Annual Hackathon 2024',
    date: '15-16 December',
    time: '10:00 AM - 6:00 PM',
    location: 'UIET Campus, Main Auditorium',
    category: 'Hackathon',
    participants: 250,
    prize: '₹2,00,000',
    icon: '🏆',
    desc: 'Build amazing projects in 24 hours with exciting prizes and mentorship',
  },
  {
    id: 2,
    title: 'Google Recruitment Drive',
    date: '10 December',
    time: '9:00 AM - 5:00 PM',
    location: 'UIET Campus, Convention Hall',
    category: 'Recruitment',
    participants: 500,
    prize: 'Internship + FTE',
    icon: '💼',
    desc: 'Direct recruitment drive for SDE and Product Management roles',
  },
  {
    id: 3,
    title: 'Web Development Workshop',
    date: '8 December',
    time: '2:00 PM - 5:00 PM',
    location: 'Online via Zoom',
    category: 'Workshop',
    participants: 300,
    prize: 'Certificate',
    icon: '🎓',
    desc: 'Learn React, Node.js, and MongoDB from industry experts',
  },
  {
    id: 4,
    title: 'Machine Learning Bootcamp',
    date: '20-24 December',
    time: '10:00 AM - 3:00 PM',
    location: 'UIET Campus, Lab Complex',
    category: 'Bootcamp',
    participants: 150,
    prize: 'Certificate + Internship',
    icon: '🤖',
    desc: 'Intensive 5-day course on ML fundamentals and applications',
  },
  {
    id: 5,
    title: 'Amazon Internship Fair',
    date: '18 December',
    time: '11:00 AM - 4:00 PM',
    location: 'UIET Campus, Auditorium',
    category: 'Recruitment',
    participants: 600,
    prize: '3-6 Month Internship',
    icon: '📦',
    desc: 'Explore internship opportunities in AWS, DSA, and Cloud roles',
  },
  {
    id: 6,
    title: 'Coding Contest - CodeFest',
    date: '5 December',
    time: '6:00 PM - 9:00 PM',
    location: 'Online on CodeChef',
    category: 'Contest',
    participants: 1000,
    prize: '₹1,50,000',
    icon: '⚡',
    desc: '3-hour competitive programming contest with live leaderboard',
  },
]

export default function Events() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filtered = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = selectedCategory === 'all' || e.category === selectedCategory
    return matchesSearch && matchesCat
  })

  const categories = [...new Set(events.map(e => e.category))]

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="inline-block px-4 py-2 bg-pink-100 rounded-full mb-4">
            <span className="text-pink-700 font-bold text-sm">CAMPUS EVENTS</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-pink-600 to-slate-800">
            Events & Opportunities
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Stay updated with recruitment drives, hackathons, workshops, and exciting campus events
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: '📅', label: 'Total Events', value: '25+' },
            { icon: '👥', label: 'Active Participants', value: '5K+' },
            { icon: '💰', label: 'Prize Pool', value: '₹5L+' },
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
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {['all', ...categories].map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-pink-600 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {cat === 'all' ? 'All Events' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {filtered.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="bg-white rounded-xl border border-slate-200 hover:border-pink-400 hover:shadow-md transition-all p-6 group"
            >
              <div className="grid md:grid-cols-5 gap-6 items-start">
                {/* Left - Icon & Title */}
                <div className="md:col-span-2 flex gap-4">
                  <div className="text-5xl flex-shrink-0">{event.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-pink-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">{event.desc}</p>
                    <span className="inline-block px-2 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Middle - Details */}
                <div className="md:col-span-2 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar size={16} className="text-pink-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={16} className="text-pink-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin size={16} className="text-pink-600" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users size={16} className="text-pink-600" />
                    <span>{event.participants}+ Registrations</span>
                  </div>
                </div>

                {/* Right - Prize & CTA */}
                <div className="md:col-span-1 flex flex-col items-end justify-between h-full">
                  <div className="text-center">
                    <div className="text-sm font-bold text-slate-600">Prize</div>
                    <div className="text-lg font-bold text-pink-600">{event.prize}</div>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2 group-hover:scale-105">
                    Register
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}