"use client"

import { useFormStatus } from "react-dom";

export default function ButtonSubmit({ children }: { children: Readonly<React.ReactNode> }) {
    const { pending } = useFormStatus();

    return <button disabled={pending} className="w-full bg-dlrg-blue disabled:text-dlrg-black-900 disbaled:hover:text-dlrg-black-600 hover:bg-dlrg-blue-900 rounded p-2 font-bold text-dlrg-black-100" type="submit">
        {children}
    </button>
}