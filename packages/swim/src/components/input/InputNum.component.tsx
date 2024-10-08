import { useEffect, useState } from "react"

export interface InputNumProps {
    name: string,
    title: string,
    validate?: boolean,
    condition?: (value: number) => boolean,
    conditionMessage?: string
}

export default function InputNum(props: InputNumProps) {
    const [error, setError] = useState(true);

    function onChange(value: number) {
        if (props.condition) {
            setError(!props.condition(value))
        }
    }

    return <div>
        <label className="block text-sm font-medium">
            {props.title}
            <input
                type="number"
                name={props.name}
                className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                onChange={(evnt) => onChange(parseInt(evnt.target.value))}
                pattern="\d*"
            />
            {props.validate && error ? <span className="block bg-dlrg-yellow rounded px-1 my-2">{props.conditionMessage}</span> : undefined}
        </label>
    </div>
}