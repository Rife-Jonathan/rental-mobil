import { useState, useEffect } from 'react';
import { fetchAllVehicles, deleteVehicle, updateVehicle, createVehicle } from '../../services/api';
import { Edit, Trash2, Plus, Loader2, X, PlusCircle, Trash } from 'lucide-react';

export default function AdminFleet() {
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Default structure for new vehicle
    const initialVehicleState = {
        name: '',
        brand: 'Toyota',
        category: 'SUV',
        isAvailable: true,
        images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000'],
        specs: { transmission: 'Automatic', fuel: 'Bensin', seats: 7, year: new Date().getFullYear() },
        content: {
            description: 'Premium vehicle ready for your journey.',
            features: ['AC', 'Bluetooth Audio', 'USB Charger'],
            terms: 'No smoking, valid driver license required.',
            serviceArea: 'Jakarta & Surrounding'
        },
        pricing: [{ id: Date.now().toString(), title: 'Car Only', price: 500000, unit: '12 Hours' }]
    };
    const [formData, setFormData] = useState<any>(initialVehicleState);

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {
        setIsLoading(true);
        try {
            const data = await fetchAllVehicles();
            setVehicles(data);
        } catch (error) {
            console.error("Failed to load vehicles", error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleAvailability = async (id: string, currentStatus: boolean, vehicleData: any) => {
        try {
            const updatedData = { ...vehicleData, isAvailable: !currentStatus };
            await updateVehicle(id, updatedData);
            setVehicles(vehicles.map(v => v.id === id ? { ...v, isAvailable: !currentStatus } : v));
        } catch (error) {
            console.error("Failed to update availability", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this vehicle?')) return;
        try {
            await deleteVehicle(id);
            setVehicles(vehicles.filter(v => v.id !== id));
        } catch (error) {
            console.error("Failed to delete vehicle", error);
        }
    };

    const openAddModal = () => {
        setFormData(initialVehicleState);
        setEditingId(null);
        setIsAddModalOpen(true);
    };

    const openEditModal = (vehicle: any) => {
        setFormData(vehicle);
        setEditingId(vehicle.id);
        setIsAddModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingId) {
                await updateVehicle(editingId, formData);
            } else {
                await createVehicle(formData);
            }
            setIsAddModalOpen(false);
            setFormData(initialVehicleState);
            setEditingId(null);
            loadVehicles(); // Refresh list
        } catch (error) {
            console.error("Failed to save vehicle", error);
        } finally {
            setIsSubmitting(false);
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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Fleet Management</h1>
                <button
                    onClick={openAddModal}
                    className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    <Plus size={18} /> Add New Vehicle
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wider">
                                <th className="p-4">Vehicle</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Starting Price</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {vehicles.map((v) => (
                                <tr key={v.id} className="hover:bg-gray-50">
                                    <td className="p-4 flex items-center gap-4">
                                        <img src={v.images[0]} alt={v.name} className="w-16 h-12 object-cover rounded" />
                                        <span className="font-semibold text-gray-900">{v.name}</span>
                                    </td>
                                    <td className="p-4 text-gray-600">{v.category}</td>
                                    <td className="p-4 text-gray-600">Rp {v.pricing[0]?.price.toLocaleString('id-ID')}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => toggleAvailability(v.id, v.isAvailable, v)}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${v.isAvailable ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                }`}
                                        >
                                            {v.isAvailable ? 'Available' : 'Out of Service'}
                                        </button>
                                    </td>
                                    <td className="p-4 text-right space-x-3">
                                        <button onClick={() => openEditModal(v)} className="text-blue-600 hover:text-blue-800" title="Edit Vehicle"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(v.id)} className="text-red-500 hover:text-red-700" title="Delete Vehicle"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Vehicle Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Basic Details */}
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">Basic Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name</label>
                                        <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none" placeholder="e.g. Toyota Innova Reborn" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                                        <input required type="text" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none">
                                            <option value="SUV">SUV</option>
                                            <option value="MPV">MPV</option>
                                            <option value="Sedan">Sedan</option>
                                            <option value="Minibus">Minibus</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                        <input required type="text" value={formData.images[0]} onChange={e => setFormData({ ...formData, images: [e.target.value] })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Specifications */}
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">Specifications</h3>
                                <div className="grid grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                                        <select value={formData.specs.transmission} onChange={e => setFormData({ ...formData, specs: { ...formData.specs, transmission: e.target.value } })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none text-sm">
                                            <option value="Automatic">Automatic</option>
                                            <option value="Manual">Manual</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fuel</label>
                                        <input required type="text" value={formData.specs.fuel} onChange={e => setFormData({ ...formData, specs: { ...formData.specs, fuel: e.target.value } })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Seats</label>
                                        <input required type="number" min="1" value={formData.specs.seats} onChange={e => setFormData({ ...formData, specs: { ...formData.specs, seats: parseInt(e.target.value) } })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                        <input required type="number" min="2000" value={formData.specs.year} onChange={e => setFormData({ ...formData, specs: { ...formData.specs, year: parseInt(e.target.value) } })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none text-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* Content Details */}
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">Content Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea required rows={2} value={formData.content.description} onChange={e => setFormData({ ...formData, content: { ...formData.content, description: e.target.value } })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                                        <input required type="text" value={formData.content.features.join(', ')} onChange={e => setFormData({ ...formData, content: { ...formData.content, features: e.target.value.split(',').map((f: string) => f.trim()) } })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none text-sm" placeholder="AC, Bluetooth, USB" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Terms</label>
                                            <textarea required rows={2} value={formData.content.terms} onChange={e => setFormData({ ...formData, content: { ...formData.content, terms: e.target.value } })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Area</label>
                                            <textarea required rows={2} value={formData.content.serviceArea} onChange={e => setFormData({ ...formData, content: { ...formData.content, serviceArea: e.target.value } })} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing Packages */}
                            <div>
                                <div className="flex justify-between items-center mb-3 border-b pb-2">
                                    <h3 className="font-semibold text-gray-800">Pricing Packages</h3>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newPkg = { id: Date.now().toString(), title: 'New Package', price: 0, unit: '1 Hari' };
                                            setFormData({ ...formData, pricing: [...formData.pricing, newPkg] });
                                        }}
                                        className="text-xs font-semibold text-primary hover:text-blue-700 flex items-center gap-1"
                                    >
                                        <PlusCircle size={14} /> Add Package
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {formData.pricing.map((pkg: any, index: number) => (
                                        <div key={pkg.id || index} className="flex gap-3 items-end bg-gray-50 p-3 rounded border border-gray-200">
                                            <div className="flex-1">
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Package Title</label>
                                                <input required type="text" value={pkg.title} onChange={e => {
                                                    const newPricing = [...formData.pricing];
                                                    newPricing[index].title = e.target.value;
                                                    setFormData({ ...formData, pricing: newPricing });
                                                }} className="w-full border border-gray-300 rounded p-1.5 focus:ring-primary outline-none text-sm" />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Price (Rp)</label>
                                                <input required type="number" min="0" value={pkg.price} onChange={e => {
                                                    const newPricing = [...formData.pricing];
                                                    newPricing[index].price = parseInt(e.target.value) || 0;
                                                    setFormData({ ...formData, pricing: newPricing });
                                                }} className="w-full border border-gray-300 rounded p-1.5 focus:ring-primary outline-none text-sm" />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-xs font-medium text-gray-700 mb-1">Unit</label>
                                                <input required type="text" value={pkg.unit} onChange={e => {
                                                    const newPricing = [...formData.pricing];
                                                    newPricing[index].unit = e.target.value;
                                                    setFormData({ ...formData, pricing: newPricing });
                                                }} className="w-full border border-gray-300 rounded p-1.5 focus:ring-primary outline-none text-sm" />
                                            </div>
                                            {formData.pricing.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newPricing = formData.pricing.filter((_: any, i: number) => i !== index);
                                                        setFormData({ ...formData, pricing: newPricing });
                                                    }}
                                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors mb-0.5"
                                                    title="Remove Package"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                                    {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                                    Save Vehicle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
