"use server"

import getSession from "@/lib/auth/getSession";
import deleteSwimmer from "@/lib/mongo/operations/swimmers/deleteSwimmer";
import { redirect } from "next/navigation";
import "server-only"

export default async function deleteSwimmerAction(id: string): Promise<boolean> {
    const {isAdmin} = await getSession();

    if(!isAdmin) {
        redirect('/admin')
    }

    return (await deleteSwimmer(id)) > 0;
}