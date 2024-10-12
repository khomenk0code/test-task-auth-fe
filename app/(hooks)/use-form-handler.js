import { useApiRequest } from "@/app/(hooks)/use-api-request";
import { useState } from "react";

export function useFormHandler(initialState, endpoint, method = 'POST', onSuccess = () => {}) {
    const [formData, setFormData] = useState(initialState);
    const { makeRequest, loading, error, setError } = useApiRequest(endpoint, method);

    const handleChange = (e) => {
        if (e?.target?.name && e.target.value !== undefined) {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            console.error('Invalid event structure', e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const filteredFormData = { ...formData };
        delete filteredFormData.passwordConfirm;

        try {
            const result = await makeRequest(filteredFormData);
            onSuccess(result);
        } catch (error) {
            console.error('API request failed', error);
        }
    };

    return { formData, handleChange, handleSubmit, loading, error, setError };
}
