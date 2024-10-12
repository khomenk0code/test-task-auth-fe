"use client"
import { useRouter } from 'next/navigation';
import { useUser } from "@/app/(context)/user-context";
import { useFormHandler } from "@/app/(hooks)/use-form-handler";
import { debounce } from 'lodash';
import {useCallback, useEffect} from 'react';
import { validatePasswords } from "@/app/(utils)/utils";
import {RegisterForm} from "@/app/(components)/register/register-form"

export default function RegisterPage() {
    const { user, setUser } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/profile');
        }
    }, [user, router]);

    const { formData, handleChange, handleSubmit, error, loading, setError } = useFormHandler(
        {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        '/auth/register',
        'POST',
        (data) => {
            setUser(data);
            router.push('/profile');
        }
    );

    const debouncedHandleSubmit = useCallback(debounce(handleSubmit, 500), [handleSubmit]);

    const handleSubmitWithValidation = (e) => {
        if (validatePasswords(formData, setError, e)) {
            debouncedHandleSubmit(e);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <RegisterForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmitWithValidation}
                error={error}
                loading={loading}
            />
        </div>
    );
}
