import { H1 } from "@/components/basic/h";
import getSession from "@/lib/auth/getSession";
import getTeam from "@/lib/mongo/operations/getTeam";
import { notFound, redirect } from "next/navigation";
import ChangeTeamForm from "./ChangeTeamForm";
import flatten from "@/lib/flatten";

export default async function ChangeTeamPage({ params }: { params: { id: string } }) {
    const { mail } = await getSession();

    if (mail === null) {
        redirect('/login');
    }

    const team = await getTeam(params.id);

    if (team === null) {
        notFound();
    }

    return <div>
        <H1>Team ändern: {team.name}</H1>
        <ChangeTeamForm team={await flatten(team)} />
    </div>
}