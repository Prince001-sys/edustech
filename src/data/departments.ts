
import { Code, Cpu, Lightbulb, Wrench, FlaskConical } from 'lucide-react';

export interface Subject {
  code?: string;
  name: string;
  credits: number;
  type: 'Core' | 'Lab' | 'Elective' | 'Math' | 'Humanities';
}

export interface Semester {
  id: number;
  subjects: Subject[];
}

export interface Department {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  resources: number;
  semesters: Semester[];
}

const commonFirstYear: Semester[] = [
  {
    id: 1,
    subjects: [
      { code: 'PHY-101', name: 'Engineering Physics', credits: 4, type: 'Core' },
      { code: 'MTH-101', name: 'Engineering Mathematics - I', credits: 4, type: 'Math' },
      { code: 'EE-101', name: 'Basic Electrical Engineering', credits: 4, type: 'Core' },
      { code: 'CS-101', name: 'Programming for Problem Solving', credits: 3, type: 'Core' },
      { code: 'ME-101', name: 'Engineering Graphics & Design', credits: 2, type: 'Lab' },
    ]
  },
  {
    id: 2,
    subjects: [
      { code: 'CHM-101', name: 'Engineering Chemistry', credits: 4, type: 'Core' },
      { code: 'MTH-102', name: 'Engineering Mathematics - II', credits: 4, type: 'Math' },
      { code: 'EC-101', name: 'Basic Electronics Engineering', credits: 3, type: 'Core' },
      { code: 'ENG-101', name: 'English & Communication Skills', credits: 2, type: 'Humanities' },
      { code: 'WS-101', name: 'Workshop Practices', credits: 2, type: 'Lab' },
    ]
  }
];

export const departments: Department[] = [
  {
    id: 'CSE',
    name: 'Computer Science',
    icon: Code,
    color: 'from-blue-500 to-blue-600',
    description: '8 Semesters • 40 Subjects',
    resources: 150,
    semesters: [
      ...commonFirstYear,
      {
        id: 3,
        subjects: [
          { code: 'CS-301', name: 'Discrete Structures & Logic', credits: 4, type: 'Core' },
          { code: 'CS-302', name: 'Computer Organization & Architecture', credits: 4, type: 'Core' },
          { code: 'CS-303', name: 'Data Structures', credits: 4, type: 'Core' },
          { code: 'EC-301', name: 'Digital Logic Design', credits: 4, type: 'Core' },
          { code: 'MTH-301', name: 'Mathematics - III', credits: 4, type: 'Math' },
          { code: 'CS-351', name: 'Data Structures Lab', credits: 1, type: 'Lab' },
        ]
      },
      {
        id: 4,
        subjects: [
            { code: 'CS-401', name: 'Operating Systems', credits: 4, type: 'Core' },
            { code: 'CS-402', name: 'Design & Analysis of Algorithms', credits: 4, type: 'Core' },
            { code: 'CS-403', name: 'Database Management Systems', credits: 4, type: 'Core' },
            { code: 'CS-404', name: 'Theory of Computation', credits: 3, type: 'Core' },
            { code: 'CS-451', name: 'DBMS Lab', credits: 1, type: 'Lab' },
        ]
      },
      // Placeholders for 5-8
      ...[5, 6, 7, 8].map(i => ({
        id: i,
        subjects: [
            { code: `CS-${i}01`, name: `Advanced CS Topic ${i}`, credits: 4, type: 'Core' as const },
            { code: `CS-${i}02`, name: `Elective ${i}`, credits: 3, type: 'Elective' as const },
        ]
      }))
    ]
  },
  {
    id: 'CSE-AI',
    name: 'CSE - AI & ML',
    icon: Cpu,
    color: 'from-purple-500 to-purple-600',
    description: '8 Semesters • 37 Subjects',
    resources: 95,
      semesters: [
      ...commonFirstYear,
      {
        id: 3,
        subjects: [
          { code: 'AI-301', name: 'Introduction to AI', credits: 4, type: 'Core' },
          { code: 'CS-303', name: 'Data Structures', credits: 4, type: 'Core' },
          { code: 'MTH-302', name: 'Probability & Statistics', credits: 4, type: 'Math' },
          { code: 'AI-302', name: 'Python for Data Science', credits: 3, type: 'Core' },
        ]
      },
       ...[4, 5, 6, 7, 8].map(i => ({
        id: i,
        subjects: [
            { code: `AI-${i}01`, name: `Machine Learning ${i}`, credits: 4, type: 'Core' as const },
        ]
      }))
    ]
  },
  {
    id: 'ECE',
    name: 'Electronics & Comm.',
    icon: Lightbulb,
    color: 'from-yellow-500 to-yellow-600',
    description: '8 Semesters • 37 Subjects',
    resources: 120,
    semesters: [
        ...commonFirstYear,
        {
            id: 3,
            subjects: [
                { code: 'EC-301', name: 'Electronic Devices', credits: 4, type: 'Core' },
                { code: 'EC-302', name: 'Digital System Design', credits: 4, type: 'Core' },
                { code: 'EC-303', name: 'Signals & Systems', credits: 4, type: 'Core' },
                { code: 'EC-304', name: 'Network Theory', credits: 3, type: 'Core' },
            ]
        },
         ...[4, 5, 6, 7, 8].map(i => ({
            id: i,
            subjects: [
                { code: `EC-${i}01`, name: `Communication Systems ${i}`, credits: 4, type: 'Core' as const },
            ]
          }))
    ]
  },
  {
    id: 'ME',
    name: 'Mechanical Engg.',
    icon: Wrench,
    color: 'from-orange-500 to-orange-600',
    description: '8 Semesters • 37 Subjects',
    resources: 110,
    semesters: [
      ...commonFirstYear,
      {
        id: 3,
        subjects: [
          { code: 'ME-301', name: 'Thermodynamics', credits: 4, type: 'Core' },
          { code: 'ME-302', name: 'Strength of Materials', credits: 4, type: 'Core' },
          { code: 'ME-303', name: 'Engineering Mechanics', credits: 4, type: 'Core' },
          { code: 'ME-304', name: 'Material Science', credits: 3, type: 'Core' },
          { code: 'MTH-301', name: 'Mathematics - III', credits: 4, type: 'Math' },
          { code: 'ME-351', name: 'Machine Drawing Lab', credits: 2, type: 'Lab' },
        ]
      },
      ...[4, 5, 6, 7, 8].map(i => ({
        id: i,
        subjects: [
            { code: `ME-${i}01`, name: `Advanced Mechanical ${i}`, credits: 4, type: 'Core' as const },
        ]
      }))
    ]
  },
  {
    id: 'CHE',
    name: 'Chemical Engg.',
    icon: FlaskConical,
    color: 'from-green-500 to-green-600',
    description: '8 Semesters • 37 Subjects',
    resources: 85,
    semesters: [
        ...commonFirstYear,
         ...[3, 4, 5, 6, 7, 8].map(i => ({
            id: i,
            subjects: [
                { code: `CHE-${i}01`, name: `Chemical Process ${i}`, credits: 4, type: 'Core' as const },
            ]
          }))
    ]
  },
  {
    id: 'MSME',
    name: 'Materials Science',
    icon: Wrench,
    color: 'from-red-500 to-red-600',
    description: '8 Semesters • 37 Subjects',
    resources: 72,
    semesters: [
        ...commonFirstYear,
         ...[3, 4, 5, 6, 7, 8].map(i => ({
            id: i,
            subjects: [
                { code: `MS-${i}01`, name: `Material Physics ${i}`, credits: 4, type: 'Core' as const },
            ]
          }))
    ]
  },
];
