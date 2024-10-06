"use server"

import getSession from "@/lib/auth/getSession";
import flatten from "@/lib/flatten";
import Swimmer from "@/lib/model/Swimmer.interface";
import getSwimmersCollection from "@/lib/mongo/getSwimmersCollection";

export default async function findByCap(capColor: string, capNr: number): Promise<Swimmer | null> {
    const { mail } = await getSession();

    if (!mail) {
        return null;
    }

    const swimmer = await (await getSwimmersCollection()).findOne({
        capColor, capNr
    });

    if (swimmer !== null) {
        return flatten(swimmer);
    }

    return null;
}