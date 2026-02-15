import { motion } from 'framer-motion'
import { Shield, Lock, Eye, FileText } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-6">
            <Shield size={48} className="text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-lg text-slate-600">Transparency is our priority. Here's how we handle your data.</p>
        </motion.div>
        <div className="space-y-8">
          {[
            { icon: <Lock className="text-blue-500" />, title: 'Data Security', content: 'We use industry-standard encryption to protect your personal information. Your data is stored securely.' },
            { icon: <Eye className="text-purple-500" />, title: 'Data Collection', content: 'We only collect essential information required for authentication and personalization.' },
            { icon: <FileText className="text-yellow-500" />, title: 'Usage Policy', content: 'Your data is used solely to enhance your experience. We do not sell or share your information.' }
          ].map((section, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.1 }} className="p-8 bg-white border rounded-lg">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-slate-50 rounded-lg border">{section.icon}</div>
                <div>
                  <h2 className="text-xl font-bold mb-2">{section.title}</h2>
                  <p className="text-slate-600">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}