"use server"

import getSession from "@/lib/auth/getSession";
import Swimmer from "@/lib/model/Swimmer.interface"
import getSwimmersCollection from "@/lib/mongo/getSwimmersCollection";
import { redirect } from "next/navigation";
import "server-only"

export default async function getBreakfastBookingsAction(): Promise<Swimmer[]> {
    const { mail } = await getSession();

    if (mail === null) {
        redirect('/login')
    }

    const col = await getSwimmersCollection();

    const result = await col.find({ breakfast: true }).toArray();
    
    return result;
}