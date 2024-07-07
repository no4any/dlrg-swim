export interface InputCheckboxProps {
    name: string,
    title: string,
    checked?: boolean
}

export default function InputCheckbox(props: InputCheckboxProps) {
    return <div>
        <input id={props.name} type="checkbox" name={props.name} className="mr-2 accent-dlrg-blue" checked={props.checked} />
        <label htmlFor={props.name} className="w-full h-4 border-gray-300 rounded select-none">{props.title}</label>
    </div>
}