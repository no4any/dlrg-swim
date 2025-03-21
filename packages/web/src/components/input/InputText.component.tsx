"use client"

import { useEffect, useState } from "react"

export interface InputTextProps {
    name: string,
    value?: string,
    label: string,
    isPassword?: boolean,
    showPlaceholder?: boolean,
    required?: boolean,
    disabled?: boolean,
    onChange?: (value: string) => void
}

export default function InputText({ name, value, label, disabled, onChange, isPassword, showPlaceholder, required }: InputTextProps) {
    const [localValue, setLocalValue] = useState<string>(value || "");

    useEffect(() => setLocalValue(value || ""), [value]);

    function onValueChange(value: string) {
        if (onChange) {
            onChange(value);
        }
        setLocalValue(value);
    }

    return <label>
        <span className="select-none">{label} {required?<span className="text-dlrg-red">*</span>:undefined}</span>
        <input
            className="rounded border border-dlrg-black focus:border-dlrg-gray block w-full p-1 focus:outline-2 outline-0 focus:outline-dlrg-yellow transition-all"
            type={isPassword ? "password" : "text"} 
            value={localValue} 
            name={name}
            disabled={disabled ? true : false}
            onChange={(evnt) => onValueChange(evnt.target.value)} 
            placeholder={showPlaceholder?label:""}
        />
    </label>
}