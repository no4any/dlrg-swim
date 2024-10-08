import Link from "next/link";
import React from "react";

export default function ButtonLink({ href, children }: { href: string, children: React.ReactNode }) {
    return <Link
        href={href}
        className="bg-dlrg-blue text-dlrg-black-100 disabled:text-dlrg-black-900 disbaled:hover:text-dlrg-black-600 hover:bg-dlrg-blue-900 rounded p-2 font-bold"
    >{children}</Link>
}