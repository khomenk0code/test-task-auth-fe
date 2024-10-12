import { useEffect } from 'react';

export default function ProfileLoader({ user, setProfileData }) {
    useEffect(() => {
        if (user) {
            setProfileData({
                username: user.username,
                email: user.email,
                password: '',
            });
        }
    }, [user, setProfileData]);

    return null;
}
