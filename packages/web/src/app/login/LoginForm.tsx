"use client"

import InputSubmit from "@/components/input/InputSubmit";
import InputText from "@/components/input/InputText.component";
import { useActionState } from "react";
import LoginAction from "./LoginAction.action";

export interface LoginFormState {
    wrongCredentials?: boolean
}

export const LOGIN_FORM_FIELD_USERNAME: string = "username";
export const LOGIN_FORM_FIELD_PASSWORD: string = "password";

export default function LoginForm() {
    const [state, fromAction, pending] = useActionState<LoginFormState, FormData>(LoginAction, {});
    return <div>
        <h1>Anmelden</h1>
        {state.wrongCredentials ? <div>FEHLER!!!</div> : <></>}
        <form action={fromAction}>
            <div className="py-1">
                <InputText disabled={pending} showPlaceholder required label="Benutzername" name={LOGIN_FORM_FIELD_USERNAME} />
            </div>
            <div className="py-1">
                <InputText disabled={pending} showPlaceholder isPassword label="Passwort" name={LOGIN_FORM_FIELD_PASSWORD} />
            </div>
            <div className="py-1">
                <InputSubmit disabled={pending} label="Anmelden" />
            </div>
        </form>
    </div>
}