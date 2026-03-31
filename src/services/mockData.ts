import { AppSettings, Vehicle, BlogPost, FaqItem, Lead } from '../types';

export const mockSettings: AppSettings = {
    companyName: 'RentFlow Dynamics',
    logoUrl: '/vite.svg',
    hotline: '+62 800 123 4567',
    whatsappNumber: '6281234567890',
    address: 'Jl. Sudirman No 10, Jakarta Selatan, Indonesia',
    colors: {
        primary: '#1d4ed8', // blue-700
        secondary: '#1e293b', // slate-800
        accent: '#f59e0b', // amber-500
    },
    seo: {
        title: 'RentFlow | Sewa Kendaraan Premium di Jakarta',
        description: 'Sewa SUV, MPV, dan Sedan premium dengan atau tanpa sopir dengan harga terbaik. Pemesanan langsung melalui WhatsApp.'
    },
    landingPage: {
        heroTitle: 'Wujudkan Perjalanan Impian Anda',
        heroSubtitle: 'Sewa kendaraan premium dengan pemesanan langsung melalui WhatsApp.',
        benefitTitle: 'Keunggulan Kami',
        benefitSubtitle: 'Mengapa ribuan pelanggan mempercayakan kebutuhan sewa kendaraan mereka kepada kami.',
        benefits: [
            { title: 'Armada Premium & Aman', description: 'Seluruh kendaraan kami menjalani kontrol kualitas ketat dan perawatan rutin untuk memastikan keselamatan serta kenyamanan Anda.', icon: 'ShieldCheck' as 'ShieldCheck' },
            { title: 'Layanan Darurat 24/7', description: 'Berkendara dengan tenang karena tim support kami siap membantu kapan saja dan di mana saja Anda berada.', icon: 'Clock' as 'Clock' },
            { title: 'Harga Transparan', description: 'Tanpa biaya tersembunyi atau biaya tambahan. Kami memberikan harga yang jelas dan kompetitif untuk setiap paket sewa.', icon: 'CreditCard' as 'CreditCard' }
        ],
        fleetTitle: 'Armada Populer Kami',
        fleetSubtitle: 'Pilih dari berbagai kendaraan premium kami yang dirawat dengan standar tertinggi.',
        faqTitle: 'Pertanyaan yang Sering Diajukan',
        faqs: [
            { question: 'Apa saja syarat untuk menyewa kendaraan?', answer: 'Anda harus memiliki SIM A yang berlaku, KTP, dan berusia minimal 21 tahun.' },
            { question: 'Apakah asuransi sudah termasuk dalam harga sewa?', answer: 'Asuransi dasar sudah termasuk. Perlindungan menyeluruh tersedia dengan biaya tambahan.' },
            { question: 'Apakah saya bisa mengubah tanggal pemesanan?', answer: 'Ya, perubahan diperbolehkan hingga 48 jam sebelum masa sewa dimulai.' },
            { question: 'Apakah tersedia layanan antar-jemput bandara?', answer: 'Tentu saja! Silakan pilih layanan bandara saat melakukan pemesanan.' }
        ],
        blogTitle: 'Artikel Terbaru',
        blogSubtitle: 'Tips, berita, dan panduan untuk perjalanan Anda.',
        footerDescription: 'Memodernisasi layanan sewa kendaraan dengan pemesanan langsung melalui WhatsApp.',
        bookingNotice: 'Jangan lewatkan penawaran spesial kami! Harga di atas dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Segera hubungi kami atau pesan langsung untuk mendapatkan harga terbaik!'
    },
    aboutPage: {
        heroSubtitle: 'Kami berkomitmen memberikan solusi mobilitas terbaik untuk kebutuhan pribadi dan bisnis Anda.',
        content1: 'RentFlow didirikan dengan satu misi: memodernisasi layanan sewa kendaraan dengan pemesanan langsung melalui WhatsApp. Kami memahami bahwa alur checkout e-commerce tradisional bisa merepotkan ketika Anda hanya butuh kendaraan dengan cepat.',
        content2: 'Kami menjaga armada premium berupa SUV, MPV, dan Sedan yang selalu diservis dan dibersihkan menyeluruh sebelum setiap perjalanan. Baik Anda butuh kendaraan dengan sopir profesional untuk pertemuan bisnis, atau lebih suka lepas kunci untuk liburan keluarga, kami memiliki paket yang tepat untuk Anda.'
    }
};

