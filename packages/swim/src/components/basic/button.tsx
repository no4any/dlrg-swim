import React from "react"

export interface ButtonProps {
    active?: boolean,
    onClick: () => void,
    children: React.ReactNode
}

export default function Button({ active, onClick, children }: ButtonProps) {
    return <button className={`w-full ${active?"bg-dlrg-blue-100 text-dlrg-black": "bg-dlrg-blue text-dlrg-black-100"} disabled:text-dlrg-black-900 disbaled:hover:text-dlrg-black-600 hover:bg-dlrg-blue-900 rounded p-2 font-bold`} onClick={onClick}>
        {children}
    </button>
}