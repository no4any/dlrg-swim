"use server"

import "server-only";
import getSession from "@/lib/auth/getSession";
import flatten from "@/lib/flatten";
import Swimmer from "@/lib/model/Swimmer.interface";
import getSwimmersCollection from "@/lib/mongo/getSwimmersCollection";
import { redirect } from "next/navigation";

export default async function findByReg(regNr: number): Promise<Swimmer | null> {
    const { mail } = await getSession();

    if (!mail) {
        redirect("/login");
    }

    const swimmer = await (await getSwimmersCollection()).findOne({ regNr });

    if (swimmer !== null) {
        return flatten(swimmer);
    }

    return null;
}