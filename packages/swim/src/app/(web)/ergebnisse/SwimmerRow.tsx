import Swimmer from "@/lib/model/Swimmer.interface";
import getDistanceForSwimmer from "@/lib/mongo/operations/distances/getDistanceForSwimmer";
import getDistanceForSwimmerNight from "@/lib/mongo/operations/distances/getDistanceForSwimmerNight";

export default async function SwimmerRow({ swimmer }: { swimmer: Swimmer }) {
    const total = await getDistanceForSwimmer(swimmer._id?.toString() || "");
    const night = await getDistanceForSwimmerNight(swimmer._id?.toString() || "")
    return <div className="grid grid-cols-4">
        <div>{swimmer.lastName}</div>
        <div>{swimmer.firstName}</div>
        <div>{total}m ({total / 50} Bahnen)</div>
        <div>{night}m ({night / 50} Bahnen)</div>
    </div>
}