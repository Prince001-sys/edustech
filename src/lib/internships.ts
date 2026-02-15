export interface Internship {
    id: string;
    company: string;
    role: string;
    type: "Internship" | "Apprentice" | "Full-time";
    category: "SDE" | "Core" | "Research" | "Data Science";
    location: string;
    deadline?: string;
    applyLink: string;
    description: string;
    lastDate?: string;
}

export const realInternships: Internship[] = [
    {
        id: "csjmu-cse-2025",
        company: "CSJMU Kanpur (CSE Dept)",
        role: "Research & Development Intern",
        type: "Internship",
        category: "Research",
        location: "Kanpur (In-Campus)",
        lastDate: "December 15, 2025",
        applyLink: "https://csjmu.ac.in",
        description: "Join the CSE department research cell to work on cutting-edge academic projects."
    },
    {
        id: "csjmu-support-2026",
        company: "Student Support Cell, CSJMU",
        role: "Student Support Intern",
        type: "Internship",
        category: "SDE",
        location: "Kanpur (In-Campus)",
        lastDate: "January 17, 2026",
        applyLink: "https://csjmu.ac.in",
        description: "Develop and manage digital student support systems for the university."
    },
    {
        id: "iitk-surge-2025",
        company: "IIT Kanpur",
        role: "SURGE Research Intern",
        type: "Internship",
        category: "Research",
        location: "Kanpur",
        lastDate: "March 2025",
        applyLink: "https://surge.iitk.ac.in",
        description: "Prestigious summer undergraduate research program at IIT Kanpur."
    },
    {
        id: "google-step-2025",
        company: "Google India",
        role: "STEP Intern (2025)",
        type: "Internship",
        category: "SDE",
        location: "Bangalore/Hyderabad",
        applyLink: "https://buildyourfuture.withgoogle.com/programs/step",
        description: "Student Training in Engineering Program (STEP) for first and second-year students."
    },
    {
        id: "tcs-nqt-2025",
        company: "TCS",
        role: "Systems Engineer (Intern/FullTime)",
        type: "Full-time",
        category: "Core",
        location: "Pan India",
        applyLink: "https://www.tcs.com/careers/nqt",
        description: "National Qualifier Test for 2024/2025 graduates."
    },
    {
        id: "flipkart-grid-2025",
        company: "Flipkart",
        role: "GRiD 6.0 Challenge",
        type: "Internship",
        category: "SDE",
        location: "Remote/Bangalore",
        applyLink: "https://unstop.com/hackathons/flipkart-grid-60-software-development-track-flipkart-1033230",
        description: "Flipkart's flagship engineering campus challenge leading to internship/SDE offers."
    }
];
