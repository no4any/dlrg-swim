import { H1 } from "@/components/basic/h";
import getAllDistanceEntriesAction from "./getAllDistanceEntries.action";
import Link from "next/link";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function LapsPage() {
    const distances = await getAllDistanceEntriesAction();

    return <div>
        <H1>Erfasste Bahnen</H1>
        <div>
            {distances.map(distance => <Link key={distance._id?.toString() || "key"} href={`/admin/laps/${distance._id?.toString() || "undefined"}`}>
                <div className="grid grid-cols-3 hover:bg-dlrg-red-100 rounded-lg">
                    <div>{distance.nr}</div>
                    <div>{distance.laps}</div>
                    <div>{distance.nightCup ? "Nachpokal" : ""}</div>
                </div>
            </Link>)}
        </div>
    </div>
}