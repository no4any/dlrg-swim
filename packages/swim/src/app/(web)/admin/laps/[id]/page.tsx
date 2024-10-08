import { H1, H2, H3 } from "@/components/basic/h";
import getDistanceEntryAction from "./getDistanceEntry.action";
import { notFound } from "next/navigation";
import getSwimmer from "@/lib/mongo/operations/getSwimmer";
import ChangeDistanceEntryForm from "./ChangeDistanceEntryForm";

export default async function DistanceEntryPage({ params }: { params: { id: string } }) {
    const entry = await getDistanceEntryAction(params.id);

    if (entry === null) {
        notFound();
    }

    const swimmer = await getSwimmer(entry.swimmerId);

    return <div>
        <H1>Eintrag anpassen</H1>
        <H2>Für Schwimmer: {swimmer?.lastName}, {swimmer?.firstName}</H2>
        <H3>Eintrag ID: {entry.nr}</H3>
        <ChangeDistanceEntryForm id={params.id} laps={entry.laps} night={entry.nightCup} />
    </div>
}