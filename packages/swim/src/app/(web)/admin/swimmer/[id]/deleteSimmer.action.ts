"use server"

import getSession from "@/lib/auth/getSession"
import getSwimmer from "@/lib/mongo/operations/getSwimmer";
import deleteSwimmer from "@/lib/mongo/operations/swimmers/deleteSwimmer";
import { redirect } from "next/navigation";
import "server-only"

export default async function deleteSwimmerAction(id: string) {
    const { isAdmin } = await getSession();

    if (!isAdmin) {
        redirect('/admin/swimmer');
    }

    const swimmer = await getSwimmer(id);

    if (swimmer === null) {
        redirect('/admin/swimmer');
    }

    if (swimmer.status !== "ANNOUNCED") {
        redirect('/admin/swimmer');
    }

    await deleteSwimmer(id);

    redirect('/admin/swimmer');
}