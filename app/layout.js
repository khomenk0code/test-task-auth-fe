import './globals.css';
import Header from "@/app/(components)/header";
import { UserProvider } from "@/app/(context)/user-context";
import { ThemeProvider } from "@/app/(components)/theme-toggle";
import ErrorBoundary from "@/app/(components)/error-boundary"

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <UserProvider>
            <ErrorBoundary>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Header />
                    {children}
                </ThemeProvider>
            </ErrorBoundary>
        </UserProvider>
        </body>
        </html>
    );
}
