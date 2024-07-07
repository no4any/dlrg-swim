export interface InputTextProps {
    name: string,
    title: string
}

export default function InputDate(props: InputTextProps) {
    return <div>
        <label className="block text-sm font-medium">
            {props.title}
            <input type="date" name={props.name} className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-blue focus:border-blue" />
        </label>
    </div>
}