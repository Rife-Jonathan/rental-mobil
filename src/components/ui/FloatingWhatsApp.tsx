import { MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export default function FloatingWhatsApp() {
    const { settings } = useSettings();

    const handleWhatsAppClick = () => {
        const message = "Halo, saya tertarik dengan layanan sewa mobil di " + settings.companyName;
        const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <button
            onClick={handleWhatsAppClick}
            className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-transform duration-300"
            aria-label="Contact us on WhatsApp"
        >
            <MessageCircle size={28} />
        </button>
    );
}
