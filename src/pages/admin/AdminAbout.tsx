import { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { updateSettingsAPI } from '../../services/api';
import { Loader2 } from 'lucide-react';

export default function AdminAbout() {
    const { settings, updateSettings } = useSettings();
    const [formData, setFormData] = useState(settings);
    const [successMsg, setSuccessMsg] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateSettingsAPI(formData);
            updateSettings(formData);
            setSuccessMsg('About Page updated successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (error) {
            console.error("Failed to update about page settings", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">About Page Content</h1>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                    {isSaving && <Loader2 className="animate-spin" size={18} />}
                    Save Changes
                </button>
            </div>

            {successMsg && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                    {successMsg}
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                        <p className="text-xs text-gray-500 mb-2">The short paragraph shown directly below the "About [Company]" header.</p>
                        <textarea
                            value={formData.aboutPage.heroSubtitle}
                            onChange={e => setFormData({ ...formData, aboutPage: { ...formData.aboutPage, heroSubtitle: e.target.value } })}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary outline-none resize-none"
                            rows={2}
                        />
                    </div>

                    <hr className="border-gray-100" />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content Paragraph 1 (Introduction)</label>
                        <p className="text-xs text-gray-500 mb-2">First paragraph detailing your mission or background.</p>
                        <textarea
                            value={formData.aboutPage.content1}
                            onChange={e => setFormData({ ...formData, aboutPage: { ...formData.aboutPage, content1: e.target.value } })}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary outline-none"
                            rows={4}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content Paragraph 2 (Details/Fleet)</label>
                        <p className="text-xs text-gray-500 mb-2">Second paragraph highlighting your services, vehicles, and commitment.</p>
                        <textarea
                            value={formData.aboutPage.content2}
                            onChange={e => setFormData({ ...formData, aboutPage: { ...formData.aboutPage, content2: e.target.value } })}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-primary outline-none"
                            rows={4}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
                <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">Contact Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number (e.g. 628123...)</label>
                        <input
                            type="text"
                            value={formData.whatsappNumber}
                            onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hotline / Phone</label>
                        <input
                            type="text"
                            value={formData.hotline}
                            onChange={e => setFormData({ ...formData, hotline: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">HQ Address</label>
                    <textarea
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                        rows={2}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}
