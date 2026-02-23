import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';

// Customer Pages
import Home from './pages/customer/Home';
import VehicleListing from './pages/customer/VehicleListing';
import VehicleDetail from './pages/customer/VehicleDetail';
import BlogListing from './pages/customer/BlogListing';
import BlogDetail from './pages/customer/BlogDetail';
import About from './pages/customer/About';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import AdminSettings from './pages/admin/AdminSettings';
import AdminFleet from './pages/admin/AdminFleet';
import AdminLeads from './pages/admin/AdminLeads';
import AdminCMS from './pages/admin/AdminCMS';

export default function App() {
    return (
        <SettingsProvider>
            <Router>
                <Routes>
                    {/* Customer Routes */}
                    <Route path="/" element={<CustomerLayout />}>
                        <Route index element={<Home />} />
                        <Route path="vehicles" element={<VehicleListing />} />
                        <Route path="vehicles/:id" element={<VehicleDetail />} />
                        <Route path="blog" element={<BlogListing />} />
                        <Route path="blog/:id" element={<BlogDetail />} />
                        <Route path="about" element={<About />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="settings" element={<AdminSettings />} />
                        <Route path="fleet" element={<AdminFleet />} />
                        <Route path="leads" element={<AdminLeads />} />
                        <Route path="cms" element={<AdminCMS />} />
                    </Route>
                </Routes>
            </Router>
        </SettingsProvider>
    );
}
