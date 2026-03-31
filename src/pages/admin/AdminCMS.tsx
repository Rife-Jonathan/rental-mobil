import { useEffect, useState } from 'react';
import { fetchBlogs, deleteBlog, createBlog, uploadImage } from '../../services/api';
import { Edit, Trash2, Plus, Loader2, X, Upload } from 'lucide-react';

export default function AdminCMS() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [newBlog, setNewBlog] = useState({
        title: '',
        excerpt: '',
        content: '',
        thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000'
    });

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        setIsLoading(true);
        try {
            const data = await fetchBlogs();
            setBlogs(data);
        } catch (error) {
            console.error("Failed to load blogs", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;
        try {
            await deleteBlog(id);
            setBlogs(blogs.filter(b => b.id !== id));
        } catch (error) {
            console.error("Failed to delete blog", error);
        }
    };

    const handleAddBlog = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createBlog(newBlog);
            setIsAddModalOpen(false);
            setNewBlog({ title: '', excerpt: '', content: '', thumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000' });
            loadBlogs(); // Refresh array
        } catch (error) {
            console.error("Failed to add blog", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[50vh]">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">CMS / Blog Management</h1>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    <Plus size={18} /> New Blog Post
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
                                <th className="p-4">Post Title</th>
                                <th className="p-4">Published Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {blogs.map((blog) => (
                                <tr key={blog.id} className="hover:bg-gray-50">
                                    <td className="p-4 flex items-center gap-4">
                                        <img src={blog.thumbnail} alt={blog.title} className="w-16 h-12 object-cover rounded" />
                                        <span className="font-medium text-gray-900 line-clamp-1">{blog.title}</span>
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        {new Date(blog.publishedAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right space-x-3">
                                        <button className="text-blue-600 hover:text-blue-800" title="Edit Post"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(blog.id)} className="text-red-500 hover:text-red-700" title="Delete Post"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Blog Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Add New Blog Post</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleAddBlog} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input required type="text" value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                                <input required type="text" value={newBlog.excerpt} onChange={e => setNewBlog({ ...newBlog, excerpt: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                <textarea required value={newBlog.content} onChange={e => setNewBlog({ ...newBlog, content: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none h-32"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                                    <span>Thumbnail URL</span>
                                    {isUploading && <span className="text-primary text-xs flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Uploading...</span>}
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <label className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-lg px-3 py-2 cursor-pointer flex items-center gap-2 transition-colors">
                                        <Upload size={16} /> Upload File
                                        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setIsUploading(true);
                                                try {
                                                    const res = await uploadImage(e.target.files[0]);
                                                    setNewBlog({ ...newBlog, thumbnail: res.url });
                                                } catch (err) {
                                                    alert('Image upload failed');
                                                } finally {
                                                    setIsUploading(false);
                                                }
                                            }
                                        }} />
                                    </label>
                                    <input required type="text" value={newBlog.thumbnail} onChange={e => setNewBlog({ ...newBlog, thumbnail: e.target.value })} className="flex-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none" />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                                    {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                                    Publish
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
