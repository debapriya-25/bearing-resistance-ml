import axios from 'axios';

const API_URL = "https://bearing-resistance-backend.onrender.com";

export const predict = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/predict`, data);
        return response.data;
    } catch (error) {
        console.error("Error making prediction request", error);
        throw error;
    }
};