export const mockVehicles: Vehicle[] = [
    {
        id: 'v1',
        name: 'Toyota Innova Zenix Hybrid',
        brand: 'Toyota',
        category: 'MPV',
        images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800'],
        specs: {
            transmission: 'Automatic',
            year: 2023,
            fuel: 'Petrol',
            seats: 7
        },
        pricing: [
            { id: 'p1', title: 'Car + Driver / 12 Hours', price: 850000, unit: '12 jam' },
            { id: 'p2', title: 'Lepas Kunci (Fullday)', price: 650000, unit: 'hari' },
        ],
        isAvailable: true,
        content: {
            description: 'The all-new Toyota Innova Zenix Hybrid offers exceptional comfort and fuel efficiency for your family trips or corporate needs.',
            features: ['Air Conditioning', 'Bluetooth Audio', 'Cruise Control', 'Leather Seats', 'Hybrid Engine'],
            terms: 'Minimum 2 days rental for self-drive (Lepas Kunci). Valid driving license (SIM A) and ID required.',
            serviceArea: 'Greater Jakarta Area (Jabodetabek). Additional fees apply for out-of-town trips.'
        }
    },
    {
        id: 'v2',
        name: 'Honda CR-V Prestige',
        brand: 'Honda',
        category: 'SUV',
        images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'],
        specs: {
            transmission: 'Automatic',
            year: 2022,
            fuel: 'Petrol',
            seats: 5
        },
        pricing: [
            { id: 'p3', title: 'Car + Driver / 12 Hours', price: 950000, unit: '12 jam' },
            { id: 'p4', title: 'Lepas Kunci (Fullday)', price: 750000, unit: 'hari' },
        ],
        isAvailable: true,
        content: {
            description: 'Experience premium styling and dynamic driving with the Honda CR-V Prestige.',
            features: ['Panoramic Sunroof', 'Advanced Safety Features', 'Premium Audio', 'Turbo Engine'],
            terms: 'Minimum 1 day rental. Security deposit of Rp 1.000.000 required.',
            serviceArea: 'Jabodetabek and Bandung.'
        }
    },
    {
        id: 'v3',
        name: 'Toyota Avanza Veloz',
        brand: 'Toyota',
        category: 'MPV',
        images: ['https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800'],
        specs: {
            transmission: 'Automatic',
            year: 2021,
            fuel: 'Petrol',
            seats: 7
        },
        pricing: [
            { id: 'p5', title: 'Car + Driver / 12 Hours', price: 600000, unit: '12 jam' },
            { id: 'p6', title: 'Lepas Kunci (Fullday)', price: 400000, unit: 'hari' },
        ],
        isAvailable: true,
        content: {
            description: 'Reliable and affordable MPV for all your daily needs.',
            features: ['Rear AC Vents', 'Touchscreen Head Unit', 'USB Charging Ports'],
            terms: 'Flexible terms. No age restriction on self-drive with valid license.',
            serviceArea: 'Jabodetabek.'
        }
    }
];

export const mockBlogs: BlogPost[] = [
    {
        id: 'b1',
        title: 'Top 5 Road Trips to Take Around Jakarta in 2024',
        thumbnail: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Discover the best weekend getaways just a few hours drive from the capital.',
        content: '<p>Getting away from the city hustle is easier than ever...</p>',
        publishedAt: '2024-05-15T09:00:00Z'
    },
    {
        id: 'b2',
        title: 'Why Renting an MPV is Better for Large Families',
        thumbnail: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Comparing SUV and MPV comforts for your next family road trip.',
        content: '<p>When travelling with 5 or more people, space becomes a premium...</p>',
        publishedAt: '2024-05-10T14:30:00Z'
    }
];

export const mockFaqs: FaqItem[] = [
    {
        id: 'f1',
        question: 'How do I book a vehicle?',
        answer: 'Simply select your vehicle on our website, choose your package, and click "Booking via Whatsapp". We will process your booking directly through our customer service.'
    },
    {
        id: 'f2',
        question: 'What are the requirements for "Lepas Kunci" (self-drive)?',
        answer: 'You will need to provide a valid KTP (ID Card), A valid SIM A (Driving License), and a security deposit.'
    },
    {
        id: 'f3',
        question: 'Is fuel included in the rental price?',
        answer: 'Fuel is generally not included unless specified in the pricing package.'
    }
];

// Initial empty leads (will be populated in memory)
export const mockLeads: Lead[] = [];

// Simulate API Delay
export const simulateApi = <T>(data: T, delay = 800): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
};
