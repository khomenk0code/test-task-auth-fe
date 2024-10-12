import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function UserNoLoggedIn() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="p-6 space-y-4 max-w-md">
                <h2 className="text-2xl font-semibold">You are not logged in</h2>
                <p>Please login or register to view your profile.</p>
                <div className="space-y-2">
                    <Link href="/">
                        <Button className="w-full m-2">Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button className="w-full m-2">Register</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}
