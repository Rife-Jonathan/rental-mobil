import { useState, useEffect } from 'react';
import { fetchAdminLeads, updateLeadStatus } from '../../services/api';
import { MessageSquare, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function AdminLeads() {
    const [leads, setLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        setIsLoading(true);
        try {
            const data = await fetchAdminLeads();
            setLeads(data);
        } catch (error) {
            console.error("Failed to fetch leads", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: 'Pending' | 'Completed' | 'Canceled') => {
        try {
            await updateLeadStatus(id, newStatus);
            setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[50vh]">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Leads Management</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {leads.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-lg font-medium">No booking leads yet</p>
                        <p className="text-sm">When customers book via WhatsApp, the pending leads will appear here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    <th className="p-4">Date Submited</th>
                                    <th className="p-4">Vehicle & Package</th>
                                    <th className="p-4">Rental Date</th>
                                    <th className="p-4 text-center">Qty</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {leads.map(lead => (
                                    <tr key={lead.id} className="hover:bg-gray-50">
                                        <td className="p-4 text-gray-600 text-sm">
                                            {new Date(lead.createdAt).toLocaleString('en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="p-4">
                                            <p className="font-semibold text-gray-900">{lead.vehicleName}</p>
                                            <p className="text-sm text-gray-500">{lead.packageName}</p>
                                        </td>
                                        <td className="p-4 font-medium text-gray-900">{new Date(lead.rentalDate).toLocaleDateString()}</td>
                                        <td className="p-4 text-center">{lead.quantity}</td>
                                        <td className="p-4 text-center">
                                            <span className={`px-3 py-1 inline-flex items-center gap-1 rounded-full text-xs font-semibold ${lead.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                lead.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            {lead.status === 'Pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdateStatus(lead.id, 'Completed')}
                                                        className="text-green-600 hover:text-green-800 bg-green-50 p-2 rounded-lg transition-colors"
                                                        title="Mark Completed"
                                                    ><CheckCircle size={18} /></button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(lead.id, 'Canceled')}
                                                        className="text-red-600 hover:text-red-800 bg-red-50 p-2 rounded-lg transition-colors"
                                                        title="Mark Canceled"
                                                    ><XCircle size={18} /></button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
