import React from "react";

export default function SubmitButton({ children }: { children?: React.ReactNode | string }) {
    return <button type="submit" className={`p-2 rounded-lg bg-blue text-white w-full`}>
        {children || "Senden"}
    </button>
}