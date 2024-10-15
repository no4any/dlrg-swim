"use client"

import { useEffect, useState } from "react"

export default function InputText({ label, value, onChange, name }: { label?: React.ReactNode | string, value?: string, onChange?: (value: string) => void, name?: string }) {
    const [val, setVal] = useState<string>(value ?? "");

    useEffect(() => {
        setVal(value || "");
    }, [value])

    useEffect(() => {
        if (onChange) {
            onChange(val)
        }
    }, [val])

    return <label className="block text-sm font-medium">
        {label}
        <input
            className={`text-black block w-full border border-black rounded p-1`}
            type="text"
            value={val}
            onChange={evnt => setVal(evnt.target.value)}
            name={name}
        />
    </label>
}