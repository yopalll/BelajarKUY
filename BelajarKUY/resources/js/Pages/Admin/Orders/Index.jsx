import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const STATUS_CONFIG = {
    completed: { label: 'Selesai',   cls: 'bg-success/10 text-success' },
    pending:   { label: 'Pending',   cls: 'bg-warning/10 text-warning' },
    cancelled: { label: 'Dibatalkan',cls: 'bg-error/10 text-error' },
    refunded:  { label: 'Refund',    cls: 'bg-surface-variant text-on-surface-variant' },
};

function formatRupiah(amount) {
    if (!amount) return 'Rp 0';
    return `Rp ${Number(amount).toLocaleString('id-ID')}`;
}

/**
 * Pages/Admin/Orders/Index.jsx
 * Desain dari manajemen_pesanan_admin_panel (Quinsha, Konteks_A)
 */
export default function OrdersIndex({ orders, status: currentStatus }) {
    const TABS = [
        { key: '',          label: 'Semua' },
        { key: 'completed', label: 'Selesai' },
        { key: 'pending',   label: 'Pending' },
        { key: 'cancelled', label: 'Dibatalkan' },
    ];

    return (
        <AdminLayout title="Admin Portal">
            <Head title="Manajemen Order — BelajarKUY Admin" />

            <div className="flex justify-between items-end mb-gutter">
                <div>
                    <h1 className="font-headline-lg text-headline-lg text-on-surface">Manajemen Order</h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Pantau semua transaksi di platform.</p>
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex border-b border-surface-variant mb-lg">
                {TABS.map(tab => (
                    <a
                        key={tab.key}
                        href={tab.key ? `/admin/orders?status=${tab.key}` : '/admin/orders'}
                        className={`px-lg py-md font-label-md text-label-md transition-colors
                            ${(currentStatus ?? '') === tab.key
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-on-surface-variant hover:text-primary'
                            }`}
                    >
                        {tab.label}
                    </a>
                ))}
            </div>

            {/* Table */}
            <div className="bg-surface rounded-2xl shadow-[0_8px_30px_rgb(48,0,51,0.04)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-surface-variant bg-background-subtle">
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant">Order ID</th>
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant">Siswa</th>
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant hidden md:table-cell">Kursus</th>
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant text-right">Total</th>
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant text-center">Status</th>
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data?.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-xl text-center text-on-surface-variant font-body-md text-body-md">
                                        Tidak ada order
                                    </td>
                                </tr>
                            )}
                            {orders.data?.map(order => {
                                const cfg = STATUS_CONFIG[order.status] ?? { label: order.status, cls: 'bg-surface-variant text-on-surface-variant' };
                                return (
                                    <tr key={order.id} className="border-b border-surface-variant/50 hover:bg-background-subtle transition-colors">
                                        <td className="py-md px-lg font-mono text-xs text-on-surface-variant">#{order.id}</td>
                                        <td className="py-md px-lg">
                                            <div className="flex items-center gap-sm">
                                                <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs shrink-0">
                                                    {order.user?.name?.charAt(0)?.toUpperCase() ?? '?'}
                                                </div>
                                                <span className="font-body-md text-body-md text-on-surface truncate max-w-[120px]">{order.user?.name ?? '—'}</span>
                                            </div>
                                        </td>
                                        <td className="py-md px-lg text-on-surface-variant hidden md:table-cell max-w-[160px]">
                                            <span className="truncate block">{order.course?.title ?? '—'}</span>
                                        </td>
                                        <td className="py-md px-lg text-right font-medium font-body-md text-body-md">
                                            {formatRupiah(order.amount)}
                                        </td>
                                        <td className="py-md px-lg text-center">
                                            <span className={`inline-flex items-center px-sm py-xs rounded-full font-caption text-caption ${cfg.cls}`}>
                                                {cfg.label}
                                            </span>
                                        </td>
                                        <td className="py-md px-lg text-right">
                                            <Link
                                                href={`/admin/orders/${order.id}`}
                                                className="p-sm rounded-lg text-primary hover:bg-primary/10 transition-colors inline-flex"
                                                title="Detail"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {orders.last_page > 1 && (
                    <div className="flex justify-between items-center px-lg py-md border-t border-surface-variant">
                        <span className="font-caption text-caption text-on-surface-variant">
                            Halaman {orders.current_page} dari {orders.last_page}
                        </span>
                        <div className="flex gap-sm">
                            {orders.prev_page_url && (
                                <a href={orders.prev_page_url} className="p-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors">
                                    <ChevronLeft className="w-4 h-4" />
                                </a>
                            )}
                            {orders.next_page_url && (
                                <a href={orders.next_page_url} className="p-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors">
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
