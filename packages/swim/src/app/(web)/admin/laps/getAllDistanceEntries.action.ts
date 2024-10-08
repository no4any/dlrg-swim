"use server"

import getSession from "@/lib/auth/getSession"
import flatten from "@/lib/flatten";
import DistanceEntry from "@/lib/model/DistanceEntry.interface"
import getDistancesCollection from "@/lib/mongo/getDistancesCollection";
import { redirect } from "next/navigation";
import "server-only"

export default async function getAllDistanceEntriesAction(): Promise<DistanceEntry[]> {
    const {mail} = await getSession();

    if(!mail) {
        redirect('/login');
    }

    const collection = await getDistancesCollection();
    const result = await collection.find({}).sort({nr: 1}).toArray();
    
    return flatten(result);
}