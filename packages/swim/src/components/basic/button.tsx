import React from "react"

export interface ButtonProps {
    active?: boolean,
    onClick: () => void,
    children: React.ReactNode,
    disabled?: boolean
}

export default function Button({ active, onClick, children, disabled }: ButtonProps) {
    return <button disabled={disabled} className={`w-full ${active ? "bg-dlrg-blue-100 text-dlrg-black" : "bg-dlrg-blue text-dlrg-black-100"} disabled:text-dlrg-black-900 disbaled:hover:text-dlrg-black-600 hover:bg-dlrg-blue-900 rounded p-2 font-bold`} onClick={onClick}>
        {children}
    </button>
}