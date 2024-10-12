import { Button } from '@/components/ui/button';
import { ErrorMessage } from "@/app/(components)/register/register-error";
import { RegisterFormInput } from "@/app/(components)/register/register-input";

export function RegisterForm({ formData, handleChange, handleSubmit, error, loading }) {
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-foreground p-8 rounded-lg shadow-md space-y-6 border-foreground border-2 w-full max-w-3xl"
        >
            <h2 className="text-3xl font-bold text-center">Register</h2>

            <ErrorMessage error={error} />

            <RegisterFormInput
                id="username"
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
            />
            <RegisterFormInput
                id="email"
                name="email"
                label="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <RegisterFormInput
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />
            <RegisterFormInput
                id="passwordConfirm"
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                value={formData.passwordConfirm}
                onChange={handleChange}
            />

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
            </Button>
        </form>
    );
}
