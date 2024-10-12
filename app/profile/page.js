"use client";

import { useEffect, useState } from 'react';
import { useUser } from '@/app/(context)/user-context';
import { Card } from '@/components/ui/card';
import UserNoLoggedIn from '@/app/(components)/no-user';
import ProfileLoader from '@/app/(components)/profile/profile-loader';
import { ProfileFormFields } from "@/app/(components)/profile/profile-form-fields";
import { ProfileFormFeedback } from "@/app/(components)/profile/profile-form-feedback";
import { updateProfileData, changePassword } from "@/app/(utils)/update-user-data";

export default function ProfilePage() {
    const { user, setUser } = useUser();

    const [editField, setEditField] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [originalProfileData, setOriginalProfileData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        password: '',
    });
    const [profileData, setProfileData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        password: '',
    });

    useEffect(() => {
        if (user) {
            setOriginalProfileData({
                username: user?.username || '',
                email: user?.email || '',
                password: '',
            });
            setProfileData({
                username: user?.username || '',
                email: user?.email || '',
                password: '',
            });
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        const userId = user?._id || user?.userId;
        if (userId) {
            try {
                await updateProfileData(
                    profileData,
                    originalProfileData,
                    userId,
                    setUser,
                    setSuccess,
                    setEditField,
                    setError,
                    setProfileData,
                    setLoading
                );
            } catch (err) {
                setError('An error occurred during profile update.');
            }
        } else {
            setError('User ID is missing.');
        }
    };

    const handlePasswordChange = async () => {
        const userId = user?._id || user?.userId;
        if (userId && profileData.password) {
            try {
                await changePassword(
                    profileData,
                    userId,
                    setProfileData,
                    setSuccess,
                    setError,
                    setLoading
                );
            } catch (err) {
                setError('An error occurred during password change.');
            }
        } else {
            setError('Password is required to change.');
        }
    };

    if (!user) {
        return <UserNoLoggedIn />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="p-8 rounded-lg shadow-md space-y-6 border-foreground border-2 w-full max-w-3xl">
                <h2 className="text-3xl font-bold text-center">Profile</h2>

                <ProfileFormFeedback error={error} success={success} />
                <ProfileLoader user={user} setProfileData={setProfileData} />

                <ProfileFormFields
                    editField={editField}
                    setEditField={setEditField}
                    profileData={profileData}
                    handleChange={(e) => {
                        const { name, value } = e.target;
                        setProfileData({
                            ...profileData,
                            [name]: value,
                        });
                    }}
                    handleUpdate={handleUpdateProfile}
                    handlePasswordChange={handlePasswordChange}
                    handleCancel={() => {
                        setProfileData(originalProfileData);
                        setEditField(null);
                    }}
                    loading={loading}
                />
            </Card>
        </div>
    );
}
