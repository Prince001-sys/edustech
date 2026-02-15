import { supabase } from './supabase';

// Types
export interface Task {
    id: string;
    userId: string;
    title: string;
    subject: string;
    date: string;
    time: string;
    status: 'pending' | 'completed';
    priority: 'high' | 'medium' | 'low';
    createdAt?: any;
}

export interface Project {
    id: string;
    userId: string;
    author: string;
    title: string;
    description: string;
    thumbnail: string;
    tech: string[];
    stars: number;
    views: number;
    likes: number;
    github: string;
    demo: string | null;
    date: string;
    category: string;
    createdAt?: any;
}

export interface UserProfile {
    uid: string;
    name: string;
    department: string;
    year: string;
    onboardingComplete: boolean;
    points: number;
    studyHours: number;
    lessonsCompleted: number;
    streak: number;
    updatedAt: any;
}

export interface Discussion {
    id: string;
    userId: string;
    author: string;
    title: string;
    content: string;
    tags: string[];
    likes: number;
    replies: number;
    createdAt?: any;
}

export interface Resource {
    id: string;
    userId: string;
    author: string;
    title: string;
    description: string;
    type: string;
    subject: string;
    semester: number;
    department: string;
    fileType: string;
    size: string;
    downloads: number;
    rating: number;
    verified: boolean;
    downloadURL: string;
    createdAt?: any;
}

export interface Activity {
    id: string;
    userId: string;
    author: string;
    action: string;
    link: string;
    createdAt?: any;
}

export interface StudyGroup {
    id: string;
    name: string;
    members: number;
    topic: string;
    active: boolean;
    createdBy: string;
    createdAt?: any;
}

// Helper to handle Supabase errors
const handleResponse = <T>(response: { data: T | null; error: any }, defaultValue?: T): T => {
    if (response.error) {
        console.error('Supabase Error:', response.error);
        throw response.error;
    }
    return (response.data ?? defaultValue) as T;
};

// --- TASKS ---
export const addTask = async (task: Omit<Task, 'id'>) => {
    const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...task }])
        .select()
        .single();
    return handleResponse({ data, error });
};

export const getUserTasks = async (userId: string) => {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('userId', userId);
    return handleResponse({ data: data || [], error });
};

export const updateTaskStatus = async (taskId: string, status: 'pending' | 'completed') => {
    const { error } = await supabase
        .from('tasks')
        .update({ status })
        .eq('id', taskId);
    if (error) throw error;
};

export const deleteTask = async (taskId: string) => {
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);
    if (error) throw error;
};

// --- PROJECTS ---
export const addProject = async (project: Omit<Project, 'id'>) => {
    const { data, error } = await supabase
        .from('projects')
        .insert([{ 
            title: project.title,
            description: project.description,
            department: project.category,
            technologies: project.tech,
            github_link: project.github,
            project_link: project.demo,
            stars_count: project.stars,
            views_count: project.views
        }])
        .select()
        .single();
    return handleResponse({ data, error });
};

export const getAllProjects = async () => {
    const { data, error } = await supabase
        .from('projects')
        .select('*');
    return handleResponse({ data: data || [], error });
};

export const subscribeToProjects = (callback: (projects: any[]) => void) => {
    const subscription = supabase
        .channel('public:projects')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, async () => {
            const projects = await getAllProjects();
            callback(projects);
        })
        .subscribe();
    
    getAllProjects().then(callback);
    return () => supabase.removeChannel(subscription);
};

// --- PROFILES ---
export const getUserProfile = async (uid: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', uid)
        .single();
    return handleResponse({ data, error });
};

export const saveUserProfile = async (uid: string, profile: Partial<UserProfile>) => {
    const { data, error } = await supabase
        .from('profiles')
        .upsert({ id: uid, ...profile })
        .select()
        .single();
    return handleResponse({ data, error });
};

export const getLeaderboard = async (limitCount: number = 10) => {
    const { data, error } = await supabase
        .from('user_stats')
        .select('*, profiles(*)')
        .order('points', { ascending: false })
        .limit(limitCount);
    return handleResponse({ data: data || [], error });
};

// --- STUDY GROUPS ---
export const getAllStudyGroups = async () => {
    const { data, error } = await supabase
        .from('study_groups')
        .select('*');
    return handleResponse({ data: data || [], error });
};

// --- RESOURCES ---
export const getAllResources = async () => {
    const { data, error } = await supabase
        .from('resources')
        .select('*');
    return handleResponse({ data: data || [], error });
};

// --- DATA FETCHERS FOR SPECIFIC PAGES ---
export const getAllInternships = async () => {
    const { data, error } = await supabase
        .from('internships')
        .select('*')
        .order('created_at', { ascending: false });
    return handleResponse({ data: data || [], error });
};

export const getAllBooks = async () => {
    const { data, error } = await supabase
        .from('books')
        .select('*');
    return handleResponse({ data: data || [], error });
};

export const getAcademicCalendar = async () => {
    const { data, error } = await supabase
        .from('academic_calendar')
        .select('*')
        .order('start_date', { ascending: true });
    return handleResponse({ data: data || [], error });
};

export const getAllDiscussions = async () => {
    const { data, error } = await supabase
        .from('discussions')
        .select('*')
        .order('created_at', { ascending: false });
    return handleResponse({ data: data || [], error });
};
