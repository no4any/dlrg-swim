"use server"

import getSession from "@/lib/auth/getSession"
import flatten from "@/lib/flatten"
import Swimmer from "@/lib/model/Swimmer.interface"
import getSwimmer from "@/lib/mongo/operations/getSwimmer"
import { redirect } from "next/navigation"
import "server-only"

export default async function getSwimmerAction(id: string): Promise<Swimmer | null> {
    const { mail } = await getSession();

    if (mail === null) {
        redirect('/login');
    }
    
    return await flatten(await getSwimmer(id));
}