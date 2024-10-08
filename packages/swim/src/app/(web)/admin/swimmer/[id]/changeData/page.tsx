import { H1 } from "@/components/basic/h";
import getSwimmer from "@/lib/mongo/operations/getSwimmer";
import { notFound } from "next/navigation";
import ChangeDataForm from "./ChangeDataForm";
import flatten from "@/lib/flatten";

export default async function ChangeDatePage({ params }: { params: { id: string } }) {
    const swimmer = await getSwimmer(params.id);

    if (swimmer === null) {
        notFound();
    }

    return <div>
        <H1>Daten für Schwimmer: {swimmer.lastName}, {swimmer.firstName} ändern</H1>
        <ChangeDataForm swimmer={await flatten(swimmer)} />
    </div>
}