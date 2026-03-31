<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use App\Models\Vehicle;
use App\Models\Blog;
use App\Models\Faq;
use App\Models\Lead;

class ClientController extends Controller
{
    public function getSettings()
    {
        // Get the first setting or return a default structure
        $settings = Setting::first();
        if (!$settings) {
            return response()->json([
                'companyName' => 'RentFlow Dynamics',
                'logoUrl' => '/vite.svg',
                'hotline' => '+62 800 123 4567',
                'whatsappNumber' => '6281234567890',
                'address' => 'Jl. Sudirman No 10, Jakarta Selatan, Indonesia',
                'colors' => [
                    'primary' => '#1d4ed8',
                    'secondary' => '#1e293b',
                    'accent' => '#f59e0b',
                ],
                'seo' => [
                    'title' => 'RentFlow | Premium Vehicle Rental in Jakarta',
                    'description' => 'Rent premium SUVs, MPVs and Sedans with or without a driver for the best rates. Direct WhatsApp booking.'
                ],
                'landingPage' => [
                    'heroTitle' => 'Drive Your Dreams Today',
                    'heroSubtitle' => 'Premium vehicle rentals with seamless direct-to-WhatsApp booking.',
                    'benefitTitle' => 'Benefit Point',
                    'benefitSubtitle' => 'Why thousands of customers trust us for their rental needs.',
                    'fleetTitle' => 'Our Popular Fleet',
                    'fleetSubtitle' => 'Choose from our wide range of premium vehicles maintained to the highest standards.',
                    'faqTitle' => 'Frequently Asked Questions',
                    'blogTitle' => 'Latest Insights',
                    'blogSubtitle' => 'Tips, news, and guides for your journey.',
                    'footerDescription' => 'Modernizing fleet rentals with seamless direct-to-WhatsApp booking.'
                ],
                'aboutPage' => [
                    'heroSubtitle' => 'We are dedicated to providing the best mobility solutions for your personal and corporate needs.',
                    'content1' => 'RentFlow was founded with a single mission: to modernize fleet rentals with seamless direct-to-WhatsApp booking. We understand that traditional e-commerce checkout flows can be cumbersome when you just need a car quickly.',
                    'content2' => 'We maintain a premium fleet of SUVs, MPVs, and Sedans that are regularly serviced and thoroughly cleaned before every journey. Whether you need a car with a professional driver for a business meeting, or prefer self-drive (Lepas Kunci) for a family vacation, we have the right package for you.'
                ]
            ]);
        }

        return response()->json([
            'companyName' => $settings->company_name,
            'logoUrl' => $settings->logo_url,
            'hotline' => $settings->hotline,
            'whatsappNumber' => $settings->whatsapp_number,
            'address' => $settings->address,
            'colors' => $settings->colors,
            'seo' => $settings->seo,
            'landingPage' => $settings->landing_page ?: [
                'heroTitle' => 'Drive Your Dreams Today',
                'heroSubtitle' => 'Premium vehicle rentals with seamless direct-to-WhatsApp booking.',
                'benefitTitle' => 'Benefit Point',
                'benefitSubtitle' => 'Why thousands of customers trust us for their rental needs.',
                'benefits' => [
                    ['title' => 'Premium & Safe Fleet', 'description' => 'All our vehicles undergo strict quality controls and routine maintenance to ensure your ultimate safety and comfort.', 'icon' => 'ShieldCheck'],
                    ['title' => '24/7 Roadside Assistance', 'description' => 'Drive with peace of mind knowing our dedicated support team is available round the clock wherever you are.', 'icon' => 'Clock'],
                    ['title' => 'Transparent Pricing', 'description' => 'No hidden fees or surprise charges. We provide straightforward, competitive rates for every rental package.', 'icon' => 'CreditCard']
                ],
                'fleetTitle' => 'Our Popular Fleet',
                'fleetSubtitle' => 'Choose from our wide range of premium vehicles maintained to the highest standards.',
                'faqTitle' => 'Frequently Asked Questions',
                'faqs' => [
                    ['question' => 'What are the requirements to rent a car?', 'answer' => 'You must have a valid driver\'s license (SIM A), KTP, and be at least 21 years old.'],
                    ['question' => 'Is insurance included in the rental price?', 'answer' => 'Basic insurance is included. Comprehensive coverage is available for an additional fee.'],
                    ['question' => 'Can I change my booking dates?', 'answer' => 'Yes, modifications are allowed up to 48 hours before the rental period begins.'],
                    ['question' => 'Do you offer airport pickup/drop-off?', 'answer' => 'Absolutely! Please select the airport transfer add-on during booking.']
                ],
                'blogTitle' => 'Latest Insights',
                'blogSubtitle' => 'Tips, news, and guides for your journey.',
                'footerDescription' => 'Modernizing fleet rentals with seamless direct-to-WhatsApp booking.',
                'bookingNotice' => 'Jangan lewatkan penawaran spesial kami! Harga di atas dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Segera hubungi kami atau pesan langsung untuk mendapatkan harga terbaik!'
            ],
            'aboutPage' => $settings->about_page ?: [
                'heroSubtitle' => 'We are dedicated to providing the best mobility solutions for your personal and corporate needs.',
                'content1' => 'RentFlow was founded with a single mission: to modernize fleet rentals with seamless direct-to-WhatsApp booking. We understand that traditional e-commerce checkout flows can be cumbersome when you just need a car quickly.',
                'content2' => 'We maintain a premium fleet of SUVs, MPVs, and Sedans that are regularly serviced and thoroughly cleaned before every journey. Whether you need a car with a professional driver for a business meeting, or prefer self-drive (Lepas Kunci) for a family vacation, we have the right package for you.'
            ]
        ]);
    }

