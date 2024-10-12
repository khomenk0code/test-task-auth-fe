"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ModeToggle } from "@/app/(components)/toggle-button";
import { useUser } from "@/app/(context)/user-context";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu"
import {guestLinks} from "@/app/(components)/(constants)/header-links"

export default function Header() {
    const { user, setUser } = useUser();

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <header className="p-4 border-b-2 mb-2 w-full flex items-center justify-center bg-background">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-xl font-bold text-foreground">Test Auth App</h1>
                </Link>

                <NavigationMenu className="flex items-center">
                    <NavigationMenuList>
                        {user ? (
                            <>
                                <NavigationMenuItem className="mr-4 text-foreground font-semibold max-w-[200px] truncate">
                                    Logged as: {user.username}
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Button variant="destructive" className="mr-2" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </NavigationMenuItem>
                            </>
                        ) : (
                            guestLinks.map((link) => (
                                <NavigationMenuItem key={link.href}>
                                    <Link href={link.href}>
                                        <NavigationMenuLink asChild>
                                            <Button variant="link" className="text-foreground">
                                                {link.label}
                                            </Button>
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))
                        )}
                        <NavigationMenuItem>
                            <ModeToggle />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    );
}
