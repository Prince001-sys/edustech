export type ResourceType = "Notes" | "PYQ" | "Video" | "Book";

export interface Unit {
    title: string;
    topics: string[];
}

export interface Subject {
    code: string;
    name: string;
    type: "Core" | "Lab" | "Elective" | "Math" | "Humanities";
    credits: number;
    image?: string;
    description?: string;
    videoPlaylist?: string;
    notesLink?: string;
    units?: Unit[];
}

export interface SemesterData {
    id: number;
    subjects: Subject[];
}

export interface DepartmentData {
    name: string;
    description: string;
    semesters: SemesterData[];
}

export const commonFirstYear: SemesterData[] = [
    {
        id: 1,
        subjects: [
            { code: "MTH-S101", name: "Mathematics - I", type: "Math", credits: 4 },
            { code: "PHY-S101T", name: "Physics - I", type: "Core", credits: 4 },
            { code: "TCA-S101", name: "Engineering Drawing", type: "Core", credits: 2 },
            { code: "ESC-S101T", name: "Basic Electrical & Electronics Engg", type: "Core", credits: 4 },
            { code: "HSS-S101", name: "Communicative English", type: "Humanities", credits: 3 },
            { code: "PHY-S101P", name: "Physics Lab - I", type: "Lab", credits: 1 },
            { code: "ESC-S101P", name: "Basic Electrical Lab", type: "Lab", credits: 1 },
        ]
    },
    {
        id: 2,
        subjects: [
            { code: "MTH-S102", name: "Mathematics - II", type: "Math", credits: 4 },
            { code: "PHY-S102T", name: "Physics - II", type: "Core", credits: 4 },
            { code: "CHM-S101T", name: "Chemistry - I", type: "Core", credits: 4 },
            { code: "ISC-S101T", name: "Programming & Computing (C & UNIX)", type: "Core", credits: 4 },
            { code: "TCA-S102", name: "Workshop Concepts & Practice", type: "Core", credits: 3 },
            { code: "CHM-S101P", name: "Chemistry Lab - I", type: "Lab", credits: 1 },
            { code: "ISC-S101P", name: "Programming Lab", type: "Lab", credits: 1 },
        ]
    }
];

