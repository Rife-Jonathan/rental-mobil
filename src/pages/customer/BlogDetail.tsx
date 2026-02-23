import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogById } from '../../services/api';
import { Loader2, ArrowLeft, Calendar } from 'lucide-react';

export default function BlogDetail() {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        fetchBlogById(id)
            .then(data => setBlog(data))
            .catch(err => {
                console.error(err);
                setError('Blog post not found.');
            })
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex justify-center flex-col items-center min-h-[60vh]">
                <Loader2 className="animate-spin text-primary mb-4" size={48} />
                <p className="text-gray-600 font-medium">Loading article...</p>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h2>
                <p className="text-gray-600 mb-8 max-w-md">The article you are looking for might have been removed or is temporarily unavailable.</p>
                <Link to="/blog" className="bg-primary hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2">
                    <ArrowLeft size={18} /> Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Image */}
            <div className="w-full h-[40vh] md:h-[50vh] relative">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover" />
            </div>

            {/* Content Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <div className="flex items-center gap-4 text-sm font-medium text-gray-500 mb-6">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider text-xs">Travel Guide</span>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={16} />
                            {new Date(blog.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">{blog.title}</h1>

                    <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-primary whitespace-pre-wrap">
                        {blog.content}
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-blue-800 font-medium transition-colors">
                            <ArrowLeft size={18} /> Back to all articles
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
