import { Link } from 'react-router-dom';
import { CarFront, Phone, MapPin } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function Header() {
    const { settings } = useSettings();

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            {/* Top Bar for contact info */}
            <div className="bg-secondary text-white py-1 px-4 text-xs md:text-sm hidden sm:block">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><Phone size={14} /> {settings.hotline}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {settings.address}</span>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/admin" className="hover:text-amber-500">Admin Login</Link>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-primary"><CarFront size={32} /></span>
                        <span className="font-bold text-xl md:text-2xl tracking-tight text-secondary">
                            {settings.companyName}
                        </span>
                    </Link>

                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-secondary font-medium hover:text-primary transition-colors">Home</Link>
                        <Link to="/vehicles" className="text-secondary font-medium hover:text-primary transition-colors">Our Fleet</Link>
                        <Link to="/blog" className="text-secondary font-medium hover:text-primary transition-colors">Blog</Link>
                        <Link to="/about" className="text-secondary font-medium hover:text-primary transition-colors">About</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
