import { useEffect, useState } from 'react';
import { fetchDashboardStats } from '../../services/api';
import { CarFront, MessageSquare, FileText, TrendingUp, Loader2 } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalVehicles: 0,
        pendingLeads: 0,
        completedBookings: 0,
        publishedPosts: 0
    });
    const [recentLeads, setRecentLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats()
            .then(data => {
                setStats(data.stats);
                setRecentLeads(data.recentLeads);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch dashboard stats", err);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[50vh]">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium tracking-wide text-sm">TOTAL VEHICLES</h3>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><CarFront size={20} /></div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalVehicles}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium tracking-wide text-sm">PENDING LEADS</h3>
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><MessageSquare size={20} /></div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingLeads}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium tracking-wide text-sm">COMPLETED BOOKINGS</h3>
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg"><TrendingUp size={20} /></div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.completedBookings}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium tracking-wide text-sm">PUBLISHED POSTS</h3>
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><FileText size={20} /></div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.publishedPosts}</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Recent Booking Leads</h3>
                </div>
                <div className="p-6">
                    {recentLeads.length > 0 ? (
                        <div className="space-y-4">
                            {recentLeads.map(lead => (
                                <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                    <div>
                                        <p className="font-semibold text-gray-900">{lead.vehicleName} <span className="text-sm font-normal text-gray-500 ml-2">({lead.packageName})</span></p>
                                        <p className="text-sm text-gray-500 mt-1">Date: {new Date(lead.rentalDate).toLocaleDateString()} | Qty: {lead.quantity}</p>
                                    </div>
                                    <div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${lead.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : lead.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {lead.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                            <p>No booking leads yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
