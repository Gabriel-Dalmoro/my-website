export default function CulinaryDivider() {
    return (
        <div className="flex items-center justify-center gap-4 py-2 px-6 bg-zinc-950">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-zinc-800" />
            <span className="text-zinc-700 text-lg select-none">✦</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-zinc-800" />
        </div>
    );
}
