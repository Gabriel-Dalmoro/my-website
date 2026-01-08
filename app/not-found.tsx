"use client";

import Error from "next/error";

// Configured to match the root 404 needed for next-intl if localized 404 not found
export default function NotFound() {
    return (
        <html lang="en">
            <body>
                <Error statusCode={404} />
            </body>
        </html>
    );
}
