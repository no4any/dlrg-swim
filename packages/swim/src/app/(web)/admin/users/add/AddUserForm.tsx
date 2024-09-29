"use client";

import ButtonSubmit from "@/components/input/ButtonSubmit.component";
import InputText from "@/components/input/InputText.component";
import { useFormState } from "react-dom";
import AddUserState from "./AddUserState.interface";
import addUserAction from "./addUser.action";
import InputCheckbox from "@/components/input/InputCheckbox.component";

export default function AddUserForm() {
    const [state, formAction] = useFormState<AddUserState, FormData>(addUserAction, {})

    return <form action={formAction}>
        {state.error ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>E-Mail ist möglicherweise falsch formuliert oder das Passwort hat weniger als 8 Zeichen</div> : <></>}
        {state.userAlreadyExists ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Diese E-Mail wird bereits verwendet</div> : <></>}
        <div className="mt-2">
            <InputText name="mail" title="E-Mail" />
        </div>
        <div className="mt-4">
            <InputText name="password" title="Passwort" />
        </div>
        <div className="mt-4">
            <InputCheckbox name="admin" title="Soll administrator sein?" />
        </div>
        <div className="mt-4">
            <ButtonSubmit>Benutzer anlegen</ButtonSubmit>
        </div>
    </form>
}