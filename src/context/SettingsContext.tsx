import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppSettings } from '../types';
import { mockSettings } from '../services/mockData';
import { fetchSettings } from '../services/api';

interface SettingsContextType {
    settings: AppSettings;
    updateSettings: (newSettings: AppSettings) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<AppSettings>(() => {
        const saved = localStorage.getItem('rentflow_settings');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge with mockSettings to ensure no deep properties are missing (like landingPage)
                if (parsed && parsed.landingPage) {
                    return { ...mockSettings, ...parsed, landingPage: { ...mockSettings.landingPage, ...parsed.landingPage }, aboutPage: { ...mockSettings.aboutPage, ...parsed.aboutPage } };
                }
            } catch (e) {
                console.error("Failed to parse settings from local storage", e);
            }
        }
        return mockSettings;
    });

    useEffect(() => {
        // Fetch fresh settings from DB on app load
        fetchSettings().then(data => {
            setSettings(data);
        }).catch(err => console.error("Failed to load settings from DB:", err));
    }, []);

    useEffect(() => {
        localStorage.setItem('rentflow_settings', JSON.stringify(settings));

        // Apply Dynamic Theme Colors to document root
        const root = document.documentElement;
        root.style.setProperty('--color-primary', settings.colors.primary);
        root.style.setProperty('--color-secondary', settings.colors.secondary);
        root.style.setProperty('--color-accent', settings.colors.accent);

        // Update SEO dynamically
        document.title = settings.seo.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', settings.seo.description);
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = settings.seo.description;
            document.head.appendChild(meta);
        }
    }, [settings]);

    const updateSettings = (newSettings: AppSettings) => setSettings(newSettings);

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useSettings must be used within SettingsProvider');
    return context;
};
