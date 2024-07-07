import { useEffect, useState } from "react"

export interface InputTextProps {
    name: string,
    title: string,
    placeholder?: string,
    validate?: boolean,
    condition?: (value: string) => boolean,
    conditionMessage?: string
}

export default function InputText(props: InputTextProps) {
    const [error, setError] = useState(true);

    function onChange(value: string) {
        if (props.condition) {
            console.log("--1--");
            setError(!props.condition(value))
        }
    }

    return <div>
        <label className="block text-sm font-medium">
            {props.title}
            <input
                type="text"
                name={props.name}
                className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-400 text-sm focus:ring-dlrg-blue-500 focus:border-dlrg-blue-500" placeholder={props.placeholder || ""}
                onChange={(evnt) => onChange(evnt.target.value)}
            />
            {props.validate && error ? <span className="block bg-dlrg-yellow rounded px-1 my-2">{props.conditionMessage}</span> : undefined}
        </label>
    </div>
}