"use client"

import InputText from "@/components/form/InputText"
import SubmitButton from "@/components/form/SubmitButton"
import { useFormState } from "react-dom";
import FormTestAction, { FormState } from "./FormTest.action";

export default function FormTest() {
    const [_state, formAction] = useFormState<FormState, FormData>(FormTestAction, {})

    return <form action={formAction}>
        <InputText name="a1" />
        <InputText name="b2" />
        <SubmitButton>!!!</SubmitButton>
    </form>
}