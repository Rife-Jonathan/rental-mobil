<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Settings
        \App\Models\Setting::create([
            'company_name' => 'RentFlow Dynamics',
            'logo_url' => '/vite.svg',
            'hotline' => '+62 800 123 4567',
            'whatsapp_number' => '6281234567890',
            'address' => 'Jl. Sudirman No 10, Jakarta Selatan, Indonesia',
            'colors' => [
                'primary' => '#1d4ed8',
                'secondary' => '#1e293b',
                'accent' => '#f59e0b',
            ],
            'seo' => [
                'title' => 'RentFlow | Premium Vehicle Rental in Jakarta',
                'description' => 'Rent premium SUVs, MPVs and Sedans with or without a driver for the best rates. Direct WhatsApp booking.'
            ]
        ]);

        // Vehicles & Packages
        $innov = \App\Models\Vehicle::create([
            'name' => 'Toyota Innova Zenix Hybrid',
            'brand' => 'Toyota',
            'category' => 'MPV',
            'images' => ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800'],
            'specs' => [
                'transmission' => 'Automatic',
                'year' => 2023,
                'fuel' => 'Petrol',
                'seats' => 7
            ],
            'is_available' => true,
            'content' => [
                'description' => 'The all-new Toyota Innova Zenix Hybrid offers exceptional comfort and fuel efficiency for your family trips or corporate needs.',
                'features' => ['Air Conditioning', 'Bluetooth Audio', 'Cruise Control', 'Leather Seats', 'Hybrid Engine'],
                'terms' => 'Minimum 2 days rental for self-drive (Lepas Kunci). Valid driving license (SIM A) and ID required.',
                'serviceArea' => 'Greater Jakarta Area (Jabodetabek). Additional fees apply for out-of-town trips.'
            ]
        ]);
        $innov->pricingPackages()->create(['title' => 'Car + Driver / 12 Hours', 'price' => 850000, 'unit' => '12 jam']);
        $innov->pricingPackages()->create(['title' => 'Lepas Kunci (Fullday)', 'price' => 650000, 'unit' => 'hari']);

        $crv = \App\Models\Vehicle::create([
            'name' => 'Honda CR-V Prestige',
            'brand' => 'Honda',
            'category' => 'SUV',
            'images' => ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'],
            'specs' => [
                'transmission' => 'Automatic',
                'year' => 2022,
                'fuel' => 'Petrol',
                'seats' => 5
            ],
            'is_available' => true,
            'content' => [
                'description' => 'Experience premium styling and dynamic driving with the Honda CR-V Prestige.',
                'features' => ['Panoramic Sunroof', 'Advanced Safety Features', 'Premium Audio', 'Turbo Engine'],
                'terms' => 'Minimum 1 day rental. Security deposit of Rp 1.000.000 required.',
                'serviceArea' => 'Jabodetabek and Bandung.'
            ]
        ]);
        $crv->pricingPackages()->create(['title' => 'Car + Driver / 12 Hours', 'price' => 950000, 'unit' => '12 jam']);
        $crv->pricingPackages()->create(['title' => 'Lepas Kunci (Fullday)', 'price' => 750000, 'unit' => 'hari']);

        $avanz = \App\Models\Vehicle::create([
            'name' => 'Toyota Avanza Veloz',
            'brand' => 'Toyota',
            'category' => 'MPV',
            'images' => ['https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800'],
            'specs' => [
                'transmission' => 'Automatic',
                'year' => 2021,
                'fuel' => 'Petrol',
                'seats' => 7
            ],
            'is_available' => true,
            'content' => [
                'description' => 'Reliable and affordable MPV for all your daily needs.',
                'features' => ['Rear AC Vents', 'Touchscreen Head Unit', 'USB Charging Ports'],
                'terms' => 'Flexible terms. No age restriction on self-drive with valid license.',
                'serviceArea' => 'Jabodetabek.'
            ]
        ]);
        $avanz->pricingPackages()->create(['title' => 'Car + Driver / 12 Hours', 'price' => 600000, 'unit' => '12 jam']);
        $avanz->pricingPackages()->create(['title' => 'Lepas Kunci (Fullday)', 'price' => 400000, 'unit' => 'hari']);

        // Blogs
        \App\Models\Blog::create([
            'title' => 'Top 5 Road Trips to Take Around Jakarta in 2024',
            'thumbnail' => 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
            'excerpt' => 'Discover the best weekend getaways just a few hours drive from the capital.',
            'content' => '<p>Getting away from the city hustle is easier than ever...</p>',
            'published_at' => '2024-05-15 09:00:00'
        ]);
        \App\Models\Blog::create([
            'title' => 'Why Renting an MPV is Better for Large Families',
            'thumbnail' => 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800',
            'excerpt' => 'Comparing SUV and MPV comforts for your next family road trip.',
            'content' => '<p>When travelling with 5 or more people, space becomes a premium...</p>',
            'published_at' => '2024-05-10 14:30:00'
        ]);

        // FAQs
        \App\Models\Faq::create([
            'question' => 'How do I book a vehicle?',
            'answer' => 'Simply select your vehicle on our website, choose your package, and click "Booking via Whatsapp". We will process your booking directly through our customer service.',
            'order_index' => 1
        ]);
        \App\Models\Faq::create([
            'question' => 'What are the requirements for "Lepas Kunci" (self-drive)?',
            'answer' => 'You will need to provide a valid KTP (ID Card), A valid SIM A (Driving License), and a security deposit.',
            'order_index' => 2
        ]);
        \App\Models\Faq::create([
            'question' => 'Is fuel included in the rental price?',
            'answer' => 'Fuel is generally not included unless specified in the pricing package.',
            'order_index' => 3
        ]);
    }
}
