import getSwimmer from "@/lib/mongo/operations/getSwimmer"
import { notFound } from "next/navigation";
import RegisterForm from "./RegisterForm";

export default async function Registrationpage({ params }: { params: { id: string } }) {
    const swimmer = await getSwimmer(params.id);

    if (swimmer === null) {
        notFound();
    }

    return <div>
        <div>Name: {swimmer.lastName}</div>
        <div>Vorname: {swimmer.firstName}</div>
        <div>Will frühstück: {swimmer.breakfast ? "Ja" : "Nein"}</div>
        <RegisterForm swimmer={swimmer} />
    </div>
}