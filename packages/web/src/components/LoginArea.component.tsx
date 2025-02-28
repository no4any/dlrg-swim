import { ReactElement } from "react";

export default function LoginArea({ children }: { children: ReactElement | string }) {
    return <div className="flex h-screen">
        <main className="m-auto min-w-[720px] p-2 rounded-sm bg-white/35 backdrop-invert backdrop-opacity-10">
            {children}
        </main>
    </div>
}