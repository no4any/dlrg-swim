import { H1 } from "@/components/basic/h";
import getSwimmerAction from "../getSwimmer.action";
import { notFound } from "next/navigation";
import RegisterForm from "./RegisterForm";

export default async function RegisterSwimmerPage({ params }: { params: { id: string } }) {
    const swimmer = await getSwimmerAction(params.id);

    if(swimmer === null) {
        notFound();
    }

    if(swimmer.status !== "ANNOUNCED") {
        return <H1>{swimmer.lastName}, {swimmer.firstName} ist bereits angemeldet</H1>
    }

    return <div>
        <H1>Anmeldung eines neuen Schwimmers</H1>
        <RegisterForm swimmer={swimmer} />
    </div>
}