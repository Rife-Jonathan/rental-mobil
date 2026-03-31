import { Link } from 'react-router-dom';
import { fetchVehicles, fetchBlogs } from '../../services/api';
import { ChevronDown, ChevronRight, Calendar, Users, Fuel, Gauge, Search, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
            <section className="relative h-[700px] flex justify-center pt-32 pb-48 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-[pulse_20s_ease-in-out_infinite]"
                    style={{ backgroundImage: `url('${ld.heroImage || "https://images.unsplash.com/photo-1503376762369-2f22b8d009fa?auto=format&fit=crop&q=80&w=1920"}')` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40"></div>
                </div>
                <div className="relative z-10 text-center px-4 max-w-5xl w-full flex flex-col items-center justify-center h-full pt-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight drop-shadow-lg"
                    >
                        {ld.heroTitle}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl mb-12 text-slate-200 max-w-3xl drop-shadow-md font-medium"
                    >
                        {ld.heroSubtitle}
                    </motion.p>
                </div>
            </section>

            {/* Overlapping Search Widget */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28"
            >
                <div className="bg-white rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-6 md:p-8 flex flex-col md:flex-row gap-6 relative overflow-hidden backdrop-blur-xl border border-slate-100">
                    <div className="flex-1 relative z-10">
                        <label className="block text-sm font-bold text-slate-800 mb-3">Pilih Brand</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow cursor-pointer text-lg">
                            <option>Semua Brand</option>
                            <option>Toyota</option>
                            <option>Honda</option>
                        </select>
                    </div>
                    <div className="flex-1 relative z-10">
                        <label className="block text-sm font-bold text-slate-800 mb-3">Tipe Transmisi</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow cursor-pointer text-lg">
                            <option>Semua Transmisi</option>
                            <option>Automatic (AT)</option>
                            <option>Manual (MT)</option>
                        </select>
                    </div>
                    <div className="flex-1 relative z-10">
                        <label className="block text-sm font-bold text-slate-800 mb-3">Tahun Produksi</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow cursor-pointer text-lg">
                            <option>Semua Tahun</option>
                            <option>2023 - 2024</option>
                            <option>2020 - 2022</option>
                            <option>Di bawah 2020</option>
                        </select>
                    </div>
                    <div className="flex items-end relative z-10 md:w-48">
                        <Link to="/vehicles" className="w-full bg-primary hover:bg-teal-500 text-white font-bold py-4 px-6 rounded-xl shadow-[0_8px_30px_rgba(20,184,166,0.3)] transition-all hover:shadow-[0_8px_30px_rgba(20,184,166,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 text-lg">
                            <Search size={20} />
                            Cari
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* Benefit Point (Why Choose Us) */}
            <section className="py-28 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{ld.benefitTitle}</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">{ld.benefitSubtitle}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {ld.benefits && ld.benefits.map((benefit, index) => {
                            const IconComponent = IconMap[benefit.icon as keyof typeof IconMap] || ShieldCheck;
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15, duration: 0.5 }}
                                    key={index}
                                    className="bg-white rounded-2xl p-10 border border-slate-100 text-center hover:shadow-[0_8px_30px_rgba(20,184,166,0.15)] hover:-translate-y-2 transition-all duration-300 relative group"
                                >
                                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 group-hover:rotate-0 transition-all duration-300 ${index % 2 === 0 ? 'rotate-6' : '-rotate-6'} ${index === 0 ? 'bg-primary/10 text-primary' : index === 1 ? 'bg-indigo-50 text-indigo-500' : 'bg-rose-50 text-rose-500'}`}>
                                        <IconComponent size={36} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                                    <p className="text-slate-600 text-lg leading-relaxed">{benefit.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Popular Vehicles Section */}
            <section className="py-28 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{ld.fleetTitle}</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">{ld.fleetSubtitle}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {popularVehicles.map((vehicle, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                key={vehicle.id}
                                className="bg-white rounded-3xl shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col group"
                            >
                                <div className="h-56 overflow-hidden relative">
                                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        {vehicle.brand}
                                    </div>
                                    <img src={vehicle.images[0]} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900">{vehicle.name}</h3>
                                            <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full mt-2 inline-block uppercase tracking-wider">{vehicle.category}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-slate-600 mb-8">
                                        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center"><Gauge size={14} className="text-slate-400" /></div> <span className="font-medium">{vehicle.specs.transmission}</span></div>
                                        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center"><Calendar size={14} className="text-slate-400" /></div> <span className="font-medium">{vehicle.specs.year}</span></div>
                                        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center"><Fuel size={14} className="text-slate-400" /></div> <span className="font-medium">{vehicle.specs.fuel}</span></div>
                                        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center"><Users size={14} className="text-slate-400" /></div> <span className="font-medium">{vehicle.specs.seats} Seat</span></div>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-slate-100 flex items-end justify-between">
                                        <div>
                                            <div className="text-slate-400 text-xs font-medium mb-1 uppercase tracking-wider">Mulai dari</div>
                                            <div className="text-2xl font-extrabold text-slate-900">Rp {vehicle.pricing[0]?.price.toLocaleString('id-ID')} <span className="text-sm font-medium text-slate-400">/{vehicle.pricing[0]?.unit || 'hari'}</span></div>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <Link to={`/vehicles/${vehicle.id}`} className="block w-full bg-slate-900 hover:bg-primary text-white text-center py-3.5 rounded-xl font-bold transition-colors">
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <Link to="/vehicles" className="inline-flex items-center gap-2 text-primary font-bold hover:text-teal-600 transition-colors uppercase tracking-wider text-sm bg-primary/5 px-6 py-3 rounded-full hover:bg-primary/10">
                            Lihat Semua Armada <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-28 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{ld.faqTitle}</h2>
                    </motion.div>

                    <div className="space-y-4">
                        {ld.faqs && ld.faqs.map((faq, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                key={index}
                                className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow"
                            >
                                <button
                                    className="w-full px-8 py-6 text-left flex justify-between items-center font-bold text-slate-900 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    {faq.question}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ml-4 ${openFaq === index ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                                        <ChevronDown className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-8 pb-6 text-slate-600 leading-relaxed max-w-3xl"
                                        >
                                            {faq.answer}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Blog Posts */}
            <section className="py-28 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                    >
                        <div>
                            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{ld.blogTitle}</h2>
                            <p className="text-lg text-slate-600 max-w-xl">{ld.blogSubtitle}</p>
                        </div>
                        <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-bold hover:text-teal-600 transition-colors uppercase tracking-wider text-sm bg-primary/5 px-6 py-3 rounded-full hover:bg-primary/10">
                            Baca Artikel Lainnya <ChevronRight size={18} />
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {blogs.map((blog, index) => (
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                key={blog.id}
                            >
                                <Link to={`/blog/${blog.id}`} className="group bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100 flex flex-col sm:flex-row hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 h-full">
                                    <div className="w-full sm:w-2/5 h-56 sm:h-auto overflow-hidden">
                                        <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="p-8 w-full sm:w-3/5 flex flex-col justify-center">
                                        <div className="text-xs font-bold text-primary mb-3 tracking-widest uppercase">{new Date(blog.publishedAt).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
                                        <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">{blog.excerpt}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
