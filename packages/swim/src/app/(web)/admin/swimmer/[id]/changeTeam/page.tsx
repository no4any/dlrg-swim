import { H1 } from "@/components/basic/h";
import getSwimmer from "@/lib/mongo/operations/getSwimmer";
import getTeams from "@/lib/mongo/operations/teams/getTeams";
import { notFound } from "next/navigation";
import ChangeTeamForm from "./ChangeTeamForm";
import flatten from "@/lib/flatten";

export default async function ChangeTeamPage({ params }: { params: { id: string } }) {
    const swimmer = await getSwimmer(params.id);

    if (swimmer === null) {
        notFound();
    }

    const teams = await flatten(await getTeams());

    return <div>
        <H1>Team ändern für: {swimmer.lastName}, {swimmer.firstName}</H1>
        <ChangeTeamForm id={params.id} teams={teams} currentTeamId={swimmer.teamId}/>
    </div>
}