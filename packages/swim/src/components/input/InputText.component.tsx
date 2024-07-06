export interface InputTextProps {
    name: string,
    title: string,
    placeholder?: string
}

export default function InputText(props: InputTextProps) {
    return <div>
        <label className="block text-sm font-medium">
            {props.title}
            <input type="text" name={props.name} className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-400 text-sm focus:ring-dlrg-blue-500 focus:border-dlrg-blue-500" placeholder={props.placeholder || ""} />
        </label>
    </div>
}