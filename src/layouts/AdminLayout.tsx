import { Outlet, Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { LayoutDashboard, Settings, CarFront, MessageSquare, FileText, LogOut } from 'lucide-react';

export default function AdminLayout() {
    const { settings } = useSettings();

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-secondary text-white flex flex-col hidden md:flex">
                <div className="p-4 bg-gray-900 font-bold text-xl flex items-center gap-2">
                    <CarFront /> {settings.companyName} Admin
                </div>
                <nav className="flex-1 px-2 py-4 space-y-2">
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-700 transition-colors">
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-700 transition-colors">
                        <Settings size={20} /> Settings
                    </Link>
                    <Link to="/admin/fleet" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-700 transition-colors">
                        <CarFront size={20} /> Fleet Matrix
                    </Link>
                    <Link to="/admin/leads" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-700 transition-colors">
                        <MessageSquare size={20} /> Leads Management
                    </Link>
                    <Link to="/admin/cms" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-700 transition-colors">
                        <FileText size={20} /> CMS / Blog
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <Link to="/" className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition-colors">
                        <LogOut size={20} /> Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow h-16 flex items-center justify-between px-6">
                    <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Welcome, Owner</span>
                        <div className="h-6 w-px bg-gray-200"></div>
                        <button
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = '/';
                            }}
                            className="text-sm text-red-600 hover:text-red-800 flex items-center gap-2 font-medium transition-colors group"
                        >
                            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> Logout
                        </button>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
