import AppHeader from '@/Components/AppHeader';
import FlashToast from '@/Components/FlashToast';

// Layout publik (Konteks_A) untuk halaman React+Inertia.
export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <FlashToast />
            <AppHeader />
            <main>{children}</main>
            <footer className="mt-20 bg-gray-950 text-gray-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-sm">
                    <p className="text-lg font-extrabold mb-2">
                        <span className="text-white">Belajar</span>
                        <span className="text-indigo-400">KUY</span>
                    </p>
                    <p className="text-gray-400">Belajar online kapan saja, di mana saja.</p>
                    <p className="mt-6 text-gray-500">&copy; {new Date().getFullYear()} BelajarKUY. Syarat &amp; Ketentuan · Kebijakan Privasi</p>
                </div>
            </footer>
        </div>
    );
}
