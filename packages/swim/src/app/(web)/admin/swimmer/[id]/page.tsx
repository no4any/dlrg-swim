import { H1, H2 } from "@/components/basic/h";
import getSwimmerAction from "./getSwimmer.action";
import SwimmerOverview from "./SwimmerOverview";
import getTeam from "@/lib/mongo/operations/getTeam";
import DistanceEntry from "@/lib/model/DistanceEntry.interface";
import getDistancesAction from "./getDistances.action";
import { notFound } from "next/navigation";
import youthMedal, { Medal } from "@/lib/medal/youthMedal";
import getDistanceForSwimmer from "@/lib/mongo/operations/distances/getDistanceForSwimmer";
import hash from "@/lib/hash";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function EditSwimmerPage({ params }: { params: { id: string } }) {
    const swimmer = await getSwimmerAction(params.id);

    if (swimmer === null) {
        notFound();
    }

    const distances: DistanceEntry[] = await getDistancesAction(params.id);
    const distance: number = await getDistanceForSwimmer(params.id);

    let teamName: undefined | string = undefined;

    if (swimmer?.teamId) {
        teamName = (await getTeam(swimmer.teamId))?.name;
    }


    let medal: Medal = null;

    if (swimmer.birthday) {
        medal = youthMedal(distance, new Date(swimmer.birthday));
    }

    const hashed = hash(swimmer._id?.toString() || "")

    return <div>
        <H1>Schwimmerdetails</H1>
        <H2>{swimmer.lastName}, {swimmer.firstName}</H2>
        <SwimmerOverview swimmer={{ ...swimmer, teamName, medal, hash: hashed }} distances={distances} />
    </div>
}