    public function getVehicles()
    {
        $vehicles = Vehicle::with('pricingPackages')->where('is_available', true)->get();
        return response()->json($vehicles->map(function ($vehicle) {
            return [
                'id' => (string) $vehicle->id,
                'name' => $vehicle->name,
                'brand' => $vehicle->brand,
                'category' => $vehicle->category,
                'images' => $vehicle->images ?? [],
                'specs' => $vehicle->specs,
                'pricing' => $vehicle->pricingPackages->map(function ($pkg) {
                    return [
                        'id' => (string) $pkg->id,
                        'title' => $pkg->title,
                        'price' => (float) $pkg->price,
                        'unit' => $pkg->unit,
                    ];
                }),
                'isAvailable' => (bool) $vehicle->is_available,
                'content' => $vehicle->content
            ];
        }));
    }

    public function getVehicle($id)
    {
        $vehicle = Vehicle::with('pricingPackages')->find($id);
        if (!$vehicle) return response()->json(['message' => 'Not found'], 404);

        return response()->json([
            'id' => (string) $vehicle->id,
            'name' => $vehicle->name,
            'brand' => $vehicle->brand,
            'category' => $vehicle->category,
            'images' => $vehicle->images ?? [],
            'specs' => $vehicle->specs,
            'pricing' => $vehicle->pricingPackages->map(function ($pkg) {
                return [
                    'id' => (string) $pkg->id,
                    'title' => $pkg->title,
                    'price' => (float) $pkg->price,
                    'unit' => $pkg->unit,
                ];
            }),
            'isAvailable' => (bool) $vehicle->is_available,
            'content' => $vehicle->content
        ]);
    }

    public function getBlogs()
    {
        $blogs = Blog::orderBy('published_at', 'desc')->get();
        return response()->json($blogs->map(function ($blog) {
            return [
                'id' => (string) $blog->id,
                'title' => $blog->title,
                'thumbnail' => $blog->thumbnail,
                'excerpt' => $blog->excerpt,
                'content' => $blog->content,
                'publishedAt' => clone $blog->published_at
            ];
        }));
    }

    public function getBlog($id)
    {
        $blog = Blog::find($id);
        if (!$blog) return response()->json(['message' => 'Not found'], 404);

        return response()->json([
            'id' => (string) $blog->id,
            'title' => $blog->title,
            'thumbnail' => $blog->thumbnail,
            'excerpt' => $blog->excerpt,
            'content' => $blog->content,
            'publishedAt' => clone $blog->published_at
        ]);
    }

    public function getFaqs()
    {
        $faqs = Faq::orderBy('order_index', 'asc')->get();
        return response()->json($faqs->map(function ($faq) {
            return [
                'id' => (string) $faq->id,
                'question' => $faq->question,
                'answer' => $faq->answer
            ];
        }));
    }

    public function storeLead(Request $request)
    {
        $validated = $request->validate([
            'vehicleId' => 'required',
            'pricingPackageId' => 'required',
            'rentalDate' => 'required|date',
            'quantity' => 'required|integer|min:1',
            'customerName' => 'nullable|string',
            'customerPhone' => 'nullable|string',
            'message' => 'nullable|string'
        ]);

        $lead = Lead::create([
            'vehicle_id' => $validated['vehicleId'],
            'pricing_package_id' => $validated['pricingPackageId'],
            'rental_date' => $validated['rentalDate'],
            'quantity' => $validated['quantity'],
            'customer_name' => $validated['customerName'] ?? null,
            'customer_phone' => $validated['customerPhone'] ?? null,
            'message' => $validated['message'] ?? null,
            'status' => 'Pending'
        ]);

        return response()->json(['success' => true, 'id' => $lead->id], 201);
    }
}
