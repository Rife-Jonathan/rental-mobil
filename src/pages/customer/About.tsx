import { MapPin, Phone, Mail } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function About() {
    const { settings } = useSettings();

    return (
        <div className="bg-white min-h-screen">
            {/* Hero */}
            <div className="bg-secondary py-20 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Tentang {settings.companyName}</h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto px-4">{settings.aboutPage?.heroSubtitle || 'Kami berkomitmen memberikan solusi mobilitas terbaik untuk kebutuhan pribadi dan bisnis Anda.'}</p>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="prose prose-lg text-gray-600 mb-16">
                    <p className="whitespace-pre-line">
                        {settings.aboutPage?.content1 || `${settings.companyName} was founded with a single mission: to modernize fleet rentals with seamless direct-to-WhatsApp booking. We understand that traditional e-commerce checkout flows can be cumbersome when you just need a car quickly.`}
                    </p>
                    <p className="whitespace-pre-line">
                        {settings.aboutPage?.content2 || `We maintain a premium fleet of SUVs, MPVs, and Sedans that are regularly serviced and thoroughly cleaned before every journey. Whether you need a car with a professional driver for a business meeting, or prefer self-drive (Lepas Kunci) for a family vacation, we have the right package for you.`}
                    </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Informasi Kontak</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 p-6 rounded-xl text-center border border-gray-100">
                        <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Alamat Kami</h3>
                        <p className="text-gray-600 text-sm">{settings.address}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl text-center border border-gray-100">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">WhatsApp</h3>
                        <p className="text-gray-600 text-sm">+{settings.whatsappNumber}</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl text-center border border-gray-100">
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Hotline</h3>
                        <p className="text-gray-600 text-sm">{settings.hotline}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
