"use server"

import "server-only";

import flatten from "@/lib/flatten";
import Swimmer from "@/lib/model/Swimmer.interface";
import getSwimmers from "@/lib/mongo/operations/getSwimmers";
import getSession from "@/lib/auth/getSession";
import { redirect } from "next/navigation";

export default async function getSwimmersAction(): Promise<Swimmer[]> {
    const {mail} = await getSession();

    if(mail === null) {
        redirect('/admin');
    }

    return flatten(await getSwimmers());
}