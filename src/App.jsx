import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AeroProvider } from './context/AeroContext'
import { Navbar } from './components/ui/Navbar'
import { Footer } from './components/ui/Footer'

// Import all page components
import HomePage from './pages/Home.jsx'
import DashboardPage from './pages/Dashboard.jsx'
import AITutorPage from './pages/AITutor.jsx'
import AITutorCareerPage from './pages/AITutorCareer.jsx'
import AITutorAnalyticsPage from './pages/AITutorAnalytics.jsx'
import LibraryPage from './pages/Library.jsx'
import PrivacyPage from './pages/Privacy.jsx'
import LoginPage from './pages/Login.jsx'
import SignupPage from './pages/Signup.jsx'
import PracticePage from './pages/Practice.jsx'
import CodingPage from './pages/Coding.jsx'
import CommunityPage from './pages/Community.jsx'
import ResourcesPage from './pages/Resources.jsx'
import SystemStatusPage from './pages/SystemStatus.jsx'
import AboutPage from './pages/About.jsx'
import BooksPage from './pages/Books.jsx'
import EventsPage from './pages/Events.jsx'
import ShowcasePage from './pages/Showcase.jsx'
import InternshipsPage from './pages/Internships.jsx'
import VideosPage from './pages/Videos.jsx'
import NotFoundPage from './pages/NotFound.jsx'

export default function App() {
  return (
    <AuthProvider>
      <AeroProvider>
        <div className="flex flex-col min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/ai-tutor" element={<AITutorPage />} />
              <Route path="/ai-tutor/career" element={<AITutorCareerPage />} />
              <Route path="/ai-tutor/analytics" element={<AITutorAnalyticsPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/coding" element={<CodingPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/system-status" element={<SystemStatusPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/showcase" element={<ShowcasePage />} />
              <Route path="/internships" element={<InternshipsPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AeroProvider>
    </AuthProvider>
  )
}
