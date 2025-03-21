export interface InputSubmitProps {
    label?: string,
    disabled?: boolean
}

export default function InputSubmit({ label, disabled }: InputSubmitProps) {
    return <button
        type="submit"
        disabled={disabled ? true : false}
        className="rounded block w-full p-1 bg-dlrg-blue border-0 text-dlrg-yellow hover:text-dlrg-blue hover:bg-dlrg-yellow py-2 transition-all duration-500 cursor-pointer"
    >{label}</button>
}