import Header from "@/components/layout/Header";
import Footer from "@/components/marketing/Footer";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="antialiased min-h-screen flex flex-col font-sans">
            <Header />
            {/* Marketing specific layout elements if any, otherwise just children */}
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
