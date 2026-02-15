import { motion } from 'framer-motion'
import { Users, Zap, Target, Globe, Heart, Award } from 'lucide-react'

export default function About() {
  const features = [
    { icon: Zap, title: 'AI-Powered Tutoring', desc: 'Personalized learning with intelligent assistance' },
    { icon: Target, title: 'Smart Goals', desc: 'Track progress and achieve your learning objectives' },
    { icon: Users, title: 'Community Support', desc: 'Connect with peers and share knowledge' },
    { icon: Globe, title: 'Global Access', desc: 'Learn anywhere, anytime with cloud-based platform' },
    { icon: Heart, title: 'Student-Centric', desc: 'Built by students, for students' },
    { icon: Award, title: 'Quality Content', desc: 'Curated resources from top educators' },
  ]

  const team = [
    { name: 'Arjun Sharma', role: 'Founder & CEO', emoji: '👨‍💼' },
    { name: 'Priya Singh', role: 'CTO', emoji: '👩‍💻' },
    { name: 'Rajesh Kumar', role: 'Content Lead', emoji: '👨‍🎓' },
    { name: 'Neha Gupta', role: 'Community Manager', emoji: '👩‍🤝‍👨' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Heroes */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-24 pb-16 px-4 text-center">
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-blue-600 to-slate-800">
          About Aerophysics
        </h1>
        <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Revolutionizing education through AI-powered learning and community-driven excellence
        </p>
      </motion.div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl border border-slate-200 p-8 mb-16">
          <h2 className="text-4xl font-bold mb-6 text-slate-800">Our Mission</h2>
          <p className="text-xl text-slate-700 leading-relaxed mb-4">
            Aerophysics is an AI-powered study platform built by students, for students. We aim to democratize high-quality education by combining cutting-edge technology with community-driven support.
          </p>
          <p className="text-lg text-slate-600">
            Whether you're preparing for exams, building your portfolio, or launching your career, Aerophysics provides the tools, resources, and community you need to succeed.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-12 text-slate-800 text-center\">Why Choose Aerophysics?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <Icon className="text-blue-600 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: '👥', label: 'Active Users', value: '50K+' },
            { icon: '📚', label: 'Resources', value: '1000+' },
            { icon: '🚀', label: 'Features', value: '20+' },
            { icon: '⭐', label: 'Avg Rating', value: '4.8/5' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center border border-slate-200"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
              <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-slate-200 p-8">
          <h2 className="text-4xl font-bold mb-12 text-slate-800 text-center\">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-lg font-bold text-slate-800">{member.name}</h3>
                <p className="text-slate-600">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16 text-center">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl transition-all hover:scale-105">
            Join Our Community
          </button>
        </motion.div>
      </div>
    </div>
  )
}