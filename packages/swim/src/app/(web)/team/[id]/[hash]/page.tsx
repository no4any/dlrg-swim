import hashMatch from "@/lib/hashMatch";
import getTeam from "@/lib/mongo/operations/getTeam";
import { notFound } from "next/navigation";

export default async function TeamRegistrationPage({ params }: { params: { id: string, hash: string } }) {
    if (!hashMatch(params.id, params.hash)) {
        notFound();
    }

    const team = await getTeam(params.id);

    if (team === null) {
        notFound();
    }

    return <div>
        {JSON.stringify(team)}
    </div>
}