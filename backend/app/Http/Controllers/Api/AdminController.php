<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;
use App\Models\Vehicle;
use App\Models\Blog;
use App\Models\Faq;
use App\Models\Lead;

class AdminController extends Controller
{
    public function dashboard()
    {
        $totalVehicles = Vehicle::count();
        $pendingLeads = Lead::where('status', 'Pending')->count();
        $completedLeads = Lead::where('status', 'Completed')->count();
        $totalBlogs = Blog::count();
        
        $recentLeads = Lead::with(['vehicle', 'pricingPackage'])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()->map(function($lead) {
                return [
                    'id' => (string) $lead->id,
                    'vehicleName' => $lead->vehicle ? $lead->vehicle->name : 'Unknown',
                    'packageName' => $lead->pricingPackage ? $lead->pricingPackage->title : 'Unknown',
                    'rentalDate' => clone $lead->rental_date,
                    'quantity' => $lead->quantity,
                    'status' => $lead->status,
                ];
            });

        return response()->json([
            'stats' => [
                'totalVehicles' => $totalVehicles,
                'pendingLeads' => $pendingLeads,
                'completedBookings' => $completedLeads,
                'publishedPosts' => $totalBlogs,
            ],
            'recentLeads' => $recentLeads
        ]);
    }

    public function getVehicles()
    {
        $vehicles = Vehicle::with('pricingPackages')->orderBy('created_at', 'desc')->get();
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

    public function getLeads()
    {
        $leads = Lead::with(['vehicle', 'pricingPackage'])->orderBy('created_at', 'desc')->get();
        return response()->json($leads->map(function($lead) {
            return [
                'id' => (string) $lead->id,
                'vehicleId' => (string) $lead->vehicle_id,
                'packageId' => (string) $lead->pricing_package_id,
                'vehicleName' => $lead->vehicle ? $lead->vehicle->name : 'Unknown',
                'packageName' => $lead->pricingPackage ? $lead->pricingPackage->title : 'Unknown',
                'rentalDate' => clone $lead->rental_date,
                'quantity' => $lead->quantity,
                'status' => $lead->status,
                'customerName' => $lead->customer_name,
                'customerPhone' => $lead->customer_phone,
                'message' => $lead->message,
                'createdAt' => clone $lead->created_at,
            ];
        }));
    }

    public function updateLeadStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:Pending,Completed,Canceled'
        ]);

        $lead = Lead::findOrFail($id);
        $lead->status = $validated['status'];
        $lead->save();

        return response()->json(['success' => true]);
    }

    public function deleteLead($id)
    {
        Lead::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'companyName' => 'required|string',
            'logoUrl' => 'nullable|string',
            'hotline' => 'nullable|string',
            'whatsappNumber' => 'required|string',
            'address' => 'nullable|string',
            'colors' => 'required|array',
            'seo' => 'required|array',
            'landingPage' => 'required|array',
        ]);

        $settings = Setting::first();
        if (!$settings) {
            $settings = new Setting();
        }

        $settings->company_name = $validated['companyName'];
        $settings->logo_url = $validated['logoUrl'];
        $settings->hotline = $validated['hotline'];
        $settings->whatsapp_number = $validated['whatsappNumber'];
        $settings->address = $validated['address'];
        $settings->colors = $validated['colors'];
        $settings->seo = $validated['seo'];
        $settings->landing_page = $validated['landingPage'];
        $settings->save();

        return response()->json(['success' => true]);
    }

    public function createVehicle(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'brand' => 'required|string',
            'category' => 'required|string',
            'images' => 'required|array',
            'specs' => 'required|array',
            'content' => 'required|array',
            'isAvailable' => 'required|boolean',
            'pricing' => 'required|array'
        ]);

        $vehicle = Vehicle::create([
            'name' => $validated['name'],
            'brand' => $validated['brand'],
            'category' => $validated['category'],
            'images' => $validated['images'],
            'specs' => $validated['specs'],
            'content' => $validated['content'],
            'is_available' => $validated['isAvailable'],
        ]);

        foreach($validated['pricing'] as $pkg) {
            $vehicle->pricingPackages()->create([
                'title' => $pkg['title'],
                'price' => $pkg['price'],
                'unit' => $pkg['unit']
            ]);
        }

        return response()->json(['success' => true, 'id' => $vehicle->id], 201);
    }
    
    public function updateVehicle(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'brand' => 'required|string',
            'category' => 'required|string',
            'images' => 'required|array',
            'specs' => 'required|array',
            'content' => 'required|array',
            'isAvailable' => 'required|boolean',
            'pricing' => 'required|array'
        ]);

        $vehicle = Vehicle::findOrFail($id);
        
        $vehicle->update([
            'name' => $validated['name'],
            'brand' => $validated['brand'],
            'category' => $validated['category'],
            'images' => $validated['images'],
            'specs' => $validated['specs'],
            'content' => $validated['content'],
            'is_available' => $validated['isAvailable'],
        ]);

        // Recreate pricing for simplicity
        $vehicle->pricingPackages()->delete();
        foreach($validated['pricing'] as $pkg) {
            $vehicle->pricingPackages()->create([
                'title' => $pkg['title'],
                'price' => $pkg['price'],
                'unit' => $pkg['unit']
            ]);
        }

        return response()->json(['success' => true]);
    }
    
    public function deleteVehicle($id)
    {
        Vehicle::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    public function createBlog(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'thumbnail' => 'required|string',
            'excerpt' => 'required|string',
            'content' => 'required|string',
        ]);

        $blog = Blog::create([
            'title' => $validated['title'],
            'thumbnail' => $validated['thumbnail'],
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
            'published_at' => now(),
        ]);

        return response()->json(['success' => true, 'id' => $blog->id], 201);
    }

    public function updateBlog(Request $request, $id)
    {
         $validated = $request->validate([
            'title' => 'required|string',
            'thumbnail' => 'required|string',
            'excerpt' => 'required|string',
            'content' => 'required|string',
        ]);

        $blog = Blog::findOrFail($id);
        $blog->update([
            'title' => $validated['title'],
            'thumbnail' => $validated['thumbnail'],
            'excerpt' => $validated['excerpt'],
            'content' => $validated['content'],
        ]);

        return response()->json(['success' => true]);
    }

    public function deleteBlog($id)
    {
        Blog::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    public function createFaq(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
        ]);

        $faq = Faq::create([
            'question' => $validated['question'],
            'answer' => $validated['answer'],
        ]);

        return response()->json(['success' => true, 'id' => $faq->id], 201);
    }

    public function updateFaq(Request $request, $id)
    {
         $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
        ]);

        $faq = Faq::findOrFail($id);
        $faq->update([
            'question' => $validated['question'],
            'answer' => $validated['answer'],
        ]);

        return response()->json(['success' => true]);
    }

    public function deleteFaq($id)
    {
        Faq::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }
}
