const API_BASE_URL = 'http://localhost:3000/api';

const api = {
    async createPemeriksaan(data) {
        const response = await fetch(`${API_BASE_URL}/pemeriksaan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async getAllPemeriksaan() {
        const response = await fetch(`${API_BASE_URL}/pemeriksaan`);
        return response.json();
    },

    async getLog() {
        const response = await fetch(`${API_BASE_URL}/log`);
        return response.json();
    }
}; 