import AppHeader from '@/Components/AppHeader';
import AppFooter from '@/Components/AppFooter';
import FlashToast from '@/Components/FlashToast';

// Layout publik (Konteks_A) untuk halaman React+Inertia.
export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <FlashToast />
            <AppHeader />
            <main>{children}</main>
            <AppFooter />
        </div>
    );
}
