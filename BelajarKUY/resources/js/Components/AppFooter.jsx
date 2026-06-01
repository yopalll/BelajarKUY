// Komponen AppFooter reusable (L1 - Vascha) — dengan i18n support.
import { Link } from '@inertiajs/react';
import { GraduationCap, Globe, PlaySquare, MessageCircle, Code } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const socials = [
    { label: 'Instagram', icon: MessageCircle, href: '#' },
    { label: 'YouTube',   icon: PlaySquare,    href: '#' },
    { label: 'Twitter',   icon: Globe,         href: '#' },
    { label: 'GitHub',    icon: Code,          href: '#' },
];

export default function AppFooter() {
    const { t } = useTranslation();

    const footerLinks = {
        [t('footer.sections.courses')]: [
            { label: t('footer.links.catalog'),    href: '/home' },
            { label: t('footer.links.featured'),   href: '/home' },
            { label: t('footer.links.bestseller'), href: '/home' },
        ],
        [t('footer.sections.company')]: [
            { label: t('footer.links.about'),  href: '#' },
            { label: t('footer.links.blog'),   href: '#' },
            { label: t('footer.links.career'), href: '#' },
        ],
        [t('footer.sections.support')]: [
            { label: t('footer.links.help'),           href: '#' },
            { label: t('footer.links.contact'),        href: '#' },
            { label: t('footer.links.privacy_policy'), href: '#' },
        ],
    };

    return (
        <footer className="mt-20 bg-gray-950 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
                {/* Top row */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/home" className="inline-flex items-center gap-2 mb-4" aria-label={t('nav.logo')}>
                            <span className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </span>
                            <span className="text-xl font-extrabold tracking-tight">
                                <span className="text-white">{t('nav.logo_part1')}</span>
                                <span className="text-indigo-400">{t('nav.logo_part2')}</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                            {t('footer.tagline')}
                        </p>
                        {/* Socials */}
                        <div className="flex items-center gap-3 mt-6">
                            {socials.map(({ label, icon: Icon, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all duration-200"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link groups */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">
                                {group}
                            </h4>
                            <ul className="space-y-2.5">
                                {links.map(({ label, href }) => (
                                    <li key={label}>
                                        <Link
                                            href={href}
                                            className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-150 font-medium"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom row */}
                <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                    <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>
                    <span className="flex items-center gap-4">
                        <a href="#" className="hover:text-indigo-400 transition-colors">{t('footer.terms')}</a>
                        <a href="#" className="hover:text-indigo-400 transition-colors">{t('footer.privacy')}</a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
