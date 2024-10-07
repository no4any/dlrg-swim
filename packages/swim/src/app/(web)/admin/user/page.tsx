import { H1 } from "@/components/basic/h";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function UserPage() {
    return <div>
        <H1>Passwort ändern</H1>
        <ChangePasswordForm />
    </div>
}