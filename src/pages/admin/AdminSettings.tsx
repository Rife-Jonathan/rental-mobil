import { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { updateSettingsAPI } from '../../services/api';
import { Loader2, PlusCircle, Trash } from 'lucide-react';

export default function AdminSettings() {
    const { settings, updateSettings } = useSettings();

    // Local state for the form so we only apply on Save
    const [formData, setFormData] = useState(settings);
    const [successMsg, setSuccessMsg] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateSettingsAPI(formData);
            updateSettings(formData);
            setSuccessMsg('Settings updated successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (error) {
            console.error("Failed to update settings", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">White-Label Settings</h1>
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Brand, Colors, Contact, SEO */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Brand Identity */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">Brand Identity</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                <input
                                    type="text"
                                    value={formData.companyName}
                                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                                <input
                                    type="text"
                                    value={formData.logoUrl}
                                    onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Colors */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">Theme Colors</h2>
                        <p className="text-sm text-gray-500 mb-4">These colors will instantly update the overall look and feel of the customer-facing site.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={formData.colors.primary}
                                        onChange={e => setFormData({ ...formData, colors: { ...formData.colors, primary: e.target.value } })}
                                        className="w-12 h-12 rounded cursor-pointer border-0 p-0"
                                    />
                                    <input
                                        type="text"
                                        value={formData.colors.primary}
                                        onChange={e => setFormData({ ...formData, colors: { ...formData.colors, primary: e.target.value } })}
                                        className="flex-1 border border-gray-300 rounded-lg p-2 outline-none font-mono uppercase text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={formData.colors.secondary}
                                        onChange={e => setFormData({ ...formData, colors: { ...formData.colors, secondary: e.target.value } })}
                                        className="w-12 h-12 rounded cursor-pointer border-0 p-0"
                                    />
                                    <input
                                        type="text"
                                        value={formData.colors.secondary}
                                        onChange={e => setFormData({ ...formData, colors: { ...formData.colors, secondary: e.target.value } })}
                                        className="flex-1 border border-gray-300 rounded-lg p-2 outline-none font-mono uppercase text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={formData.colors.accent}
                                        onChange={e => setFormData({ ...formData, colors: { ...formData.colors, accent: e.target.value } })}
                                        className="w-12 h-12 rounded cursor-pointer border-0 p-0"
                                    />
                                    <input
                                        type="text"
                                        value={formData.colors.accent}
                                        onChange={e => setFormData({ ...formData, colors: { ...formData.colors, accent: e.target.value } })}
                                        className="flex-1 border border-gray-300 rounded-lg p-2 outline-none font-mono uppercase text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
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

                    {/* SEO Settings */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">SEO Settings</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Global Meta Title</label>
                                <input
                                    type="text"
                                    value={formData.seo.title}
                                    onChange={e => setFormData({ ...formData, seo: { ...formData.seo, title: e.target.value } })}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Global Meta Description</label>
                                <textarea
                                    value={formData.seo.description}
                                    onChange={e => setFormData({ ...formData, seo: { ...formData.seo, description: e.target.value } })}
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                    rows={3}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                </div>
                {/* Right Column: Landing Page Content */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Landing Page Content */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-6">Landing Page Copywriting</h2>
                        <div className="space-y-8">
                            {/* Hero */}
                            <div>
                                <h3 className="text-md font-semibold text-gray-800 mb-3">Hero Section</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Headline</label>
                                        <input
                                            type="text"
                                            value={formData.landingPage.heroTitle}
                                            onChange={e => setFormData({ ...formData, landingPage: { ...formData.landingPage, heroTitle: e.target.value } })}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Sub-headline</label>
                                        <input
                                            type="text"
                                            value={formData.landingPage.heroSubtitle}
                                            onChange={e => setFormData({ ...formData, landingPage: { ...formData.landingPage, heroSubtitle: e.target.value } })}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Benefits */}
                            <div>
                                <h3 className="text-md font-semibold text-gray-800 mb-3">Benefits Section</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={formData.landingPage.benefitTitle}
                                            onChange={e => setFormData({ ...formData, landingPage: { ...formData.landingPage, benefitTitle: e.target.value } })}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
                                        <input
                                            type="text"
                                            value={formData.landingPage.benefitSubtitle}
                                            onChange={e => setFormData({ ...formData, landingPage: { ...formData.landingPage, benefitSubtitle: e.target.value } })}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700">Benefit Cards Settings</h4>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newBenefit = { title: 'New Benefit', description: 'Benefit Description', icon: 'ShieldCheck' as any };
                                            const currentBenefits = formData.landingPage.benefits || [];
                                            setFormData({ ...formData, landingPage: { ...formData.landingPage, benefits: [...currentBenefits, newBenefit] } });
                                        }}
                                        className="text-xs font-semibold text-primary hover:text-blue-700 flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full transition-colors"
                                    >
                                        <PlusCircle size={14} /> Add Benefit Card
                                    </button>
                                </div>

                                <div className="space-y-5">
                                    {formData.landingPage.benefits?.map((benefit, index) => (
                                        <div key={index} className="relative group bg-white shadow-sm border border-gray-200 rounded-lg p-4 transition-all hover:border-primary/40 hover:shadow-md">
                                            <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {formData.landingPage.benefits.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newBenefits = formData.landingPage.benefits.filter((_, i) => i !== index);
                                                            setFormData({ ...formData, landingPage: { ...formData.landingPage, benefits: newBenefits } });
                                                        }}
                                                        className="bg-red-500 text-white hover:bg-red-600 p-1.5 rounded-full shadow-md transition-transform hover:scale-110"
                                                        title="Remove Benefit"
                                                    >
                                                        <Trash size={14} />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                                <div className="md:col-span-3">
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Card Title {index + 1}</label>
                                                    <input
                                                        type="text"
                                                        value={benefit.title}
                                                        onChange={e => {
                                                            const newBenefits = [...formData.landingPage.benefits];
                                                            newBenefits[index].title = e.target.value;
                                                            setFormData({ ...formData, landingPage: { ...formData.landingPage, benefits: newBenefits } });
                                                        }}
                                                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm bg-gray-50 focus:bg-white transition-colors"
                                                    />
                                                </div>
                                                <div className="md:col-span-6">
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                                                    <textarea
                                                        value={benefit.description}
                                                        rows={2}
                                                        onChange={e => {
                                                            const newBenefits = [...formData.landingPage.benefits];
                                                            newBenefits[index].description = e.target.value;
                                                            setFormData({ ...formData, landingPage: { ...formData.landingPage, benefits: newBenefits } });
                                                        }}
                                                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm bg-gray-50 focus:bg-white transition-colors resize-none"
                                                    />
                                                </div>
                                                <div className="md:col-span-3">
                                                    <label className="block text-xs font-medium text-gray-700 mb-1">Icon</label>
                                                    <select
                                                        value={benefit.icon}
                                                        onChange={e => {
                                                            const newBenefits = [...formData.landingPage.benefits];
                                                            newBenefits[index].icon = e.target.value as any;
                                                            setFormData({ ...formData, landingPage: { ...formData.landingPage, benefits: newBenefits } });
                                                        }}
                                                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm bg-gray-50 focus:bg-white transition-colors"
                                                    >
                                                        <option value="ShieldCheck">Shield</option>
                                                        <option value="Clock">Clock</option>
                                                        <option value="CreditCard">Credit Card</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Fleet */}
                            <div>
                                <h3 className="text-md font-semibold text-gray-800 mb-3">Popular Fleet Section</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={formData.landingPage.fleetTitle}
                                            onChange={e => setFormData({ ...formData, landingPage: { ...formData.landingPage, fleetTitle: e.target.value } })}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label>
                                        <input
                                            type="text"
                                            value={formData.landingPage.fleetSubtitle}
                                            onChange={e => setFormData({ ...formData, landingPage: { ...formData.landingPage, fleetSubtitle: e.target.value } })}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Blog & FAQ */}
                            <div>
                                <h3 className="text-md font-semibold text-gray-800 mb-3">Blog & FAQ Sections</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Blog Title</label>
                                        <input
                                            type="text"
                                            value={formData.landingPage.blogTitle}
                                            onChange={e => setFormData({ ...formData, landingPage: { ...formData.landingPage, blogTitle: e.target.value } })}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Blog Subtitle</label>
                                        <input
                                            type="text"
                                            value={formData.landingPage.blogSubtitle}
                                            onChange={e => setFormData({ ...formData, landingPage: { ...formData.landingPage, blogSubtitle: e.target.value } })}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">FAQ Title</label>
                                        <input
                                            type="text"
                                            value={formData.landingPage.faqTitle}
                                            onChange={e => setFormData({ ...formData, landingPage: { ...formData.landingPage, faqTitle: e.target.value } })}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none mb-4"
                                        />

                                        <div className="flex justify-between items-center mb-4 mt-6 border-t border-gray-100 pt-6">
                                            <h4 className="text-sm font-semibold text-gray-700">FAQ List</h4>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newFaq = { question: 'New Question?', answer: 'New Answer' };
                                                    const currentFaqs = formData.landingPage.faqs || [];
                                                    setFormData({ ...formData, landingPage: { ...formData.landingPage, faqs: [...currentFaqs, newFaq] } });
                                                }}
                                                className="text-xs font-semibold text-primary hover:text-blue-700 flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full transition-colors"
                                            >
                                                <PlusCircle size={14} /> Add FAQ
                                            </button>
                                        </div>

                                        <div className="space-y-5">
                                            {formData.landingPage.faqs?.map((faq, index) => (
                                                <div key={index} className="relative group bg-white shadow-sm border border-gray-200 rounded-lg p-4 transition-all hover:border-primary/40 hover:shadow-md">
                                                    <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {formData.landingPage.faqs.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newFaqs = formData.landingPage.faqs.filter((_, i) => i !== index);
                                                                    setFormData({ ...formData, landingPage: { ...formData.landingPage, faqs: newFaqs } });
                                                                }}
                                                                className="bg-red-500 text-white hover:bg-red-600 p-1.5 rounded-full shadow-md transition-transform hover:scale-110"
                                                                title="Remove FAQ"
                                                            >
                                                                <Trash size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                                        <div className="md:col-span-4">
                                                            <label className="block text-xs font-medium text-gray-700 mb-1">Question {index + 1}</label>
                                                            <input
                                                                type="text"
                                                                value={faq.question}
                                                                onChange={e => {
                                                                    const newFaqs = [...formData.landingPage.faqs];
                                                                    newFaqs[index].question = e.target.value;
                                                                    setFormData({ ...formData, landingPage: { ...formData.landingPage, faqs: newFaqs } });
                                                                }}
                                                                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm bg-gray-50 focus:bg-white transition-colors"
                                                            />
                                                        </div>
                                                        <div className="md:col-span-8">
                                                            <label className="block text-xs font-medium text-gray-700 mb-1">Answer</label>
                                                            <textarea
                                                                value={faq.answer}
                                                                rows={2}
                                                                onChange={e => {
                                                                    const newFaqs = [...formData.landingPage.faqs];
                                                                    newFaqs[index].answer = e.target.value;
                                                                    setFormData({ ...formData, landingPage: { ...formData.landingPage, faqs: newFaqs } });
                                                                }}
                                                                className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm bg-gray-50 focus:bg-white transition-colors resize-none"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Footer & Global Notices */}
                            <div>
                                <h3 className="text-md font-semibold text-gray-800 mb-3">Footer Copoy & Global Notices</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Vehicle Details Booking Notice</label>
                                        <textarea
                                            value={formData.landingPage.bookingNotice}
                                            onChange={e => setFormData({ ...formData, landingPage: { ...formData.landingPage, bookingNotice: e.target.value } })}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                            rows={2}
                                            placeholder="Text shown directly above the booking form."
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Company Description</label>
                                        <textarea
                                            value={formData.landingPage.footerDescription}
                                            onChange={e => setFormData({ ...formData, landingPage: { ...formData.landingPage, footerDescription: e.target.value } })}
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary outline-none"
                                            rows={2}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