export const departmentData: Record<string, DepartmentData> = {
    "CSE": {
        name: "Computer Science & Engineering",
        description: "Study of computers, computational systems, algorithms, and software design.",
        semesters: [
            ...commonFirstYear,
            {
                id: 3,
                subjects: [
                    {
                        code: "CS-301",
                        name: "Discrete Structures & Logic",
                        type: "Core",
                        credits: 4,
                        description: "Set theory, relations, functions, graph theory, and propositional logic.",
                        units: [
                            { title: "Set Theory & Relations", topics: ["Sets", "Relations", "Functions"] },
                            { title: "Algebraic Structures", topics: ["Groups", "Subgroups", "Rings"] },
                            { title: "Graph Theory", topics: ["Graphs", "Trees", "coloring"] }
                        ]
                    },
                    {
                        code: "CS-302",
                        name: "Computer Organization & Architecture",
                        type: "Core",
                        credits: 4,
                        videoPlaylist: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRj19gRbrY0BH3qK9l_p8e3g",
                        units: [
                            { title: "Basic Structure of Computers", topics: ["Functional Units", "Bus Structures"] },
                            { title: "Machine Instructions", topics: ["Addressing Modes", "Assembly Language"] }
                        ]
                    },
                    {
                        code: "CS-303",
                        name: "Data Structures",
                        type: "Core",
                        credits: 4,
                        description: "Fundamental data structures and algorithms analysis.",
                        videoPlaylist: "https://www.youtube.com/playlist?list=PLbf3jgZwa8zNq2xK9aD8I5IG0v19wY6b", // NPTEL / Naveen Garg
                        notesLink: "https://nptel.ac.in/courses/106102064",
                        units: [
                            { title: "Introduction", topics: ["Time Complexity", "Space Complexity", "Big-O Notation"] },
                            { title: "Linear Data Structures", topics: ["Arrays", "Linked Lists", "Stacks", "Queues"] },
                            { title: "Non-Linear Data Structures", topics: ["Trees", "Binary Search Trees", "AVL Trees", "Graphs"] },
                            { title: "Sorting & Searching", topics: ["Merge Sort", "Quick Sort", "Heap Sort", "Hashing"] },
                            { title: "Advanced Topics", topics: ["B-Trees", "Graph Algorithms (BFS/DFS)"] }
                        ]
                    },
                    { code: "EC-301", name: "Digital Logic Design", type: "Core", credits: 4 },
                    { code: "MTH-301", name: "Mathematics - III", type: "Math", credits: 4 },
                    { code: "CS-351", name: "Data Structures Lab", type: "Lab", credits: 1 },
                ]
            },
            {
                id: 4,
                subjects: [
                    { code: "CS-401", name: "Operating Systems", type: "Core", credits: 4 },
                    { code: "CS-402", name: "Software Engineering", type: "Core", credits: 4 },
                    { code: "CS-403", name: "Theory of Automata & Computation", type: "Core", credits: 4 },
                    { code: "CS-404", name: "Object Oriented Programming (Java/C++)", type: "Core", credits: 4 },
                    { code: "HSS-401", name: "Industrial Economics", type: "Humanities", credits: 3 },
                    { code: "CS-451", name: "Operating Systems Lab", type: "Lab", credits: 1 },
                ]
            },
            {
                id: 5,
                subjects: [
                    { code: "CS-501", name: "Database Management Systems (DBMS)", type: "Core", credits: 4 },
                    { code: "CS-502", name: "Design & Analysis of Algorithms", type: "Core", credits: 4 },
                    { code: "CS-503", name: "Computer Networks", type: "Core", credits: 4 },
                    { code: "CS-504", name: "Microprocessor & Interfacing", type: "Core", credits: 4 },
                    { code: "CS-551", name: "DBMS Lab", type: "Lab", credits: 1 },
                    { code: "CS-552", name: "Algorithms Lab", type: "Lab", credits: 1 },
                ]
            },
            {
                id: 6,
                subjects: [
                    { code: "CS-601", name: "Compiler Design", type: "Core", credits: 4 },
                    { code: "CS-602", name: "Web Technology", type: "Core", credits: 4 },
                    { code: "CS-603", name: "Artificial Intelligence", type: "Core", credits: 4 },
                    { code: "CS-604", name: "Data Science", type: "Core", credits: 4 },
                    { code: "CS-651", name: "Web Tech Lab", type: "Lab", credits: 1 },
                ]
            },
            {
                id: 7,
                subjects: [
                    { code: "CS-701", name: "Machine Learning", type: "Core", credits: 4 },
                    { code: "CS-702", name: "Cloud Computing", type: "Elective", credits: 3 },
                    { code: "CS-703", name: "Information Security", type: "Elective", credits: 3 },
                    { code: "CS-751", name: "Project Phase - I", type: "Lab", credits: 2 },
                    { code: "CS-752", name: "Industrial Training", type: "Lab", credits: 1 },
                ]
            },
            {
                id: 8,
                subjects: [
                    { code: "CS-801", name: "Deep Learning", type: "Elective", credits: 3 },
                    { code: "CS-802", name: "Big Data Analytics", type: "Elective", credits: 3 },
                    { code: "CS-851", name: "Project Phase - II", type: "Lab", credits: 8 },
                ]
            },
        ]
    },
    "ECE": {
        name: "Electronics & Communication Engineering",
        description: "Focuses on electronic devices, circuits, communication equipment like transmitter, receiver, integrated circuits (IC).",
        semesters: [
            ...commonFirstYear,
            {
                id: 3,
                subjects: [
                    { code: "EC-301", name: "Electronic Devices", type: "Core", credits: 4 },
                    { code: "EC-302", name: "Digital System Design", type: "Core", credits: 4 },
                    { code: "EC-303", name: "Network Analysis & Synthesis", type: "Core", credits: 4 },
                    { code: "EC-304", name: "Signals & Systems", type: "Core", credits: 4 },
                    { code: "MTH-301", name: "Mathematics - III", type: "Math", credits: 4 },
                    { code: "EC-351", name: "Electronics Devices Lab", type: "Lab", credits: 1 },
                ]
            },
            {
                id: 4,
                subjects: [
                    { code: "EC-401", name: "Communication Engineering", type: "Core", credits: 4 },
                    { code: "EC-402", name: "Analog Circuits", type: "Core", credits: 4 },
                    { code: "EC-403", name: "Microprocessors & Microcontrollers", type: "Core", credits: 4 },
                    { code: "EC-404", name: "Electromagnetic Field Theory", type: "Core", credits: 4 },
                    { code: "HSS-401", name: "Industrial Economics", type: "Humanities", credits: 3 },
                    { code: "EC-451", name: "Communication Lab", type: "Lab", credits: 1 },
                ]
            }
        ]
    },
    "ME": {
        name: "Mechanical Engineering",
        description: "Application of engineering, physics, and materials science principles to design, analyze, manufacture, and maintain mechanical systems.",
        semesters: [
            ...commonFirstYear,
            {
                id: 3,
                subjects: [
                    { code: "ME-301", name: "Thermodynamics", type: "Core", credits: 4 },
                    { code: "ME-302", name: "Strength of Materials", type: "Core", credits: 4 },
                    { code: "ME-303", name: "Engineering Mechanics", type: "Core", credits: 4 },
                    { code: "ME-304", name: "Material Science", type: "Core", credits: 3 },
                    { code: "MTH-301", name: "Mathematics - III", type: "Math", credits: 4 },
                    { code: "ME-351", name: "Machine Drawing Lab", type: "Lab", credits: 2 },
                ]
            },
            {
                id: 4,
                subjects: [
                    { code: "ME-401", name: "Applied Thermodynamics", type: "Core", credits: 4 },
                    { code: "ME-402", name: "Fluid Mechanics", type: "Core", credits: 4 },
                    { code: "ME-403", name: "Manufacturing Processes", type: "Core", credits: 4 },
                    { code: "ME-404", name: "Measurement & Instrumentation", type: "Core", credits: 3 },
                    { code: "HSS-401", name: "Industrial Economics", type: "Humanities", credits: 3 },
                    { code: "ME-451", name: "Fluid Mechanics Lab", type: "Lab", credits: 1 },
                ]
            }
        ]
    },
    "CHE": {
        name: "Chemical Engineering",
        description: "Branch of engineering that uses principles of chemistry, physics, mathematics, biology, and economics to efficiently use, produce, design, transport and transform energy and materials.",
        semesters: [
            ...commonFirstYear,
            {
                id: 3,
                subjects: [
                    { code: "CH-301", name: "Chemical Process Calculations", type: "Core", credits: 4 },
                    { code: "CH-302", name: "Fluid Flow Operations", type: "Core", credits: 4 },
                    { code: "CH-303", name: "Chemical Engineering Thermodynamics-I", type: "Core", credits: 4 },
                    { code: "CH-304", name: "Mechanical Operations", type: "Core", credits: 4 },
                    { code: "MTH-301", name: "Mathematics - III", type: "Math", credits: 4 },
                ]
            }
        ]
    },
    "MSME": {
        name: "Materials Science & Metallurgical Engineering",
        description: "Discovery and design of new materials, with a focus on solids; Study of the physical and chemical behavior of metallic elements.",
        semesters: [
            ...commonFirstYear,
            {
                id: 3,
                subjects: [
                    { code: "MM-301", name: "Introduction to Metallurgy", type: "Core", credits: 4 },
                    { code: "MM-302", name: "Phase Diagrams", type: "Core", credits: 4 },
                    { code: "MM-303", name: "Transport Phenomena", type: "Core", credits: 4 },
                    { code: "MM-304", name: "Mechanical Behavior of Materials", type: "Core", credits: 4 },
                    { code: "MTH-301", name: "Mathematics - III", type: "Math", credits: 4 },
                ]
            }
        ]
    },
    "default": {
        name: "Department Overview",
        description: "Detailed curriculum and resources for this engineering stream.",
        semesters: commonFirstYear
    }
};
