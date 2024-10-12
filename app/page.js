'use client';

import {useEffect, useState} from 'react';
import { useUser } from "@/app/(context)/user-context";
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useApiRequest } from '@/app/(hooks)/use-api-request';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: 'testuser7',
        password: 'strongpassword',
    });
    const { user, setUser } = useUser();
    const router = useRouter();

    const { error, loading, makeRequest, setError } = useApiRequest('/auth/login', 'POST');

    useEffect(() => {
        if (user) {
            router.push('/profile');
        }
    }, [user, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const responseData = await makeRequest(formData);
            setUser(responseData);
            router.push('/profile');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <form onSubmit={handleSubmit} className="bg-background text-foreground p-6 rounded shadow-md space-y-4">
                <h2 className="text-2xl font-bold dark:text-white">Login</h2>

                {error && <p className="text-red-500">{error}</p>}

                <div>
                    <Label htmlFor="username" className="text-foreground">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full bg-background text-foreground mt-2"
                    />
                </div>
                <div>
                    <Label className="text-foreground" htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-background text-foreground mt-2"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
                <p className="text-sm text-foreground">
                    Don&#39;t have an account? <a href="/register" className="text-blue-500">Register</a>
                </p>
            </form>
        </div>
    );
}
