"use server"

import getSession from "@/lib/auth/getSession";
import getDistancesCollection from "@/lib/mongo/getDistancesCollection";
import generateId from "@/lib/mongo/operations/counter/generateId";
import getSwimmer from "@/lib/mongo/operations/getSwimmer";
import { revalidatePath } from "next/cache";

export default async function logAction(id: string, laps: number, night: boolean): Promise<number> {
    const { mail } = await getSession();

    if (!mail) {
        return 0;
    }

    const swimmer = await getSwimmer(id);

    if (swimmer === null) {
        return 0;
    }

    if (swimmer.status === "FINISHED") {
        return 0;
    }

    const regId = await generateId("distanceEntry");

    const collection = await getDistancesCollection();

    await collection.insertOne({
        createdAt: new Date().getTime(),
        laps,
        nr: regId,
        registerer: mail,
        swimmerId: id,
        nightCup: night,
    })

    revalidatePath('/admin');

    return regId;
}