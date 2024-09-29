import { H1 } from "@/components/basic/h";
import ButtonSubmit from "@/components/input/ButtonSubmit.component";
import InputText from "@/components/input/InputText.component";
import { useFormState } from "react-dom";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function UserPage() {
    //return const [state, formAction] = useFormState<LoginFormState, FormData>(loginAction, {})

    return <div>
        <H1>Passwort ändern</H1>
        <ChangePasswordForm />
    </div>
}