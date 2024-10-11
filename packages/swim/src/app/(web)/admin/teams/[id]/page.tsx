import ButtonLink from "@/components/basic/buttonLink";
import { H1, H2, H3 } from "@/components/basic/h";
import getDistanceForSwimmer from "@/lib/mongo/operations/distances/getDistanceForSwimmer";
import getDistanceForTeam from "@/lib/mongo/operations/distances/getDistanceForTeam";
import getSwimmer from "@/lib/mongo/operations/getSwimmer";
import getTeam from "@/lib/mongo/operations/getTeam";
import getTeamMembers from "@/lib/mongo/operations/getTeamMembers";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;
export const dynamic = 'force-dynamic'

export default async function TeamPage({ params }: { params: { id: string } }) {
    const team = await getTeam(params.id);

    if (team === null) {
        notFound();
    }

    const total = await getDistanceForTeam(params.id);

    const members = (await getTeamMembers(params.id)).sort((a, b) => a.lastName > b.lastName ? 1 : -1);

    return <div>
        <H1>Team: {team.name}</H1>
        <div className="pb-4">
            <ButtonLink href={`/admin/teams/${params.id}/change`}>Ändern</ButtonLink>
        </div>
        <H2>Leistungen</H2>
        <H3><b>Gesamtleistung:</b> {total} ({total / 50} Bahnen)</H3>
        <H2>Mitglieder</H2>
        {await Promise.all(members.map(async (member) => {
            const distance = await getDistanceForSwimmer(member._id?.toString() || "");
            return <Link key={member._id?.toString()} href={`/admin/swimmer/${member?._id?.toString() || ""}`}>
                <div className="grid grid-cols-3 hover:bg-dlrg-red-100 rounded-lg">
                    <div className="p-1">{member.lastName}, {member.firstName} {member._id?.toString() === team.owner ? "(Teamleiter)" : ""}</div>
                    <div className="p-1">{member.status}</div>
                    <div className="p-1">{distance}m ({distance/50} Bahnen)</div>
                </div>
            </Link>
        }))}
    </div>
}