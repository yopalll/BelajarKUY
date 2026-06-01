import { Link } from '@inertiajs/react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const rupiah = (n) => 'Rp ' + Number(n ?? 0).toLocaleString('id-ID');

// Komponen reusable (≥2 layar). Field mengikuti model Course pada Kode_Nyata:
// title, slug, thumbnail, category.name, instructor.{name,photo},
// bestseller, featured, price, discount, discounted_price, average_rating, reviews.
export default function CourseCard({ course }) {
    const rating = Number(course.average_rating ?? 0);
    const reviewCount = course.reviews?.length ?? course.reviews_count ?? 0;
    const hasDiscount = (course.discount ?? 0) > 0;

    return (
        <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full relative">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                {course.bestseller && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white">Bestseller</span>
                )}
                {course.featured && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white">Featured</span>
                )}
            </div>

            <button className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-red-500" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
            </button>

            <Link href={`/courses/${course.slug}`} className="block overflow-hidden bg-gray-50 aspect-video">
                <img
                    src={course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </Link>

            <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg w-max mb-3 uppercase tracking-wider">
                    {course.category?.name ?? 'Kategori'}
                </span>
                <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-indigo-600 mb-2 line-clamp-2 min-h-[2.75rem]">
                    <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                </h3>

                <div className="flex items-center gap-2.5 mb-4">
                    <img
                        src={course.instructor?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor?.name ?? 'BK')}&background=4F46E5&color=fff`}
                        alt={course.instructor?.name}
                        className="h-6 w-6 rounded-full object-cover border border-indigo-100"
                    />
                    <span className="text-xs font-medium text-gray-600 truncate">{course.instructor?.name}</span>
                </div>

                <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex items-center text-amber-400">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? 'fill-current' : 'text-gray-200'}`} />
                        ))}
                    </div>
                    <span className="text-sm font-bold text-gray-800">{rating.toFixed(1)}</span>
                    <span className="text-xs text-gray-400">({reviewCount} ulasan)</span>
                </div>

                <div className="mt-auto border-t border-gray-50 pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        {hasDiscount ? (
                            <>
                                <span className="text-xs text-gray-400 line-through">{rupiah(course.price)}</span>
                                <span className="text-lg font-extrabold text-indigo-600">{rupiah(course.discounted_price)}</span>
                            </>
                        ) : course.price == 0 ? (
                            <span className="text-lg font-extrabold text-emerald-600">Gratis</span>
                        ) : (
                            <span className="text-lg font-extrabold text-gray-900">{rupiah(course.price)}</span>
                        )}
                    </div>
                    <button className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all" aria-label="Tambah ke Keranjang">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
