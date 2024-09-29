"use client"

import ButtonSubmit from "@/components/input/ButtonSubmit.component"
import InputText from "@/components/input/InputText.component"
import { useFormState } from "react-dom"
import changePasswordAction, { ChangePasswordState } from "./changePassword.action"

export default function ChangePasswordForm() {
    const [state, formAction] = useFormState<ChangePasswordState, FormData>(changePasswordAction, {})

    if(state.passwordChanged) {
        return <div>Ihr passwort wurde geändert!</div>
    }

    return <form action={formAction}>
        {state.confirmationDoesNotMatch ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Die Bestätigung stimmt nicht überein.</div> : <></>}
        {state.passwordWrong ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Das bisherige Passwort ist falsch.</div> : <></>}
        {state.requirementsNotMet ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Anforderungen an das Passwort wurden nicht erfüllg (Länge 8 oder länger)</div> : <></>}
        <div className="mt-2">
            <InputText name="password" title="Bisheriges Passwort" />
        </div>
        <div className="mt-4">
            <InputText name="newPassword" title="Neues Passwort" />
        </div>
        <div className="mt-4">
            <InputText name="confirmPassword" title="Bestätigung des neuen Passwortes" />
        </div>
        <div className="mt-4">
            <ButtonSubmit>Anmelden</ButtonSubmit>
        </div>
    </form>
}