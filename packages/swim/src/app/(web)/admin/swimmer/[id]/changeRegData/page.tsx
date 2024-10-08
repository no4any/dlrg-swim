import { H1 } from "@/components/basic/h";
import getSwimmer from "@/lib/mongo/operations/getSwimmer";
import { notFound } from "next/navigation";
import ChangeRegDataForm from "./ChangeRegDataForm";
import flatten from "@/lib/flatten";

export default async function ChangeBandPage({ params }: { params: { id: string } }) {
    const swimmer = await getSwimmer(params.id);

    if (swimmer === null) {
        notFound();
    }

    if(swimmer.status === "ANNOUNCED" || swimmer.status === "FINISHED") {
        return <div>Änderungen nicht möglich</div>
    }

    return <div>
        <H1>Registrierungsdaten für {swimmer.lastName}, {swimmer.firstName} ändern</H1>
        <ChangeRegDataForm swimmer={await flatten(swimmer)}/>
    </div>
}