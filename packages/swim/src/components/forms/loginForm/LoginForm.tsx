"use client"

import ButtonSubmit from "@/components/input/ButtonSubmit.component"
import InputText from "@/components/input/InputText.component"
import loginAction from "./login.action"
import { useFormState } from "react-dom"
import LoginFormState from "./LoginFormState.interface"

export default function LoginForm() {
    const [state, formAction] = useFormState<LoginFormState, FormData>(loginAction, {})

    return <div>
        <form action={formAction}>
            <h1 className="text-2xl font-bold text-dlrg-blue w-1/2">Anmelden</h1>
            {state.loginFailed ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Login fehlgeschlagen. Falscher Benutzername und/oder Passwort.</div> : <></>}
            <div className="mt-2">
                <InputText name="name" title="Benutzername/E-Mail" />
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium">
                    Passwort
                    <input
                        type="password"
                        name="password"
                        className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                    />
                </label>
            </div>
            <div className="mt-4">
                <ButtonSubmit>Anmelden</ButtonSubmit>
            </div>
        </form>
    </div>
}