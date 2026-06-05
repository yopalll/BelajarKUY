import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Upload, ChevronLeft, ChevronRight } from 'lucide-react';

function Modal({ title, onClose, children }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-surface rounded-2xl shadow-xl w-full max-w-md p-xl z-10">
                <div className="flex justify-between items-center mb-lg">
                    <h3 className="font-headline-md text-headline-md text-on-surface">{title}</h3>
                    <button onClick={onClose} className="text-on-surface-variant hover:text-error transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

/**
 * Pages/Admin/Categories/Index.jsx
 * CRUD kategori dengan modal — desain Konteks_A (Quinsha)
 */
export default function CategoriesIndex({ categories, editCategory = null }) {
    const [showCreate, setShowCreate] = useState(false);
    const [editItem, setEditItem] = useState(editCategory);

    // Create form
    const createForm = useForm({ name: '', image: null });
    // Edit form
    const editForm = useForm({ name: editItem?.name ?? '', image: null, _method: 'PATCH' });

    function handleCreate(e) {
        e.preventDefault();
        createForm.post('/admin/categories', {
            forceFormData: true,
            onSuccess: () => { setShowCreate(false); createForm.reset(); },
        });
    }

    function handleEdit(e) {
        e.preventDefault();
        editForm.post(`/admin/categories/${editItem.id}`, {
            forceFormData: true,
            onSuccess: () => setEditItem(null),
        });
    }

    function handleDelete(category) {
        if (!confirm(`Hapus kategori "${category.name}"? Data yang terhubung mungkin terpengaruh.`)) return;
        router.delete(`/admin/categories/${category.id}`);
    }

    return (
        <AdminLayout title="Admin Portal">
            <Head title="Kategori — BelajarKUY Admin" />

            {/* Header */}
            <div className="flex justify-between items-center mb-gutter">
                <div>
                    <h1 className="font-headline-lg text-headline-lg text-on-surface">Kategori</h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
                        Kelola kategori kursus di platform.
                    </p>
                </div>
                <button
                    id="btn-tambah-kategori"
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-sm bg-primary text-on-primary font-label-md text-label-md px-lg py-sm rounded-lg hover:bg-primary-container transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Tambah Kategori
                </button>
            </div>

            {/* Table */}
            <div className="bg-surface rounded-2xl shadow-[0_8px_30px_rgb(48,0,51,0.04)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-surface-variant bg-background-subtle">
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant">Gambar</th>
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant">Nama</th>
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant hidden md:table-cell">Slug</th>
                                <th className="py-md px-lg font-label-md text-label-md text-on-surface-variant text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.data?.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-xl text-center text-on-surface-variant font-body-md text-body-md">
                                        Belum ada kategori
                                    </td>
                                </tr>
                            )}
                            {categories.data?.map((cat) => (
                                <tr key={cat.id} className="border-b border-surface-variant/50 hover:bg-background-subtle transition-colors">
                                    <td className="py-md px-lg">
                                        {cat.image_url
                                            ? <img src={cat.image_url} alt={cat.name} className="w-10 h-10 rounded-lg object-cover" />
                                            : <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant text-xs">—</div>
                                        }
                                    </td>
                                    <td className="py-md px-lg font-body-md text-body-md text-on-surface font-medium">{cat.name}</td>
                                    <td className="py-md px-lg font-body-md text-body-md text-on-surface-variant hidden md:table-cell font-mono text-sm">{cat.slug}</td>
                                    <td className="py-md px-lg text-right">
                                        <div className="flex items-center justify-end gap-sm">
                                            <button
                                                onClick={() => { setEditItem(cat); editForm.setData({ name: cat.name, image: null, _method: 'PATCH' }); }}
                                                className="p-sm rounded-lg text-primary hover:bg-primary/10 transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat)}
                                                className="p-sm rounded-lg text-error hover:bg-error-container transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {categories.last_page > 1 && (
                    <div className="flex justify-between items-center px-lg py-md border-t border-surface-variant">
                        <span className="font-caption text-caption text-on-surface-variant">
                            Halaman {categories.current_page} dari {categories.last_page}
                        </span>
                        <div className="flex gap-sm">
                            {categories.prev_page_url && (
                                <a href={categories.prev_page_url} className="p-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors">
                                    <ChevronLeft className="w-4 h-4" />
                                </a>
                            )}
                            {categories.next_page_url && (
                                <a href={categories.next_page_url} className="p-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Create */}
            {showCreate && (
                <Modal title="Tambah Kategori" onClose={() => setShowCreate(false)}>
                    <form onSubmit={handleCreate} encType="multipart/form-data">
                        <div className="space-y-md">
                            <div>
                                <label className="font-label-md text-label-md text-on-surface block mb-xs">Nama Kategori</label>
                                <input
                                    type="text"
                                    value={createForm.data.name}
                                    onChange={e => createForm.setData('name', e.target.value)}
                                    className="w-full bg-background-subtle border-2 border-transparent focus:border-primary rounded-lg py-sm px-md font-body-md text-body-md outline-none transition-colors"
                                    placeholder="contoh: Pemrograman Web"
                                    required
                                />
                                {createForm.errors.name && <p className="mt-xs font-caption text-caption text-error">{createForm.errors.name}</p>}
                            </div>
                            <div>
                                <label className="font-label-md text-label-md text-on-surface block mb-xs">Gambar Kategori</label>
                                <label className="flex items-center gap-sm bg-background-subtle border-2 border-dashed border-outline-variant hover:border-primary rounded-lg py-md px-md cursor-pointer transition-colors">
                                    <Upload className="w-4 h-4 text-on-surface-variant" />
                                    <span className="font-body-md text-body-md text-on-surface-variant">
                                        {createForm.data.image ? createForm.data.image.name : 'Pilih gambar…'}
                                    </span>
                                    <input type="file" accept="image/*" className="hidden" onChange={e => createForm.setData('image', e.target.files[0])} />
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-sm justify-end mt-xl">
                            <button type="button" onClick={() => setShowCreate(false)} className="px-lg py-sm rounded-lg border border-outline text-on-surface font-label-md text-label-md hover:bg-surface-variant transition-colors">
                                Batal
                            </button>
                            <button type="submit" disabled={createForm.processing} className="px-lg py-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors disabled:opacity-50">
                                {createForm.processing ? 'Menyimpan…' : 'Simpan'}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Modal Edit */}
            {editItem && (
                <Modal title={`Edit: ${editItem.name}`} onClose={() => setEditItem(null)}>
                    <form onSubmit={handleEdit} encType="multipart/form-data">
                        <div className="space-y-md">
                            <div>
                                <label className="font-label-md text-label-md text-on-surface block mb-xs">Nama Kategori</label>
                                <input
                                    type="text"
                                    value={editForm.data.name}
                                    onChange={e => editForm.setData('name', e.target.value)}
                                    className="w-full bg-background-subtle border-2 border-transparent focus:border-primary rounded-lg py-sm px-md font-body-md text-body-md outline-none transition-colors"
                                    required
                                />
                                {editForm.errors.name && <p className="mt-xs font-caption text-caption text-error">{editForm.errors.name}</p>}
                            </div>
                            <div>
                                <label className="font-label-md text-label-md text-on-surface block mb-xs">Gambar Baru (opsional)</label>
                                {editItem.image_url && (
                                    <img src={editItem.image_url} alt={editItem.name} className="w-16 h-16 rounded-lg object-cover mb-sm" />
                                )}
                                <label className="flex items-center gap-sm bg-background-subtle border-2 border-dashed border-outline-variant hover:border-primary rounded-lg py-md px-md cursor-pointer transition-colors">
                                    <Upload className="w-4 h-4 text-on-surface-variant" />
                                    <span className="font-body-md text-body-md text-on-surface-variant">
                                        {editForm.data.image ? editForm.data.image.name : 'Ganti gambar…'}
                                    </span>
                                    <input type="file" accept="image/*" className="hidden" onChange={e => editForm.setData('image', e.target.files[0])} />
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-sm justify-end mt-xl">
                            <button type="button" onClick={() => setEditItem(null)} className="px-lg py-sm rounded-lg border border-outline text-on-surface font-label-md text-label-md hover:bg-surface-variant transition-colors">
                                Batal
                            </button>
                            <button type="submit" disabled={editForm.processing} className="px-lg py-sm rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors disabled:opacity-50">
                                {editForm.processing ? 'Menyimpan…' : 'Perbarui'}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </AdminLayout>
    );
}
