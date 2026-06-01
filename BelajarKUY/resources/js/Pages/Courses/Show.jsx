import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppLayout from '@/Layouts/AppLayout';
import CourseCard from '@/Components/CourseCard';
import Badge from '@/Components/Badge';
import EmptyState from '@/Components/EmptyState';
import {
    Star,
    Users,
    Clock,
    Smartphone,
    BookOpen,
    ChevronDown,
    PlayCircle,
    Lock,
    Heart,
    ShoppingCart,
    ExternalLink,
    CheckCircle2,
} from 'lucide-react';

// Layar: course_detail (Konteks_A) → route 'course.detail' (/courses/{slug}).
// Props dari CourseDetailController@show (Inertia::render('Courses/Show', ...)).
export default function Show({ course, relatedCourses = [], showReviewForm = false }) {
    const { t } = useTranslation();
    const [openSection, setOpenSection] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 5,
        comment: '',
    });

    const [hoverRating, setHoverRating] = useState(0);

    const rupiah = (n) => 'Rp ' + Number(n ?? 0).toLocaleString('id-ID');

    const rating        = Number(course.average_rating ?? 0);
    const reviewCount   = course.reviews?.length ?? 0;
    const hasDiscount   = (course.discount ?? 0) > 0;
    const enrolledCount = course.enrollments_count ?? 0;

    const getEmbedUrl = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|[^/]+\?v=)|youtu\.be\/)([^"&?/ ]{11})/i);
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    };
    const embedUrl = getEmbedUrl(course.video_url);

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        post(`/courses/${course.id}/reviews`, { onSuccess: () => reset() });
    };

    const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
        const count = (course.reviews ?? []).filter((r) => r.rating === star).length;
        const pct   = reviewCount > 0 ? (count / reviewCount) * 100 : 0;
        return { star, count, pct };
    });

    return (
        <AppLayout>
            <Head title={`${course.title} — BelajarKUY`} />

            {/* ─── HERO BANNER ─── */}
            <section className="bg-gray-950 text-white py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        <div className="lg:col-span-2 space-y-5">
                            {/* Breadcrumb */}
                            <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                <Link href="/home" className="hover:text-indigo-400 transition-colors">{t('course.breadcrumb_home')}</Link>
                                <span>/</span>
                                <Link href={`/home?category=${course.category?.slug}`} className="hover:text-indigo-400 transition-colors">
                                    {course.category?.name}
                                </Link>
                                {course.sub_category && (
                                    <>
                                        <span>/</span>
                                        <span className="text-indigo-400">{course.sub_category.name}</span>
                                    </>
                                )}
                            </nav>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2">
                                {course.bestseller && <Badge variant="amber">{t('badge.bestseller')}</Badge>}
                                {course.featured   && <Badge variant="featured">{t('badge.featured')}</Badge>}
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                                {course.title}
                            </h1>

                            <p className="text-sm md:text-base text-gray-300 font-medium leading-relaxed max-w-3xl">
                                {course.description}
                            </p>

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
                                <div className="flex items-center space-x-1.5">
                                    <span className="text-amber-400 text-base font-bold">{rating.toFixed(1)}</span>
                                    <div className="flex items-center text-amber-400">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? 'fill-current' : 'text-gray-700'}`} />
                                        ))}
                                    </div>
                                    <span className="text-gray-400">{t('course.review_count', { count: reviewCount })}</span>
                                </div>
                                <span className="text-gray-600">|</span>
                                <div className="flex items-center space-x-1.5 text-gray-300">
                                    <Users className="w-4 h-4 text-indigo-400" />
                                    <span>{t('course.enrolled_students', { count: enrolledCount })}</span>
                                </div>
                                <span className="text-gray-600">|</span>
                                <div className="text-gray-300">
                                    {t('course.created_by')}{' '}
                                    <span className="text-indigo-400 hover:underline cursor-pointer">
                                        {course.instructor?.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── MAIN CONTENT ─── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* ── LEFT COLUMN ── */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* 1. WHAT YOU'LL LEARN */}
                        {(course.goals ?? []).length > 0 && (
                            <section className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-6">
                                <h2 className="text-xl font-black text-gray-900">{t('course.what_you_learn')}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {course.goals.map((goal) => (
                                        <div key={goal.id} className="flex items-start space-x-3 text-sm font-semibold text-gray-700">
                                            <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                                            <span>{goal.goal}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 2. CURRICULUM ACCORDION */}
                        <section className="space-y-6">
                            <div className="space-y-1">
                                <h2 className="text-xl font-black text-gray-900">{t('course.curriculum_title')}</h2>
                                <p className="text-sm text-gray-500 font-medium">
                                    {t('course.curriculum_subtitle', { count: (course.sections ?? []).length })}
                                </p>
                            </div>

                            {(course.sections ?? []).length === 0 ? (
                                <EmptyState
                                    icon={<BookOpen className="w-8 h-8" />}
                                    title={t('course.no_curriculum')}
                                    description={t('course.no_curriculum_desc')}
                                    size="sm"
                                />
                            ) : (
                                <div className="space-y-3.5">
                                    {course.sections.map((section, idx) => (
                                        <div key={section.id} className="border border-gray-100 rounded-3xl overflow-hidden bg-white shadow-sm">
                                            <button
                                                onClick={() => setOpenSection(openSection === idx ? null : idx)}
                                                className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-900 hover:bg-gray-50/50 transition-colors duration-200 focus:outline-none"
                                                aria-expanded={openSection === idx}
                                            >
                                                <span className="text-base flex items-center space-x-3">
                                                    <span className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 text-xs flex items-center justify-center font-black flex-shrink-0">
                                                        {idx + 1}
                                                    </span>
                                                    <span>{section.title}</span>
                                                </span>
                                                <ChevronDown className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${openSection === idx ? 'rotate-180' : ''}`} />
                                            </button>

                                            {openSection === idx && (
                                                <div className="border-t border-gray-50 px-6 py-5 space-y-4 bg-gray-50/20">
                                                    {(section.lectures ?? []).length === 0 ? (
                                                        <p className="text-xs text-gray-400 font-medium">{t('course.no_lectures')}</p>
                                                    ) : (
                                                        section.lectures.map((lecture, lIdx) => (
                                                            <div key={lecture.id} className="flex items-center justify-between text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors duration-150">
                                                                <div className="flex items-center space-x-3.5">
                                                                    {lIdx === 0 ? (
                                                                        <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-full flex-shrink-0" title={t('course.preview_free')}>
                                                                            <PlayCircle className="w-4 h-4" />
                                                                        </span>
                                                                    ) : (
                                                                        <span className="p-1.5 bg-gray-50 text-gray-400 rounded-full flex-shrink-0" title={t('course.locked')}>
                                                                            <Lock className="w-4 h-4" />
                                                                        </span>
                                                                    )}
                                                                    <span>{lecture.title}</span>
                                                                </div>
                                                                <div className="flex items-center space-x-3 text-xs text-gray-400 flex-shrink-0">
                                                                    {lIdx === 0 && (
                                                                        <Badge variant="indigo" size="sm">{t('course.preview_label')}</Badge>
                                                                    )}
                                                                    <span>{lecture.duration}</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* 3. INSTRUCTOR PROFILE */}
                        <section className="border-t border-gray-100 pt-12 space-y-6">
                            <h2 className="text-xl font-black text-gray-900">{t('course.instructor_title')}</h2>
                            <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8 bg-white border border-gray-100 p-8 rounded-3xl shadow-sm">
                                <img
                                    className="h-20 w-20 rounded-full object-cover border-2 border-indigo-500 shadow-sm flex-shrink-0"
                                    src={course.instructor?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor?.name ?? 'BK')}&background=4F46E5&color=fff`}
                                    alt={course.instructor?.name}
                                />
                                <div className="space-y-4 flex-1">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 hover:text-indigo-600 cursor-pointer transition-colors duration-200">
                                            {course.instructor?.name}
                                        </h3>
                                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-0.5">{t('course.instructor_role')}</p>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {course.instructor?.bio ?? t('course.instructor_default_bio')}
                                    </p>
                                    {course.instructor?.website && (
                                        <a
                                            href={course.instructor.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-500 bg-indigo-50 hover:bg-indigo-100/70 px-4 py-2 rounded-xl transition-all duration-200 gap-1.5"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            {t('course.instructor_website')}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* 4. REVIEWS */}
                        <section className="border-t border-gray-100 pt-12 space-y-8">
                            <h2 className="text-xl font-black text-gray-900">{t('course.reviews_title')}</h2>

                            {/* Rating Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                <div className="text-center space-y-2">
                                    <p className="text-5xl font-black text-indigo-600">{rating.toFixed(1)}</p>
                                    <div className="flex items-center justify-center text-amber-400">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className={`w-5 h-5 ${i <= Math.round(rating) ? 'fill-current' : 'text-gray-200'}`} />
                                        ))}
                                    </div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('course.rating_label')}</p>
                                </div>
                                <div className="md:col-span-2 space-y-2.5">
                                    {ratingBreakdown.map(({ star, pct }) => (
                                        <div key={star} className="flex items-center text-sm font-semibold text-gray-700">
                                            <span className="w-16 text-xs font-bold text-gray-500">{star} {t('course.star')}</span>
                                            <div className="flex-1 h-3 bg-gray-200 rounded-full mx-4 overflow-hidden">
                                                <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                                            </div>
                                            <span className="w-8 text-right text-xs font-bold text-gray-400">{Math.round(pct)}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Review Form */}
                            {showReviewForm && (
                                <div className="bg-indigo-50/50 border border-indigo-100 rounded-3xl p-6 sm:p-8 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-black text-gray-900">{t('course.write_review_title')}</h3>
                                        <p className="text-xs text-gray-500 font-semibold mt-1">{t('course.write_review_desc')}</p>
                                    </div>
                                    <form onSubmit={handleReviewSubmit} className="space-y-5">
                                        {/* Star Rating */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                                                {t('course.rating_select_label')}
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => setData('rating', i)}
                                                        onMouseEnter={() => setHoverRating(i)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        className="focus:outline-none hover:scale-110 transition-transform duration-150"
                                                    >
                                                        <Star className={`w-8 h-8 ${(hoverRating || data.rating) >= i ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                                                    </button>
                                                ))}
                                                <span className="text-xs font-bold text-gray-500 bg-white px-2.5 py-1 rounded-lg border border-gray-200 ml-2">
                                                    {t('course.star_count', { count: data.rating })}
                                                </span>
                                            </div>
                                            {errors.rating && <p className="text-xs text-red-500">{errors.rating}</p>}
                                        </div>

                                        {/* Comment */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="comment" className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                                                {t('course.comment_label')}
                                            </label>
                                            <textarea
                                                id="comment"
                                                rows={4}
                                                value={data.comment}
                                                onChange={(e) => setData('comment', e.target.value)}
                                                placeholder={t('course.comment_placeholder')}
                                                className="block w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 font-semibold placeholder:text-gray-400"
                                            />
                                            {errors.comment && <p className="text-xs text-red-500">{errors.comment}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-0.5 active:translate-y-0 transform transition-all duration-200 shadow-md shadow-indigo-600/20 disabled:opacity-60"
                                        >
                                            {processing ? t('course.submitting') : t('course.submit_review')}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Reviews List */}
                            {(course.reviews ?? []).length === 0 ? (
                                <EmptyState
                                    icon={<Star className="w-8 h-8" />}
                                    title={t('course.no_reviews')}
                                    description={t('course.no_reviews_desc')}
                                    size="sm"
                                />
                            ) : (
                                <div className="space-y-6">
                                    {course.reviews.map((review) => (
                                        <div key={review.id} className="border border-gray-100 rounded-3xl p-6 space-y-4 bg-white shadow-sm hover:shadow transition-shadow duration-200">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3.5">
                                                    <img
                                                        className="h-10 w-10 rounded-full object-cover border border-indigo-100"
                                                        src={review.user?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user?.name ?? 'U')}&background=4F46E5&color=fff`}
                                                        alt={review.user?.name}
                                                    />
                                                    <div>
                                                        <h4 className="text-sm font-bold text-gray-900">{review.user?.name}</h4>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                                            {review.created_at_diff ?? review.created_at}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-amber-400 bg-amber-50 px-2.5 py-1 rounded-lg gap-1">
                                                    <span className="text-xs font-bold">{review.rating}.0</span>
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                                {review.comment ?? t('course.no_comment')}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                    </div>

                    {/* ── RIGHT COLUMN: STICKY PURCHASE CARD ── */}
                    <div className="space-y-8">
                        <div className="lg:sticky lg:top-24 bg-white border border-gray-100 rounded-[2rem] shadow-xl shadow-indigo-50/50 overflow-hidden">

                            {/* Teaser Video / Thumbnail */}
                            {embedUrl ? (
                                <div className="relative bg-gray-950 aspect-video">
                                    <iframe
                                        className="w-full h-full"
                                        src={embedUrl}
                                        title={t('course.teaser_title')}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <div className="relative bg-gray-900 aspect-video flex items-center justify-center overflow-hidden">
                                    {course.thumbnail && (
                                        <img
                                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                                            src={course.thumbnail}
                                            alt={course.title}
                                        />
                                    )}
                                    <div className="relative z-10 p-3 bg-white/95 rounded-full text-indigo-600 shadow-md">
                                        <PlayCircle className="w-7 h-7" />
                                    </div>
                                </div>
                            )}

                            {/* Purchase Panel */}
                            <div className="p-8 space-y-6">
                                {/* Price */}
                                <div className="space-y-1">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{t('course.invest_label')}</span>
                                    <div className="flex items-baseline space-x-3">
                                        {hasDiscount ? (
                                            <>
                                                <span className="text-3xl font-black text-indigo-600">{rupiah(course.discounted_price)}</span>
                                                <span className="text-base text-gray-400 line-through font-semibold">{rupiah(course.price)}</span>
                                                <Badge variant="emerald" size="sm">-{course.discount}%</Badge>
                                            </>
                                        ) : course.price == 0 ? (
                                            <span className="text-3xl font-black text-emerald-600">{t('course.free')}</span>
                                        ) : (
                                            <span className="text-3xl font-black text-gray-950">{rupiah(course.price)}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-3 pt-2">
                                    <Link
                                        href="/cart"
                                        method="post"
                                        as="button"
                                        data={{ course_id: course.id }}
                                        className="w-full text-center py-4 px-6 rounded-full text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-0.5 active:translate-y-0 transform transition-all duration-200 shadow-lg shadow-indigo-600/30"
                                    >
                                        {t('course.enroll_now')}
                                    </Link>
                                    <Link
                                        href="/cart"
                                        method="post"
                                        as="button"
                                        data={{ course_id: course.id }}
                                        className="w-full text-center py-3.5 px-6 rounded-full text-sm font-bold text-gray-700 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-50 transition-all duration-200 border border-gray-100"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <ShoppingCart className="w-4 h-4" /> {t('course.add_to_cart')}
                                        </span>
                                    </Link>
                                    <Link
                                        href={`/wishlist/${course.id}`}
                                        method="post"
                                        as="button"
                                        className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-full text-sm font-bold text-gray-700 hover:text-red-500 bg-white hover:bg-red-50 transition-all duration-200 border border-gray-200"
                                    >
                                        <Heart className="w-4 h-4" />
                                        <span>{t('course.save_wishlist')}</span>
                                    </Link>
                                </div>

                                {/* Perks */}
                                <div className="border-t border-gray-50 pt-6 space-y-3.5 text-sm font-semibold text-gray-600">
                                    <span className="text-xs font-black uppercase tracking-wider text-gray-400">{t('course.includes_label')}</span>
                                    <div className="flex items-center space-x-3.5">
                                        <Users className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                                        <span>{t('course.students_count_label', { count: enrolledCount })}</span>
                                    </div>
                                    <div className="flex items-center space-x-3.5">
                                        <Clock className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                                        <span>{t('course.total_video', { duration: course.duration ?? '-' })}</span>
                                    </div>
                                    <div className="flex items-center space-x-3.5">
                                        <BookOpen className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                                        <span>{t('course.full_access')}</span>
                                    </div>
                                    <div className="flex items-center space-x-3.5">
                                        <Smartphone className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                                        <span>{t('course.flexible_learn')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── RELATED COURSES ─── */}
                {relatedCourses.length > 0 && (
                    <section className="border-t border-gray-100 pt-16 mt-16 space-y-8">
                        <div className="space-y-1">
                            <Badge variant="indigo" size="md">{t('course.recommendations_label')}</Badge>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-2">{t('course.related_title')}</h2>
                            <p className="text-sm text-gray-500 font-medium">
                                {t('course.related_desc', { category: course.category?.name })}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedCourses.map((c) => (
                                <CourseCard key={c.id} course={c} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}
