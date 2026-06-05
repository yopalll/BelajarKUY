import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ROLE_BADGE = {
    admin:      'bg-primary/10 text-primary',
    instructor: 'bg-secondary/10 text-secondary',
    student:    'bg-success/10 text-success',
};

/**
 * Pages/Admin/Users/Index.jsx
 * Daftar pengguna (view-only) — desain Konteks_A (Quinsha)
 */
export default function UsersIndex({ users }) {
    return (
        <AdminLayout title="Admin Portal">
            <Head title="Pengguna — BelajarKUY Admin" />

            <div className="flex justify-between items-end mb-gutter">
                <div>
                    <h1 className="font-headline-lg text-headline-lg text-on-surface">Manajemen Pengguna</h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
                        Daftar semua pengguna terdaftar di platform.
                    </p>
                </div>
                <div className="bg-surface px-lg py-sm rounded-xl border border-surface-variant shadow-sm">
                    <span className="font-caption text-caption text-on-surface-variant">Total</span>
                    <span className="ml-sm font-headline-md text-headline-md text-primary">{users.total?.toLocaleString('id-ID') ?? '—'}</span>
                </div>
            </div>

            <div className="bg-surface rounded-2xl shadow-[0_8px_30px_rgb(48,0,51,0.04)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-surface-variant bg-background-subtle">
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant">Pengguna</th>
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant hidden md:table-cell">Email</th>
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant text-center">Role</th>
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant hidden lg:table-cell">Terdaftar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data?.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-xl text-center text-on-surface-variant font-body-md text-body-md">
                                        Tidak ada pengguna
                                    </td>
                                </tr>
                            )}
                            {users.data?.map(user => (
                                <tr key={user.id} className="border-b border-surface-variant/50 hover:bg-background-subtle transition-colors">
                                    <td className="py-md px-lg">
                                        <div className="flex items-center gap-md">
                                            <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shrink-0">
                                                {user.name?.charAt(0)?.toUpperCase() ?? '?'}
                                            </div>
                                            <span className="font-body-md text-body-md text-on-surface font-medium">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-md px-lg text-on-surface-variant hidden md:table-cell font-body-md text-body-md">
                                        {user.email}
                                    </td>
                                    <td className="py-md px-lg text-center">
                                        <span className={`inline-flex items-center px-sm py-xs rounded-full font-caption text-caption capitalize ${ROLE_BADGE[user.role] ?? 'bg-surface-variant text-on-surface-variant'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-md px-lg text-on-surface-variant hidden lg:table-cell font-body-md text-body-md">
                                        {new Date(user.created_at).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {users.last_page > 1 && (
                    <div className="flex justify-between items-center px-lg py-md border-t border-surface-variant">
                        <span className="font-caption text-caption text-on-surface-variant">
                            Halaman {users.current_page} dari {users.last_page}
                        </span>
                        <div className="flex gap-sm">
                            {users.prev_page_url && (
                                <a href={users.prev_page_url} className="p-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors">
                                    <ChevronLeft className="w-4 h-4" />
                                </a>
                            )}
                            {users.next_page_url && (
                                <a href={users.next_page_url} className="p-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
