import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
  ExternalLink
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { homeData } from '../data/home'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-sm mb-8 animate-fade-in-up">
                <Sparkles size={16} />
                <span>2026 Curriculum Updated</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
              Study Smarter, <br/>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Not Harder.
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {homeData.hero.subtitle}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to={user ? "/dashboard" : homeData.hero.ctaPrimaryLink}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
                  {user ? "Go to Dashboard" : homeData.hero.ctaPrimary}
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 text-sm font-bold text-slate-400">
                TRUSTED BY STUDENTS FROM
            </div>
            <div className="mt-4 flex justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                {/* Mock Logos */}
                <span className="text-xl font-black text-slate-800">UIET</span>
                <span className="text-xl font-black text-slate-800">CSJMU</span>
                <span className="text-xl font-black text-slate-800">HBTU</span>
                <span className="text-xl font-black text-slate-800">IET</span>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900">{homeData.sectionTitle}</h2>
            <p className="text-xl text-slate-600 font-medium">{homeData.sectionSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeData.features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl ${feature.bg} ${feature.color}`}>
                            <Icon size={32} />
                        </div>
                        {feature.badge && (
                            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                                feature.badge === 'Live' ? 'bg-red-100 text-red-600' :
                                feature.badge === 'New' ? 'bg-green-100 text-green-600' :
                                'bg-slate-100 text-slate-600'
                            }`}>
                                {feature.badge}
                            </span>
                        )}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        {feature.desc}
                    </p>
                    
                    {feature.external ? (
                        <a 
                            href={feature.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-blue-600 transition-colors"
                        >
                            {feature.linkText} <ExternalLink size={16} />
                        </a>
                    ) : (
                        <Link 
                            to={feature.link} 
                            className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-blue-600 transition-colors"
                        >
                            {feature.linkText} <ChevronRight size={16} />
                        </Link>
                    )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-24 px-4 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-8 backdrop-blur-sm">
                <Zap className="text-yellow-400 fill-yellow-400" size={32} />
            </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">{homeData.ctaFooter.title}</h2>
          <p className="text-xl md:text-2xl mb-10 opacity-80 max-w-2xl mx-auto leading-relaxed">
            {homeData.ctaFooter.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={homeData.ctaFooter.buttonLink}>
                <Button className="bg-white text-slate-900 hover:bg-blue-50 border-0 font-bold px-10 py-4 rounded-xl text-lg w-full sm:w-auto h-auto transition-transform hover:scale-105">
                {homeData.ctaFooter.buttonText}
                </Button>
            </Link>
             <Link to="/signup">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold px-10 py-4 rounded-xl text-lg w-full sm:w-auto h-auto">
                    Create Account
                </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
