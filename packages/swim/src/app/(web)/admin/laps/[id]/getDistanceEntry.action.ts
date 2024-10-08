"use server"

import getSession from "@/lib/auth/getSession";
import DistanceEntry from "@/lib/model/DistanceEntry.interface";
import getDistancesCollection from "@/lib/mongo/getDistancesCollection";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import "server-only";

export default async function getDistanceEntryAction(id: string): Promise<DistanceEntry | null> {
    const {mail} = await getSession();

    if(mail === null) {
        redirect('/login');
    }

    const collection = await getDistancesCollection();
    
    const result = await collection.findOne({
        _id: new ObjectId(id)
    })

    return result;
}