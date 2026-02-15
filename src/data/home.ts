
import { BookOpen, BrainCircuit, Code, Rocket, Link2, Youtube, GraduationCap } from 'lucide-react';

export const homeData = {
  hero: {
    title: "Study Smarter, Not Harder.",
    subtitle: "Access CSJMU Samarth resources, JustDoPa playlists, UIET notes, and AI-powered doubt solving — all in one premium workspace.",
    ctaPrimary: "GET STARTED",
    ctaPrimaryLink: "/login",
  },
  sectionTitle: "Everything You Need",
  sectionSubtitle: "From 1st Semester to Final Year Placement Prep.",
  features: [
    {
      title: "Resource Hub",
      desc: "Full CSJMU B.Tech Syllabus, Hand-notes & PYQs for all semesters.",
      link: "/resources",
      linkText: "Explore Hub",
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-100",
      badge: "UIET Specific"
    },
    {
      title: "AI Voice Tutor",
      desc: "Ask anything with Voice. Powered by Gemini 1.5 Flash for instant clarity.",
      link: "/ai-tutor",
      linkText: "Start Learning",
      icon: BrainCircuit,
      color: "text-purple-500",
      bg: "bg-purple-100",
      badge: "Live"
    },
    {
      title: "Coding Lab",
      desc: "Interactive DSA challenges and UIET-aligned project ideas.",
      link: "/coding",
      linkText: "Start Coding",
      icon: Code,
      color: "text-green-500",
      bg: "bg-green-100",
      badge: "Real-time"
    },
    {
      title: "Internship Hub",
      desc: "Direct alerts for UIET recruiters like TCS, HCL, & Infosys.",
      link: "/internships",
      linkText: "Find Jobs",
      icon: Rocket,
      color: "text-orange-500",
      bg: "bg-orange-100",
      badge: "Trending"
    },
    {
      title: "Samarth Sync",
      desc: "Quick access to CSJMU Samarth Portal & UIET Notices.",
      link: "https://csjmu.samarth.edu.in/",
      linkText: "Visit Portal",
      icon: Link2,
      color: "text-indigo-500",
      bg: "bg-indigo-100",
      badge: "External",
      external: true
    },
    {
      title: "Video Vault",
      desc: "Curated playlists from JustDoPa & top engineering educators.",
      link: "/videos",
      linkText: "Watch Now",
      icon: Youtube,
      color: "text-red-500",
      bg: "bg-red-100",
      badge: "Exclusive"
    }
  ],
  ctaFooter: {
    title: "Stay Ahead of The Curve.",
    subtitle: "Get instant notifications for UIET exams, Samarth portal updates, and off-campus placements.",
    buttonText: "Join Community",
    buttonLink: "/community"
  }
};
