import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import CourseCard from '@/Components/CourseCard';

// Layar: katalog_kursus_home (Konteks_A) → route 'home' (/home).
// Props dari HomeController@index (Inertia::render('Home', ...)).
export default function Home({
    sliders = [],
    infoBoxes = [],
    categories = [],
    featuredCourses = [],
    bestsellerCourses = [],
    filteredCourses = [],
    isSearchingOrFiltering = false,
}) {
    const Section = ({ label, title, courses }) =>
        courses.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {label && (
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-2">
                        {label}
                    </span>
                )}
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6">{title}</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {courses.map((c) => (
                        <CourseCard key={c.id} course={c} />
                    ))}
                </div>
            </section>
        );

    return (
        <AppLayout>
            <Head title="Katalog Kursus" />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                <h1 className="text-3xl font-extrabold text-gray-900">Katalog Kursus</h1>
                <p className="text-gray-500 mt-1">Temukan kursus yang cocok untukmu.</p>
            </section>

            {/* Kategori populer */}
            {categories.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Kategori Terpopuler</h2>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                        {categories.map((cat) => (
                            <div key={cat.id} className="bg-white rounded-3xl border border-gray-100 p-5 hover:shadow-md transition">
                                <p className="font-bold text-gray-900">{cat.name}</p>
                                <p className="text-sm text-gray-400">{cat.courses_count ?? 0} Kursus</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {isSearchingOrFiltering ? (
                <Section title="Hasil Pencarian" courses={filteredCourses} />
            ) : (
                <>
                    <Section label="Pilihan Terbaik" title="Kursus Unggulan" courses={featuredCourses} />
                    <Section label="Sangat Populer" title="Kursus Terlaris" courses={bestsellerCourses} />
                </>
            )}
        </AppLayout>
    );
}
