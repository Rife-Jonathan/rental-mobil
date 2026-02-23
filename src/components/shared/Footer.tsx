import { useSettings } from '../../context/SettingsContext';

export default function Footer() {
    const { settings } = useSettings();

    return (
        <footer className="bg-secondary text-gray-300 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">{settings.companyName}</h3>
                    <p className="text-sm">{settings.landingPage.footerDescription}</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
                    <ul className="text-sm space-y-2">
                        <li>Address: {settings.address}</li>
                        <li>Hotline: {settings.hotline}</li>
                        <li>WhatsApp: +{settings.whatsappNumber}</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                    <ul className="text-sm space-y-2">
                        <li><a href="/vehicles" className="hover:text-primary transition-colors">Our Vehicles</a></li>
                        <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                        <li><a href="/blog" className="hover:text-primary transition-colors">Blog</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-700 text-sm text-center">
                &copy; {new Date().getFullYear()} {settings.companyName}. All rights reserved.
            </div>
        </footer>
    );
}
