export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchSettings = async () => {
    const res = await fetch(`${API_BASE_URL}/settings`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
};

export const fetchVehicles = async () => {
    const res = await fetch(`${API_BASE_URL}/vehicles`);
    if (!res.ok) throw new Error('Failed to fetch vehicles');
    return res.json();
};

export const fetchVehicleById = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/vehicles/${id}`);
    if (!res.ok) throw new Error('Failed to fetch vehicle');
    return res.json();
};

export const fetchBlogs = async () => {
    const res = await fetch(`${API_BASE_URL}/blogs`);
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
};

export const fetchBlogById = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!res.ok) throw new Error('Failed to fetch blog');
    return res.json();
};

export const fetchFaqs = async () => {
    const res = await fetch(`${API_BASE_URL}/faqs`);
    if (!res.ok) throw new Error('Failed to fetch faqs');
    return res.json();
};

export const submitLead = async (leadData: any) => {
    const res = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(leadData)
    });
    if (!res.ok) throw new Error('Failed to submit lead');
    return res.json();
};

// --- ADMIN API ENDPOINTS ---

export const fetchDashboardStats = async () => {
    const res = await fetch(`${API_BASE_URL}/admin/dashboard`);
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    return res.json();
};

export const updateSettingsAPI = async (settingsData: any) => {
    const res = await fetch(`${API_BASE_URL}/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(settingsData)
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
};

export const fetchAdminLeads = async () => {
    const res = await fetch(`${API_BASE_URL}/admin/leads`);
    if (!res.ok) throw new Error('Failed to fetch leads');
    return res.json();
};

export const updateLeadStatus = async (id: string, status: string) => {
    const res = await fetch(`${API_BASE_URL}/admin/leads/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update lead status');
    return res.json();
};

export const deleteLead = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/admin/leads/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to delete lead');
    return res.json();
};

// Vehicles
export const fetchAllVehicles = async () => {
    const res = await fetch(`${API_BASE_URL}/admin/vehicles`);
    if (!res.ok) throw new Error('Failed to fetch vehicles');
    return res.json();
};

export const createVehicle = async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/admin/vehicles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create vehicle');
    return res.json();
};

export const updateVehicle = async (id: string, data: any) => {
    const res = await fetch(`${API_BASE_URL}/admin/vehicles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update vehicle');
    return res.json();
};

export const deleteVehicle = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/admin/vehicles/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to delete vehicle');
    return res.json();
};

// Blogs
export const createBlog = async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/admin/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create blog');
    return res.json();
};

export const updateBlog = async (id: string, data: any) => {
    const res = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update blog');
    return res.json();
};

export const deleteBlog = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to delete blog');
    return res.json();
};

// FAQs
export const createFaq = async (data: any) => {
    const res = await fetch(`${API_BASE_URL}/admin/faqs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create faq');
    return res.json();
};

export const updateFaq = async (id: string, data: any) => {
    const res = await fetch(`${API_BASE_URL}/admin/faqs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update faq');
    return res.json();
};

export const deleteFaq = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/admin/faqs/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to delete faq');
    return res.json();
};
