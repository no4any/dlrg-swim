import React from "react";

export function Button({ children, onClick, fullWidth }: { children?: React.ReactNode | string, onClick?: () => void, fullWidth?: boolean }) {
    return <button
        onClick={onClick}
        className={`p-2 rounded-lg bg-blue text-white ${fullWidth?"w-full":""}`}
    >
        {children}
    </button>
}