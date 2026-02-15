import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export default function Login() {
  const { signInWithGoogle, signInWithEmail } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    await signInWithEmail(email, password)
    navigate('/dashboard')
  }

  const handleGoogleLogin = async () => {
    await signInWithGoogle()
    navigate('/dashboard')
  }

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-md mx-auto bg-white border rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" required />
          <Button type="submit" className="w-full bg-blue-600 text-white">Login</Button>
        </form>
        <div className="my-4 text-center text-slate-500">OR</div>
        <Button onClick={handleGoogleLogin} className="w-full border">Google Login</Button>
        <p className="text-center mt-4 text-slate-600">Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link></p>
      </div>
    </div>
  )
}