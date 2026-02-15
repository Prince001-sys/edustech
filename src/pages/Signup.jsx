import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export default function Signup() {
  const { createUserWithEmail, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    await createUserWithEmail(email, password)
    navigate('/dashboard')
  }

  const handleGoogleSignup = async () => {
    await signInWithGoogle()
    navigate('/dashboard')
  }

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-md mx-auto bg-white border rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" required />
          <Button type="submit" className="w-full bg-blue-600 text-white">Sign Up</Button>
        </form>
        <div className="my-4 text-center text-slate-500">OR</div>
        <Button onClick={handleGoogleSignup} className="w-full border">Google Sign Up</Button>
        <p className="text-center mt-4 text-slate-600">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
      </div>
    </div>
  )
}