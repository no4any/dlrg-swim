import { H1, H2, H3 } from "@/components/basic/h";
import getSwimmer from "@/lib/mongo/operations/getSwimmer";
import getTeam from "@/lib/mongo/operations/getTeam";
import getTeamMembers from "@/lib/mongo/operations/getTeamMembers";
import { notFound } from "next/navigation";

export const revalidate = 0;
export const dynamic = 'force-dynamic'

export default async function TeamPage({ params }: { params: { id: string } }) {
    const team = await getTeam(params.id);
    if (team === null) {
        notFound();
    }
    const members = await getTeamMembers(params.id);

    const leader = await getSwimmer(team.owner);

    return <div>
        <H1>Team: {team.name}</H1>
        <H2>Teamleiter</H2>
        <div>{leader?.lastName}, {leader?.firstName}</div>
        <H2>Mitglieder</H2>
        {members.map((member) => <div key={member._id?.toString() || ""}>{member.lastName}, {member.firstName}</div>)}
    </div>
}