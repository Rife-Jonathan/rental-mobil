export interface AppSettings {
    companyName: string;
    logoUrl: string;
    hotline: string;
    whatsappNumber: string;
    address: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
    };
    seo: {
        title: string;
        description: string;
    };
    landingPage: {
        heroImage?: string;
        heroTitle: string;
        heroSubtitle: string;
        benefitTitle: string;
        benefitSubtitle: string;
        benefits: {
            title: string;
            description: string;
            icon: 'ShieldCheck' | 'Clock' | 'CreditCard';
        }[];
        fleetTitle: string;
        fleetSubtitle: string;
        faqTitle: string;
        faqs: {
            question: string;
            answer: string;
        }[];
        blogTitle: string;
        blogSubtitle: string;
        footerDescription: string;
        bookingNotice: string;
    };
    aboutPage: {
        heroSubtitle: string;
        content1: string;
        content2: string;
    };
}

export interface PricingPackage {
    id: string;
    title: string; // e.g., "Car + Driver / 12 Hours"
    price: number;
    unit: string;
}

export interface Vehicle {
    id: string;
    name: string;
    brand: string;
    category: "SUV" | "MPV" | "Sedan" | "Hatchback";
    images: string[];
    specs: {
        transmission: "Automatic" | "Manual";
        year: number;
        fuel: "Petrol" | "Diesel" | "EV";
        seats: number;
    };
    pricing: PricingPackage[];
    isAvailable: boolean;
    content: {
        description: string;
        features: string[];
        terms: string;
        serviceArea: string;
    };
}

export interface Lead {
    id: string;
    vehicleId: string;
    packageId: string;
    quantity: number;
    rentalDate: string;
    customerPhone?: string;
    status: "Pending" | "Completed" | "Canceled";
    createdAt: string;
}

export interface BlogPost {
    id: string;
    title: string;
    thumbnail: string;
    excerpt: string;
    content: string;
    publishedAt: string;
}

export interface FaqItem {
    id: string;
    question: string;
    answer: string;
}
