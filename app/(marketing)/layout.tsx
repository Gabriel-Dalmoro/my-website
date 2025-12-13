export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="antialiased min-h-screen flex flex-col font-sans">
            {/* Marketing specific layout elements if any, otherwise just children */}
            {children}
        </div>
    );
}
