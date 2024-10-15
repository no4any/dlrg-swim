"use client"

import { useEffect, useState } from "react"

export default function InputText({ label, value, onChange, name }: { label?: React.ReactNode | string, value?: number, onChange?: (value?: number) => void, name?: string }) {
    const [val, setVal] = useState<number | undefined>(value);

    useEffect(() => {
        setVal(value);
    }, [value])

    useEffect(() => {
        if (onChange) {
            onChange(val || 0)
        }
    }, [val])

    return <label className="block text-sm font-medium">
        {label}
        <input
            className={`text-black block w-full border border-black rounded p-1`}
            type="number"
            pattern="d*"
            value={val}
            onChange={evnt => setVal(evnt.target.value)}
            name={name}
        />
    </label>
}