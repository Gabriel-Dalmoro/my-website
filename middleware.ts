import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for
    // - Static files (_next/static, _next/image, favicon.ico)
    // - Default public folder assets (e.g. logo.png, sitemap.xml)
    matcher: [
        '/',
        '/(fr|en)/:path*',
        '/((?!api|_next|.*\\..*).*)'
    ]
};
