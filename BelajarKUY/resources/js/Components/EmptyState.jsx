// Komponen EmptyState reusable (L1 - Vascha).
// Menampilkan ilustrasi kosong + pesan ketika tidak ada data.
// Props:
//   icon      - React node (opsional), default: ikon kotak-kotak
//   title     - string (wajib)
//   description - string (opsional)
//   action    - React node (opsional, biasanya <Link> atau <button>)
//   size      - 'sm' | 'md' (default) | 'lg'
import { PackageOpen } from 'lucide-react';

export default function EmptyState({
    icon,
    title,
    description,
    action,
    size = 'md',
}) {
    const sizes = {
        sm: { wrap: 'py-8 px-4', iconBox: 'w-12 h-12', iconSize: 'w-6 h-6', title: 'text-base', desc: 'text-xs' },
        md: { wrap: 'py-14 px-6', iconBox: 'w-16 h-16', iconSize: 'w-8 h-8', title: 'text-lg', desc: 'text-sm' },
        lg: { wrap: 'py-20 px-8', iconBox: 'w-20 h-20', iconSize: 'w-10 h-10', title: 'text-xl', desc: 'text-base' },
    };

    const s = sizes[size] ?? sizes.md;

    return (
        <div className={`flex flex-col items-center justify-center text-center ${s.wrap}`}>
            <div className={`${s.iconBox} rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-400 mb-5`}>
                {icon ?? <PackageOpen className={s.iconSize} />}
            </div>
            <h3 className={`${s.title} font-extrabold text-gray-900 mb-2`}>{title}</h3>
            {description && (
                <p className={`${s.desc} text-gray-400 font-medium max-w-xs mx-auto mb-5`}>
                    {description}
                </p>
            )}
            {action && <div className="mt-1">{action}</div>}
        </div>
    );
}
