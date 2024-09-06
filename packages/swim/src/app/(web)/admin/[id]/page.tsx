import getSwimmer from "@/lib/mongo/operations/getSwimmer"
import SwimmerForm from "./SwimmerForm";
import getDistances from "@/lib/mongo/operations/getDistances";

export default async function SwimmerAdminPage({ params }: { params: { id: string } }) {
    const swimmer = await getSwimmer(params.id);
    const distances = await getDistances(params.id);

    return <SwimmerForm swimmer={swimmer} distances={distances} />
}