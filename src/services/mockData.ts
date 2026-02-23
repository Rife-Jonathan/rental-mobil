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
        title: 'RentFlow | Premium Vehicle Rental in Jakarta',
        description: 'Rent premium SUVs, MPVs and Sedans with or without a driver for the best rates. Direct WhatsApp booking.'
    },
    landingPage: {
        heroTitle: 'Drive Your Dreams Today',
        heroSubtitle: 'Premium vehicle rentals with seamless direct-to-WhatsApp booking.',
        benefitTitle: 'Benefit Point',
        benefitSubtitle: 'Why thousands of customers trust us for their rental needs.',
        benefits: [
            { title: 'Premium & Safe Fleet', description: 'All our vehicles undergo strict quality controls and routine maintenance to ensure your ultimate safety and comfort.', icon: 'ShieldCheck' as 'ShieldCheck' },
            { title: '24/7 Roadside Assistance', description: 'Drive with peace of mind knowing our dedicated support team is available round the clock wherever you are.', icon: 'Clock' as 'Clock' },
            { title: 'Transparent Pricing', description: 'No hidden fees or surprise charges. We provide straightforward, competitive rates for every rental package.', icon: 'CreditCard' as 'CreditCard' }
        ],
        fleetTitle: 'Our Popular Fleet',
        fleetSubtitle: 'Choose from our wide range of premium vehicles maintained to the highest standards.',
        faqTitle: 'Frequently Asked Questions',
        faqs: [
            { question: 'What are the requirements to rent a car?', answer: 'You must have a valid drivers license (SIM A), KTP, and be at least 21 years old.' },
            { question: 'Is insurance included in the rental price?', answer: 'Basic insurance is included. Comprehensive coverage is available for an additional fee.' },
            { question: 'Can I change my booking dates?', answer: 'Yes, modifications are allowed up to 48 hours before the rental period begins.' },
            { question: 'Do you offer airport pickup/drop-off?', answer: 'Absolutely! Please select the airport transfer add-on during booking.' }
        ],
        blogTitle: 'Latest Insights',
        blogSubtitle: 'Tips, news, and guides for your journey.',
        footerDescription: 'Modernizing fleet rentals with seamless direct-to-WhatsApp booking.',
        bookingNotice: 'Jangan lewatkan penawaran spesial kami! Harga di atas dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Segera hubungi kami atau pesan langsung untuk mendapatkan harga terbaik!'
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
