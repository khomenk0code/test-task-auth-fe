import axios from "@/lib/axios";
import { filterEmptyFields } from "@/app/(utils)/utils";
import { z } from 'zod';

// Zod schema for validation
export const profileSchema = z.object({
    username: z.string().min(1, "Username cannot be empty").max(50, "Username is too long").optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(6, "Password is too short (minimum 6 characters)").optional(),
});

// Update profile data function
export const updateProfileData = async (
    profileData,
    originalProfileData,
    userId, // Accept userId as a parameter
    setUser,
    setSuccess,
    setEditField,
    setError,
    setProfileData,
    setLoading
) => {
    if (!userId) {
        setError("User ID is missing. Please refresh and try again.");
        return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
        const changedFields = Object.keys(profileData).reduce((acc, key) => {
            if (profileData[key] !== originalProfileData[key] && profileData[key]) {
                acc[key] = profileData[key];
            }
            return acc;
        }, {});

        // Run Zod validation
        profileSchema.parse(changedFields);

        const filteredData = filterEmptyFields(changedFields);

        if (Object.keys(filteredData).length > 0) {
            const updateData = { userId, ...filteredData };

            // Make PUT request to update user data
            const response = await axios.put('/user/update', updateData);

            // Handle both userId and _id
            const updatedUser = {
                ...response.data,
                userId: response.data._id || response.data.userId, // Ensure userId consistency
            };

            // Update the user context and localStorage
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            setSuccess(true);
            setEditField(null);
            setProfileData(updatedUser); // Set the updated profile data
        } else {
            setError('No changes to update.');
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Map Zod validation errors to a single string message
            const validationErrors = error.errors.map(e => `${e.path[0]}: ${e.message}`).join(', ');
            setError(validationErrors);
        } else {
            const backendErrorMessage = error.response?.data?.message;
            setError(Array.isArray(backendErrorMessage)
                ? backendErrorMessage.join(', ')
                : backendErrorMessage || 'An error occurred while updating the profile.');
        }
    } finally {
        setLoading(false);
    }
};

export const changePassword = async (
    profileData,
    userId,
    setProfileData,
    setSuccess,
    setError,
    setLoading
) => {
    if (!userId) {
        setError("User ID is missing. Please refresh and try again.");
        return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
        const filteredPassword = filterEmptyFields({ password: profileData.password });

        if (filteredPassword.password) {
            await axios.put('/user/update', {
                userId,
                password: filteredPassword.password,
            });

            // Clear the password field after successful update
            setProfileData({ ...profileData, password: '' });
            setSuccess(true);
        } else {
            setError('Password cannot be empty.');
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Map Zod validation errors to a single string message
            const validationErrors = error.errors.map(e => `${e.path[0]}: ${e.message}`).join(', ');
            setError(validationErrors);
        } else {
            const backendErrorMessage = error.response?.data?.message;
            setError(Array.isArray(backendErrorMessage)
                ? backendErrorMessage.join(', ')
                : backendErrorMessage || 'An error occurred while updating the password.');
        }
    } finally {
        setLoading(false);
    }
};
