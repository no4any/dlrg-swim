import getSwimmer from "@/lib/mongo/operations/getSwimmer"
import SwimmerForm from "./SwimmerForm";

export default async function SwimmerAdminPage({ params }: { params: { id: string } }) {
    const swimmer = await getSwimmer(params.id);

    return <SwimmerForm swimmer={swimmer} />
}