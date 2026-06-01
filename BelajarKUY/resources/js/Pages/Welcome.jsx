import { Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AppLayout from '@/Layouts/AppLayout';
import { ArrowRight, GraduationCap, Users, Infinity as InfinityIcon } from 'lucide-react';

// Layar: landing_page_welcome (Konteks_A) → route '/'.
export default function Welcome() {
    const { t } = useTranslation();

    const features = [
        { icon: GraduationCap, title: t('welcome.feature_quality_title'),   desc: t('welcome.feature_quality_desc') },
        { icon: Users,         title: t('welcome.feature_community_title'),  desc: t('welcome.feature_community_desc') },
        { icon: InfinityIcon,  title: t('welcome.feature_access_title'),     desc: t('welcome.feature_access_desc') },
    ];

    return (
        <AppLayout>
            <Head title={t('welcome.hero_title')} />

            {/* Hero */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                <div className="rounded-[2rem] bg-gradient-to-br from-indigo-600 to-purple-600 px-8 py-16 sm:px-16 text-white relative overflow-hidden">
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight max-w-2xl">
                        {t('welcome.hero_title')} <span className="text-amber-300">{t('welcome.hero_highlight')}</span>
                    </h1>
                    <p className="mt-5 text-lg text-indigo-100 max-w-xl">
                        {t('welcome.hero_desc')}
                    </p>
                    <Link
                        href="/home"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-indigo-700 hover:bg-indigo-50"
                    >
                        {t('welcome.cta')} <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Info boxes */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 sm:grid-cols-3">
                {features.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="bg-white rounded-3xl border border-gray-100 p-6">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                            <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{desc}</p>
                    </div>
                ))}
            </section>
        </AppLayout>
    );
}
