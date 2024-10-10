"use server"

import "server-only"
import getSession from "@/lib/auth/getSession"
import flatten from "@/lib/flatten"
import { redirect } from "next/navigation"
import getDistancesForSwimmer from "@/lib/mongo/operations/distances/getDistancesForSwimmer"
import DistanceEntry from "@/lib/model/DistanceEntry.interface"

export default async function getDistancesAction(id: string): Promise<DistanceEntry[]> {
    const { mail } = await getSession();

    if (mail === null) {
        redirect('/login');
    }

    return await flatten(await getDistancesForSwimmer(id));
}