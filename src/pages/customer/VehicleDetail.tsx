import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchVehicleById, submitLead } from '../../services/api';
import { Vehicle } from '../../types';
import { useSettings } from '../../context/SettingsContext';
import { Calendar, Users, Fuel, Gauge, CheckCircle2, AlertCircle, MessageCircle, Share2, Facebook, Link as LinkIcon, Loader2 } from 'lucide-react';

export default function VehicleDetail() {
    const { id } = useParams<{ id: string }>();
    const { settings } = useSettings();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedPackage, setSelectedPackage] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [rentalDate, setRentalDate] = useState<string>('');

    const [activeTab, setActiveTab] = useState<'description' | 'features' | 'terms' | 'serviceArea'>('description');

    const [isBooking, setIsBooking] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        fetchVehicleById(id)
            .then(data => {
                setVehicle(data);
                if (data.pricing && data.pricing.length > 0) {
                    setSelectedPackage(data.pricing[0].id);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-primary mb-4" size={48} />
                <h2 className="text-xl font-medium text-gray-600">Loading vehicle details...</h2>
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <AlertCircle size={48} className="text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Vehicle Not Found</h2>
                <p className="text-gray-500 mt-2 mb-6">The vehicle you are looking for does not exist or is currently unavailable.</p>
                <Link to="/vehicles" className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Back to Fleet
                </Link>
            </div>
        );
    }

    const selectedPkgData = vehicle.pricing.find(p => p.id === selectedPackage);
    const selectedPrice = selectedPkgData?.price || 0;

    const handleBooking = async () => {
        if (!rentalDate) {
            setError('Please select a rental date.');
            return;
        }
        setError('');
        setIsBooking(true);

        try {
            const leadData = {
                vehicleId: vehicle.id,
                pricingPackageId: selectedPackage,
                quantity: quantity,
                rentalDate: rentalDate,
                status: 'Pending'
            };

            await submitLead(leadData);

            const packageName = vehicle.pricing.find(p => p.id === selectedPackage)?.title || '';
            const message = `Halo, saya ingin menyewa *${vehicle.name}* dengan paket *${packageName}* (Jumlah: ${quantity} unit) untuk tanggal *${rentalDate}*. Apakah tersedia?`;
            const waUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.location.href = waUrl;

        } catch (err) {
            setError('Failed to process booking.');
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Main Booking UI - Dark Blue Box */}
                <div className="bg-secondary rounded-3xl overflow-hidden shadow-2xl p-6 lg:p-10 text-white flex flex-col lg:flex-row gap-10">

                    {/* Left Column: Image & Brand Tag */}
                    <div className="lg:w-1/2 relative bg-black/20 rounded-2xl flex items-center justify-center min-h-[300px] p-6">
                        <div className="absolute top-6 left-6 z-10">
                            <span className="bg-primary text-white px-4 py-1.5 rounded text-sm font-semibold tracking-wide">
                                {vehicle.brand}
                            </span>
                        </div>
                        <img src={vehicle.images[0]} alt={vehicle.name} className="w-full max-w-md object-contain mix-blend-screen drop-shadow-2xl" />
                    </div>

                    {/* Right Column: Details & Booking form */}
                    <div className="lg:w-1/2 flex flex-col justify-center">

                        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{vehicle.name}</h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 mb-6 font-medium">
                            <div className="flex items-center gap-2"><Gauge size={18} /> {vehicle.specs.transmission}</div>
                            <div className="flex items-center gap-2"><Calendar size={18} /> {vehicle.specs.year}</div>
                            <div className="flex items-center gap-2"><Fuel size={18} /> {vehicle.specs.fuel}</div>
                            <div className="flex items-center gap-2"><Users size={18} /> {vehicle.specs.seats} Kursi</div>
                        </div>

                        <div className="mb-2">
                            <span className="text-sm text-gray-300">{selectedPkgData?.title}</span>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl font-bold">Rp {selectedPrice.toLocaleString('id-ID')}</span>
                            <span className="text-sm border border-gray-400 px-3 py-1 rounded-full text-gray-300">{selectedPkgData?.unit}</span>
                        </div>

                        <p className="text-sm text-gray-400 mb-6 leading-relaxed hidden sm:block">
                            {settings.landingPage.bookingNotice}
                        </p>

                        {/* Packages List */}
                        <div className="space-y-3 mb-8">
                            {vehicle.pricing.map(pkg => {
                                const isSelected = selectedPackage === pkg.id;
                                return (
                                    <label
                                        key={pkg.id}
                                        onClick={() => setSelectedPackage(pkg.id)}
                                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-primary' : 'hover:bg-white/5 border border-white/10'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-white' : 'border-gray-500'}`}>
                                                {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                                            </div>
                                            <span className="font-medium text-sm md:text-base">{pkg.title}</span>
                                        </div>
                                        <div className="text-sm md:text-base font-semibold">
                                            Rp {pkg.price.toLocaleString('id-ID')} <span className={`text-xs ${isSelected ? 'text-primary-50 text-white/80' : 'text-gray-400'} font-normal ml-1`}>/{pkg.unit}</span>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>

                        {/* Qty & Date */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Jumlah</label>
                                <div className="flex h-11">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-11 bg-primary brightness-90 rounded-l hover:brightness-75 flex items-center justify-center text-white"
                                    >-</button>
                                    <input
                                        type="text"
                                        value={quantity}
                                        readOnly
                                        className="flex-1 w-full text-center bg-white text-gray-900 font-bold outline-none"
                                    />
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-11 bg-primary rounded-r hover:brightness-90 flex items-center justify-center text-white"
                                    >+</button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Tanggal Sewa</label>
                                <input
                                    type="date"
                                    value={rentalDate}
                                    onChange={(e) => setRentalDate(e.target.value)}
                                    className="w-full bg-white text-gray-900 h-11 rounded px-3 outline-none"
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>
                        {error && <p className="text-primary text-sm mb-4 font-medium">{error}</p>}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <button
                                onClick={handleBooking}
                                disabled={isBooking}
                                className={`py-3 px-8 rounded flex items-center justify-center gap-2 font-bold text-white transition-all w-full sm:w-auto ${isBooking ? 'bg-gray-600 cursor-not-allowed' : 'bg-primary hover:brightness-90 shadow-lg'}`}
                            >
                                <MessageCircle size={20} />
                                {isBooking ? 'Processing...' : 'Booking via Whatsapp'}
                            </button>

                            <div className="flex items-center gap-3 text-gray-400">
                                <span className="text-sm font-medium text-white">Bagikan</span>
                                <button className="hover:text-white"><Facebook size={18} /></button>
                                <button className="hover:text-white"><Share2 size={18} /></button>
                                <button className="hover:text-white"><LinkIcon size={18} /></button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Dynamic Content Tabs */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <div className="flex border-b border-gray-200 overflow-x-auto">
                        <button
                            className={`pb-4 px-4 font-medium whitespace-nowrap ${activeTab === 'description' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Deskripsi
                        </button>
                        <button
                            className={`pb-4 px-4 font-medium whitespace-nowrap ${activeTab === 'features' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('features')}
                        >
                            Fasilitas
                        </button>
                        <button
                            className={`pb-4 px-4 font-medium whitespace-nowrap ${activeTab === 'terms' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('terms')}
                        >
                            Syarat & Ketentuan
                        </button>
                        <button
                            className={`pb-4 px-4 font-medium whitespace-nowrap ${activeTab === 'serviceArea' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('serviceArea')}
                        >
                            Area Layanan
                        </button>
                    </div>

                    <div className="py-6 text-gray-600 leading-relaxed">
                        {activeTab === 'description' && <p>{vehicle.content.description}</p>}
                        {activeTab === 'features' && (
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {vehicle.content.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-green-500" /> {f}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {activeTab === 'terms' && <p className="whitespace-pre-wrap">{vehicle.content.terms}</p>}
                        {activeTab === 'serviceArea' && <p className="whitespace-pre-wrap">{vehicle.content.serviceArea}</p>}
                    </div>
                </div>

            </div>
        </div>
    );
}
