import { useState } from 'react';
import axios from '@/lib/axios';

export function useApiRequest(endpoint, method = 'POST') {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const makeRequest = async (payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios({
                url: endpoint,
                method: method.toLowerCase(),
                data: payload,
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'An error occurred, server doesn\'t response.';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, makeRequest, setError };
}
