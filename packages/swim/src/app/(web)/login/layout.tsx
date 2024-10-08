export default function LoginLayoutexport({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return <div className="flex h-screen">
        <div className="m-auto bg-white/25 p-4 rounded-lg backdrop-blur">
            {children}
        </div>
    </div>
}