import { H1 } from "@/components/basic/h";
import AddUserForm from "./AddUserForm";

export default async function AddUserPage() {
    return <div>
        <H1>Benutzer hinzufügen</H1>
        <AddUserForm />
    </div>
}