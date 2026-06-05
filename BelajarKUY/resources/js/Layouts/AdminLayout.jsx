import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import FlashToast from '@/Components/FlashToast';
import {
    LayoutDashboard, BookOpen, Star, Tag, Layers, Users,
    ShoppingCart, UserCircle, Image, Info, Handshake, Settings,
    LogOut, Menu, X, Bell, Search,
} from 'lucide-react';

const NAV_ITEMS = [
    { label: 'Dashboard',       href: '/admin/dashboard',     icon: LayoutDashboard,  route: 'admin.dashboard' },
    { label: 'Kursus',          href: '/admin/courses',        icon: BookOpen,         route: 'admin.courses.index' },
    { label: 'Moderasi Review', href: '/admin/reviews',        icon: Star,             route: 'admin.reviews.index' },
    { label: 'Kategori',        href: '/admin/categories',     icon: Tag,              route: 'admin.categories.index' },
    { label: 'Sub-Kategori',    href: '/admin/sub-categories', icon: Layers,           route: 'admin.sub-categories.index' },
    { label: 'Instruktur',      href: '/admin/instructors',    icon: UserCircle,       route: 'admin.instructors.index' },
    { label: 'Order',           href: '/admin/orders',         icon: ShoppingCart,     route: 'admin.orders.index' },
    { label: 'Pengguna',        href: '/admin/users',          icon: Users,            route: 'admin.users.index' },
    { label: 'Slider',          href: '/admin/sliders',        icon: Image,            route: 'admin.sliders.index' },
    { label: 'Info Box',        href: '/admin/info-boxes',     icon: Info,             route: 'admin.info-boxes.index' },
    { label: 'Partner',         href: '/admin/partners',       icon: Handshake,        route: 'admin.partners.index' },
    { label: 'Pengaturan Situs',href: '/admin/settings',       icon: Settings,         route: 'admin.settings.index' },
];

function AdminSidebar({ open, onClose }) {
    const { url } = usePage();
    const { auth } = usePage().props;

    function isActive(href) {
        return url.startsWith(href);
    }

    function handleLogout(e) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <>
            {/* Overlay mobile */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={onClose}
                />
            )}
            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full w-64 bg-surface border-r border-surface-variant flex flex-col py-md px-sm z-40 transition-transform duration-200 ease-in-out
                    ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                {/* Brand */}
                <div className="mb-xl px-md flex items-center gap-sm">
                    <span className="text-2xl">🚀</span>
                    <div>
                        <h1 className="font-headline-md text-headline-md font-extrabold text-primary leading-tight">
                            BelajarKUY
                        </h1>
                        <p className="font-caption text-caption text-on-surface-variant">Admin Console</p>
                    </div>
                    {/* Close button mobile */}
                    <button
                        className="ml-auto lg:hidden text-on-surface-variant p-1 hover:bg-surface-variant rounded"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav items */}
                <nav className="flex-1 space-y-xs overflow-y-auto pr-sm">
                    {NAV_ITEMS.map((item) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.route}
                                href={item.href}
                                className={`flex items-center gap-md px-md py-sm rounded-lg font-label-md text-label-md transition-colors
                                    ${active
                                        ? 'bg-background-subtle text-primary font-bold border-r-4 border-primary'
                                        : 'text-on-surface-variant hover:text-primary hover:bg-background-subtle'
                                    }`}
                            >
                                <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-primary' : ''}`} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer: user + logout */}
                <div className="mt-auto pt-md border-t border-surface-variant space-y-sm">
                    <a
                        href="#"
                        className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-background-subtle transition-colors font-label-md text-label-md"
                    >
                        <Info className="w-5 h-5" />
                        <span>Bantuan</span>
                    </a>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-md px-md py-sm rounded-lg text-error hover:bg-error-container transition-colors font-label-md text-label-md"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                    {auth?.user && (
                        <div className="px-md pt-sm flex items-center gap-md">
                            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs shrink-0">
                                {auth.user.name?.charAt(0)?.toUpperCase() ?? 'A'}
                            </div>
                            <div className="min-w-0">
                                <p className="font-label-md text-label-md font-bold text-on-surface truncate">{auth.user.name}</p>
                                <p className="font-caption text-caption text-on-surface-variant truncate">{auth.user.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}

/**
 * AdminLayout — Layout utama admin panel (L12 Quinsha, Konteks_A design tokens)
 * Desain dari admin_dashboard_overview + moderasi_kursus_admin_panel
 */
export default function AdminLayout({ children, title = 'Admin Portal' }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-on-background font-sans antialiased flex">
            <FlashToast />
            <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main content */}
            <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
                {/* TopBar */}
                <header className="bg-surface border-b border-surface-variant flex justify-between items-center h-16 px-lg sticky top-0 z-20">
                    <div className="flex items-center gap-md">
                        {/* Hamburger mobile */}
                        <button
                            className="lg:hidden p-sm text-on-surface-variant hover:bg-surface-variant rounded-full"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h2 className="font-headline-md text-headline-md font-black text-primary hidden md:block tracking-tight">
                            {title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-md">
                        {/* Search (desktop only) */}
                        <div className="relative hidden md:block">
                            <Search className="absolute left-sm top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Cari..."
                                className="bg-surface-container-high border-none rounded-full pl-xl pr-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary focus:bg-surface w-64 transition-all outline-none"
                            />
                        </div>
                        {/* Notif */}
                        <button className="relative p-sm rounded-full hover:bg-surface-variant text-on-surface-variant hover:text-secondary transition-all active:scale-95">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full border border-surface" />
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-margin-mobile md:p-gutter bg-background">
                    <div className="max-w-[1400px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
