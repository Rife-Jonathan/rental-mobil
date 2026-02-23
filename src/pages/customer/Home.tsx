import { Link } from 'react-router-dom';
import { fetchVehicles, fetchBlogs } from '../../services/api';
import { ChevronDown, ChevronRight, Calendar, Users, Fuel, Gauge, Search, ShieldCheck, Clock, CreditCard } from 'lucide-react';

const IconMap = {
    ShieldCheck,
    Clock,
    CreditCard
};
import { useState, useEffect } from 'react';
import { Vehicle, BlogPost } from '../../types';
import { useSettings } from '../../context/SettingsContext';

export default function Home() {
    const { settings } = useSettings();
    const ld = settings.landingPage;
    const [popularVehicles, setPopularVehicles] = useState<Vehicle[]>([]);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    useEffect(() => {
        const loadHomePageData = async () => {
            try {
                const [vData, bData] = await Promise.all([
                    fetchVehicles(),
                    fetchBlogs()
                ]);
                setPopularVehicles(vData.slice(0, 3));
                setBlogs(bData.slice(0, 2));
            } catch (error) {
                console.error("Error loading home page data", error);
            }
        };

        loadHomePageData();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[650px] flex justify-center pt-32 pb-48">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503376762369-2f22b8d009fa?auto=format&fit=crop&q=80&w=1920')" }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative z-10 text-center text-white px-4 max-w-4xl w-full">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">{ld.heroTitle}</h1>
                    <p className="text-xl mb-12 text-gray-100 drop-shadow-md">{ld.heroSubtitle}</p>
                </div>
            </section>

            {/* Overlapping Search Widget */}
            <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
                <div className="bg-secondary rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-6 relative overflow-hidden">
                    {/* Decorative Background Circles */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary opacity-10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="flex-1 relative z-10">
                        <label className="block text-sm font-semibold text-white mb-2">Brand</label>
                        <select className="w-full bg-white border-0 rounded-lg p-3.5 text-gray-800 outline-none focus:ring-2 focus:ring-primary">
                            <option>Semua Brand</option>
                            <option>Toyota</option>
                            <option>Honda</option>
                        </select>
                    </div>
                    <div className="flex-1 relative z-10">
                        <label className="block text-sm font-semibold text-white mb-2">Transmisi</label>
                        <select className="w-full bg-white border-0 rounded-lg p-3.5 text-gray-800 outline-none focus:ring-2 focus:ring-primary">
                            <option>Semua Transmisi</option>
                            <option>Automatic (AT)</option>
                            <option>Manual (MT)</option>
                        </select>
                    </div>
                    <div className="flex-1 relative z-10">
                        <label className="block text-sm font-semibold text-white mb-2">Tahun</label>
                        <select className="w-full bg-white border-0 rounded-lg p-3.5 text-gray-800 outline-none focus:ring-2 focus:ring-primary">
                            <option>Semua Tahun</option>
                            <option>2023 - 2024</option>
                            <option>2020 - 2022</option>
                            <option>Under 2020</option>
                        </select>
                    </div>
                    <div className="flex items-end relative z-10">
                        <Link to="/vehicles" className="w-full md:w-auto bg-primary hover:brightness-90 text-white font-bold py-3.5 px-8 rounded-lg shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            <Search size={20} />
                            Cari Sekarang
                        </Link>
                    </div>
                </div>
            </div>

            {/* Benefit Point (Why Choose Us) */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{ld.benefitTitle}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">{ld.benefitSubtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {ld.benefits && ld.benefits.map((benefit, index) => {
                            const IconComponent = IconMap[benefit.icon as keyof typeof IconMap] || ShieldCheck;
                            return (
                                <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform ${index % 2 === 0 ? 'rotate-3' : '-rotate-3'} ${index === 0 ? 'bg-blue-100 text-primary' : index === 1 ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-600'}`}>
                                        <IconComponent size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Popular Vehicles Section */}
            <section className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary mb-4">{ld.fleetTitle}</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">{ld.fleetSubtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {popularVehicles.map(vehicle => (
                            <div key={vehicle.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-bold px-3 py-1 rounded">
                                        {vehicle.brand}
                                    </div>
                                    <img src={vehicle.images[0]} alt={vehicle.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
                                            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1 inline-block">{vehicle.category}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                                        <div className="flex items-center gap-2"><Gauge size={16} className="text-primary" /> {vehicle.specs.transmission}</div>
                                        <div className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {vehicle.specs.year}</div>
                                        <div className="flex items-center gap-2"><Fuel size={16} className="text-primary" /> {vehicle.specs.fuel}</div>
                                        <div className="flex items-center gap-2"><Users size={16} className="text-primary" /> {vehicle.specs.seats} Kursi</div>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <div className="text-gray-500 text-sm mb-1">Start from</div>
                                        <div className="text-2xl font-bold text-gray-900 mb-4">Rp {vehicle.pricing[0]?.price.toLocaleString('id-ID')} <span className="text-sm font-normal text-gray-500">/{vehicle.pricing[0]?.unit || 'hari'}</span></div>

                                        <div className="flex gap-2">
                                            <Link to={`/vehicles/${vehicle.id}`} className="flex-1 bg-secondary hover:bg-gray-800 text-white text-center py-2.5 rounded-lg font-medium transition-colors">
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/vehicles" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-blue-700">
                            View All Vehicles <ChevronRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-secondary mb-4">{ld.faqTitle}</h2>
                    </div>

                    <div className="space-y-4">
                        {ld.faqs && ld.faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center font-medium text-gray-900"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    {faq.question}
                                    <ChevronDown className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 py-4 text-gray-600 border-t border-gray-200 whitespace-pre-wrap">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Blog Posts */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-secondary mb-4">{ld.blogTitle}</h2>
                            <p className="text-gray-600">{ld.blogSubtitle}</p>
                        </div>
                        <Link to="/blog" className="hidden sm:inline-flex items-center gap-2 text-primary font-semibold hover:text-blue-700">
                            Read All Posts <ChevronRight size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {blogs.map(blog => (
                            <Link key={blog.id} to={`/blog/${blog.id}`} className="group bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col sm:flex-row hover:shadow-md transition-shadow">
                                <div className="w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                                    <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 w-full sm:w-3/5 flex flex-col justify-center">
                                    <div className="text-xs text-gray-500 mb-2">{new Date(blog.publishedAt).toLocaleDateString()}</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-3">{blog.excerpt}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
