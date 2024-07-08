import { HomeIcon } from "@heroicons/react/24/solid";

export default function AdminLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return <>
        <div className="bg-white/25 p-4 rounded-lg backdrop-blur xl:mx-64 lg:mx-32 md:mx-16 mx-8 mt-4 mb-8">
            {children}
        </div>
        <div className="flex fixed bottom-0 left-0 right-0 bg-dlrg-black/50 text-white">
            <div className="basis-1/3 text-center"><HomeIcon className="size-6 text-blue" /></div>
            <div className="basis-1/3 text-center">B</div>
            <div className="basis-1/3 text-center">C</div>
        </div>
    </>
}