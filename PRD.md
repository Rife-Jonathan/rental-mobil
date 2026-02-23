Here is a comprehensive Product Requirements Document (PRD) for your white-label vehicle rental platform, incorporating your provided images, technical preferences, and clarifications.

---

# Product Requirements Document (PRD)
**Project Name:** RentFlow (White-Label Vehicle Rental SaaS)
**Document Version:** 1.0
**Target Platform:** Web (Mobile-Responsive SPA)

## 1. App Name & Purpose
*   **App Idea:** A customizable, white-label vehicle rental website designed to be sold as a single-tenant solution to rental businesses. 
*   **Tagline:** "Modernizing fleet rentals with seamless direct-to-WhatsApp booking."
*   **Problem Statement:** Local vehicle rental businesses need professional, fast, and SEO-friendly websites. However, traditional e-commerce checkout flows cause high drop-off rates in Southeast Asian markets. RentFlow solves this by providing a premium browsing experience that converts directly into WhatsApp conversations, while giving business owners complete control over their branding, dynamic pricing, and fleet management.

## 2. User Roles & Architecture
**Architecture Note:** This is a **Single-Tenant** application. Each buyer gets their own deployment, database, and admin panel.

| Role | Description | Authentication |
| :--- | :--- | :--- |
| **End-Customer (B2C)** | Browses vehicles, reads content, selects rental parameters, and initiates booking via WhatsApp. | **No login required.** Maximizes conversion rates. |
| **Admin (Business Owner)** | Full access to the backend dashboard to manage the fleet, pricing, blog, settings (white-label branding), and view leads. | **Required.** Authenticates via email/password. |

## 3. Features & Flow

### 3.1 End-Customer Frontend (React TypeScript)
*   **Dynamic Global UI:**
    *   Header: Displays Logo, Hotline, WhatsApp number, and physical address (data fetched from API).
    *   Dynamic Theming: Primary and secondary colors are fetched via API on load and injected as CSS variables (e.g., overriding Tailwind configuration dynamically).
    *   Floating WhatsApp Widget globally available in the bottom right corner.
*   **Home Page:**
    *   **Hero Section:** High-quality background image/slider.
    *   **Search Widget:** Dropdowns for *Brand*, *Transmission*, and *Year* (as per Image 1), routing to the listing page.
    *   **FAQ Section:** Accordion style list of frequently asked questions.
*   **Vehicle Listing Page:**
    *   Grid view of vehicle cards (as per Image 5).
    *   Each card displays: Image, Vehicle Name, Category (SUV, MPV), Specs icons (Transmission, Year, Fuel, Seats), and "Start from" price.
    *   Quick "WhatsApp" icon button and "Lihat Detail" (View Detail) button.
*   **Vehicle Detail Page (Core Conversion Page):**
    *   **Header (Image 4):** Main vehicle image/gallery, Title, Spec icons.
    *   **Dynamic Pricing Widget:** Radio buttons listing custom rental packages (e.g., "Car + Driver / 12 Hours", "Lepas Kunci (Fullday)").
    *   **Rental Inputs:** Quantity selector (`- 1 +`) and Rental Date picker.
    *   **Dynamic Content Tabs (Image 3):** 
        *   *Deskripsi* (Rich text description and bullet points).
        *   *Fasilitas* (Features/Amenities).
        *   *Syarat & Ketentuan* (Terms & Conditions).
        *   *Area Layanan* (Service Areas).
*   **Blog & Static Pages:**
    *   Blog listing and detail pages for SEO purposes.
    *   Static pages for "Tentang Kami" (About Us), "Kontak" (Contact), and "Testimonial".

### 3.2 Booking Flow (Crucial Logic)
1.  User selects a pricing package, quantity, and date on the Vehicle Detail page.
2.  User clicks **"Booking via Whatsapp"**.
3.  **Backend Action:** The React app sends a POST request to the Laravel API. Laravel saves this as a "Pending Lead" in the database (capturing Vehicle, Package, Date, IP address/Session ID).
4.  **Frontend Action:** Upon successful API response, the React app redirects the user to the `wa.me` deep link.
5.  **WhatsApp Payload:** The message is pre-filled: *"Halo, saya ingin menyewa [Nama Mobil] dengan paket [Nama Paket] untuk tanggal [Tanggal]. Apakah tersedia?"*

