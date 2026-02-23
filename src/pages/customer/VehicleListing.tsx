import { fetchVehicles } from '../../services/api';
import { Link } from 'react-router-dom';
import { Calendar, Users, Fuel, Gauge, Search, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Vehicle } from '../../types';

export default function VehicleListing() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchVehicles()
            .then(data => {
                setVehicles(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const filteredVehicles = vehicles.filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-secondary">Our Fleet</h1>
                        <p className="text-gray-600 mt-2">Find the perfect vehicle for your needs.</p>
                    </div>

                    <div className="w-full md:w-72 relative">
                        <input
                            type="text"
                            placeholder="Search vehicles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-primary" size={48} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filteredVehicles.map(vehicle => (
                            <div key={vehicle.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
                                <div className="h-56 overflow-hidden relative">
                                    <div className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-bold px-3 py-1 rounded">
                                        {vehicle.brand}
                                    </div>
                                    <img src={vehicle.images[0]} alt={vehicle.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{vehicle.name}</h3>
                                            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1 inline-block">{vehicle.category}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                                        <div className="flex items-center gap-2"><Gauge size={16} className="text-primary" /> {vehicle.specs.transmission}</div>
                                        <div className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {vehicle.specs.year}</div>
                                        <div className="flex items-center gap-2"><Fuel size={16} className="text-primary" /> {vehicle.specs.fuel}</div>
                                        <div className="flex items-center gap-2"><Users size={16} className="text-primary" /> {vehicle.specs.seats} Kursi</div>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="text-gray-500 text-sm mb-1">Start from</div>
                                        <div className="text-2xl font-bold text-gray-900 mb-4">Rp {vehicle.pricing[0]?.price.toLocaleString('id-ID')} <span className="text-sm font-normal text-gray-500">/{vehicle.pricing[0]?.unit}</span></div>

                                        <div className="flex gap-2">
                                            <Link to={`/vehicles/${vehicle.id}`} className="flex-1 bg-primary hover:brightness-90 text-white text-center py-2.5 rounded-lg font-medium transition-colors">
                                                Lihat Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
