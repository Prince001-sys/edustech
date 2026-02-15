import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="pt-40 pb-20 px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-slate-600 mb-8">Page not found</p>
      <Link to="/">
        <Button className="bg-blue-600 text-white">Go Home</Button>
      </Link>
    </div>
  )
}