### 3.3 Admin Backend (Laravel Panel)
*   **Dashboard:** Overview of total vehicles, total saved leads, and blog posts.
*   **White-Label Settings Manager:**
    *   Upload Logo (PNG/SVG) and Favicon.
    *   Color Pickers for Primary, Secondary, and Accent colors.
    *   Company Info: Name, Address, WhatsApp Number, Hotline.
    *   SEO Settings: Global Meta Title, Description, and Keywords.
*   **Fleet Management:**
    *   CRUD operations for Vehicles.
    *   Upload multiple images (Gallery).
    *   **Availability Toggle:** Manually mark a car as "Available" or "Out of Service". (Out of service cars are hidden from frontend search/listings).
    *   **Dynamic Pricing Engine:** A repeater field where admin can add unlimited pricing rows (Title: "With Driver 12h", Price: "Rp 800.000").
    *   **Tab Content:** WYSIWYG editors for Deskripsi, Fasilitas, S&K, and Area Layanan.
*   **Lead Management:**
    *   View all booking attempts saved by the system before the WA redirect. Statuses: *Pending*, *Completed* (manual update by admin), *Canceled*.
*   **Content Management System (CMS):**
    *   Manage Blog Posts (Title, Thumbnail, Rich Text Body, Meta Tags).
    *   Manage FAQs.

## 4. Design Direction
*   **Theme:** Corporate, Professional, and Trustworthy.
*   **UI/UX Paradigm:** Clean layouts with high-contrast call-to-action buttons. Use of standard automotive iconography (steering wheel for transmission, gas pump for fuel, etc.).
*   **Mobile-First Approach:** Given the B2C target audience in Southeast Asia, 80%+ traffic will be mobile. The search widget must stack neatly, and the booking sticky bar should remain visible on scroll on mobile devices.
*   **Component Styling:** Use slightly rounded corners (e.g., `rounded-lg` in Tailwind) for vehicle cards and soft drop-shadows to create a modern web feel.

## 5. Tech Stack & Architecture

| Component | Technology | Reasoning |
| :--- | :--- | :--- |
| **Backend Framework** | Laravel 11 (PHP 8.3) | Excellent for building REST APIs and CMS panels quickly. Eloquent ORM easily handles the dynamic pricing relationships. |
| **Frontend Framework** | React 18+ with TypeScript | High performance, strict typing prevents UI bugs, and highly componentized for the complex detail page. |
| **Frontend Styling** | Tailwind CSS | Crucial for the White-Label aspect. We can inject API-fetched colors into Tailwind's custom CSS variables at runtime. |
| **Database** | MySQL 8 or PostgreSQL | Reliable relational structure for Vehicles, Pricing Variations, and Leads. |
| **Image Processing** | Laravel Spatie Media Library | Automatically handles image uploads, resizing, and WebP conversion for fast page loads. |
| **API Authentication** | Laravel Sanctum | Secure API token management for the Admin panel. |

## 6. Expected Output (Definition of Done for MVP)
1.  **Deployable Codebase:** A clean repository containing the Laravel backend and React frontend, documented with instructions on how to deploy a new instance for a new buyer.
2.  **Working White-Label Engine:** Changing the color and logo in the Admin panel immediately updates the entire React frontend without needing a rebuild.
3.  **Functional Booking Flow:** Clicking the WA button successfully logs the data in the backend database *before* opening the WhatsApp application/web.
4.  **Dynamic Pricing Engine:** Admin can successfully attach varying price points and durations to a single vehicle, and the frontend accurately displays and selects them.
5.  **Responsive Design:** The application passes Google Mobile-Friendly tests and renders perfectly on iPhone and Android screens.
6.  **SEO Ready:** React pages dynamically populate `<title>` and `<meta>` descriptions based on Laravel API data using `react-helmet-async`.