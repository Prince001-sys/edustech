import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getAllProfiles, getAllResources } from '../lib/db'
import { uploadFile } from '../lib/storage'
import { Wifi, Database, HardDrive, UserCheck, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SystemStatus() {
  const { user, loading: authLoading } = useAuth()
  const [status, setStatus] = useState({ firestore: 'checking', storage: 'checking', network: 'checking' })
  const [latency, setLatency] = useState(null)

  useEffect(() => {
    const checkSystem = async () => {
      const start = Date.now()
      try {
        await getAllProfiles()
        setStatus(prev => ({ ...prev, firestore: 'operational' }))
      } catch (e) {
        setStatus(prev => ({ ...prev, firestore: 'degraded' }))
      }
      try {
        await getAllResources()
        setStatus(prev => ({ ...prev, storage: 'operational' }))
      } catch (e) {
        setStatus(prev => ({ ...prev, storage: 'error' }))
      }
      setStatus(prev => ({ ...prev, network: navigator.onLine ? 'online' : 'offline' }))
      setLatency(Date.now() - start)
    }
    checkSystem()
  }, [])

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <AlertTriangle className="text-amber-500" /> System Diagnostics
        </h1>
        <div className="grid md:grid-cols-2 gap-4">
          {[{ icon: UserCheck, label: 'Auth', value: user?.displayName || 'Not logged in', s: 'operational' },
            { icon: Database, label: 'Database', s: status.firestore },
            { icon: HardDrive, label: 'Storage', s: status.storage },
            { icon: Wifi, label: 'Network', value: latency ? `${latency}ms` : 'Checking...', s: status.network }
          ].map(({ icon: Icon, label, value, s }, i) => (
            <motion.div key={i} className="p-4 bg-white border rounded-lg hover:shadow-lg">
              <div className="flex items-center gap-3">
                <Icon className="text-blue-600" />
                <div>
                  <p className="font-bold">{label}</p>
                  <p className={`text-sm ${s === 'operational' || s === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                    {value || s.toUpperCase()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}