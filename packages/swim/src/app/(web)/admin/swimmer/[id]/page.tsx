import { H1, H2 } from "@/components/basic/h";
import getSwimmerAction from "./getSwimmer.action";
import { notFound } from "next/navigation";
import SwimmerOverview from "./SwimmerOverview";
import getTeam from "@/lib/mongo/operations/getTeam";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function EditSwimmerPage({ params }: { params: { id: string } }) {
    const swimmer = await getSwimmerAction(params.id);
    let teamName: undefined | string = undefined;

    if (swimmer?.teamId) {
        teamName = (await getTeam(swimmer.teamId))?.name;
    }

    if (swimmer === null) {
        notFound();
    }

    return <div>
        <H1>Schwimmerdetails</H1>
        <H2>{swimmer.lastName}, {swimmer.firstName}</H2>
        <SwimmerOverview swimmer={{ ...swimmer, teamName }} distances={[]} />
    </div>
}