import getSwimmer from "@/lib/mongo/operations/getSwimmer"
import SwimmerForm from "./SwimmerForm";
import getDistances from "@/lib/mongo/operations/getDistances";
import { notFound } from "next/navigation";

export default async function SwimmerAdminPage({ params }: { params: { id: string } }) {
    const swimmer = await getSwimmer(params.id);
    const distances = await getDistances(params.id);

    if(swimmer === null) {
        notFound();
    }

    return <SwimmerForm swimmer={swimmer} distances={distances} />
}