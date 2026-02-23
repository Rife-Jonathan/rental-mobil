import { useState, useEffect } from 'react';
import { fetchBlogs } from '../../services/api';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import { Loader2 } from 'lucide-react';

export default function BlogListing() {
    const { settings } = useSettings();
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchBlogs()
            .then(data => setBlogs(data))
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen py-20 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-secondary mb-4">Latest Insights</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">Tips, news, and guides for your journey from {settings.companyName}.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-10">No recent insights available yet.</div>
                    ) : (
                        blogs.map((blog: any) => (
                            <Link key={blog.id} to={`/blog/${blog.id}`} className="group bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col hover:shadow-lg transition-shadow">
                                <div className="w-full h-56 overflow-hidden">
                                    <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Travel Guide</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                                    <p className="text-gray-600 line-clamp-3 mb-4">{blog.excerpt}</p>
                                    <div className="mt-auto text-sm text-gray-500 font-medium">
                                        {new Date(blog.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
