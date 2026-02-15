
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { X, UploadCloud, FileText, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { uploadFile } from "@/lib/storage";
import { addResource } from "@/lib/db";

interface UploadResourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadSuccess: () => void;
}

export function UploadResourceModal({ isOpen, onClose, onUploadSuccess }: UploadResourceModalProps) {
    const { user, profile } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        department: profile?.department || "CSE",
        subject: "",
        semester: "1",
        description: "",
        type: "Notes" // Notes, PYQ, Book, etc.
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !user) return;

        setIsUploading(true);
        try {
            // 1. Upload File
            const path = `resources/${formData.department}/${formData.semester}/${Date.now()}_${file.name}`;
            const downloadURL = await uploadFile(file, path);

            // 2. Save Metadata to Firestore
            await addResource({
                userId: user.uid,
                author: user.displayName || "Anonymous",
                title: formData.title,
                description: formData.description,
                type: formData.type,
                subject: formData.subject,
                semester: parseInt(formData.semester),
                department: formData.department,
                fileType: file.name.split('.').pop()?.toUpperCase() || "FILE",
                size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
                downloads: 0,
                rating: 0,
                verified: false, // Default to unverified
                downloadURL: downloadURL
            });

            onUploadSuccess();
            onClose();
            setFile(null);
            setFormData({
                title: "",
                department: profile?.department || "CSE",
                subject: "",
                semester: "1",
                description: "",
                type: "Notes"
            });
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload resource. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-2xl shadow-xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold text-white">Upload Resource</h2>
                            <button onClick={onClose} className="text-white/50 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* File Input */}
                            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer relative group">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    required
                                />
                                {file ? (
                                    <div className="flex flex-col items-center">
                                        <FileText className="text-blue-400 mb-2" size={32} />
                                        <span className="font-bold text-white">{file.name}</span>
                                        <span className="text-xs text-white/50">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-white/50 group-hover:text-white/80">
                                        <UploadCloud className="mb-2" size={32} />
                                        <span className="font-medium">Click to browse or drag file here</span>
                                        <span className="text-xs mt-1">PDF, DOCX, PPTX (Max 10MB)</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/50 uppercase">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="e.g. Unit 1 Notes"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/50 uppercase">Subject</label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="e.g. Data Structures"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/50 uppercase">Dept</label>
                                    <select
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        {["CSE", "ECE", "ME", "CHE", "MSME"].map(d => <option key={d} value={d} className="bg-[#0f172a]">{d}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/50 uppercase">Sem</label>
                                    <select
                                        value={formData.semester}
                                        onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s} className="bg-[#0f172a]">{s}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/50 uppercase">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        {["Notes", "PYQ", "Book", "Project"].map(t => <option key={t} value={t} className="bg-[#0f172a]">{t}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/50 uppercase">Description (Optional)</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 h-20 resize-none"
                                    placeholder="Add details..."
                                />
                            </div>

                            <Button
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                                disabled={isUploading || !file}
                            >
                                {isUploading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Uploading...
                                    </span>
                                ) : (
                                    "Upload Resource"
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
