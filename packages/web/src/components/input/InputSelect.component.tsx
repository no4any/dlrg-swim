export interface InputSelectOption {
    displayName: string,
    key: string
}

export default function InputSelect({ options }: { options: InputSelectOption[] }) {
    return <select>
        {options.map((option, i) => <option key={i} value={option.key} >{option.displayName}</option>)}
    </select>
}