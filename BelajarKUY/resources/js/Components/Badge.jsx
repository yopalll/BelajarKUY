// Komponen Badge reusable (L1 - Vascha).
// Varian: 'indigo' (default) | 'amber' | 'emerald' | 'red' | 'gray' | 'purple' | 'orange'
// Size: 'sm' (default) | 'md' | 'lg'
export default function Badge({ children, variant = 'indigo', size = 'sm', className = '' }) {
    const variants = {
        indigo:  'bg-indigo-50 text-indigo-600 border-indigo-100',
        purple:  'bg-purple-50 text-purple-600 border-purple-100',
        amber:   'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent',
        orange:  'bg-orange-50 text-orange-600 border-orange-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        red:     'bg-red-50 text-red-600 border-red-100',
        gray:    'bg-gray-100 text-gray-500 border-gray-200',
        featured:'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent',
    };

    const sizes = {
        sm:  'px-2.5 py-0.5 text-xs',
        md:  'px-3 py-1 text-xs',
        lg:  'px-4 py-1.5 text-sm',
    };

    return (
        <span
            className={`
                inline-flex items-center font-bold rounded-full border
                ${variants[variant] ?? variants.indigo}
                ${sizes[size] ?? sizes.sm}
                ${className}
            `}
        >
            {children}
        </span>
    );
}
