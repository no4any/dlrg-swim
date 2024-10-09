"use server"

import getSession from "@/lib/auth/getSession";
import getSwimmersCollection from "@/lib/mongo/getSwimmersCollection";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import "server-only";

export default async function closeForMedalAction(id: string) {
    const { mail } = await getSession();

    if (mail === null) {
        redirect('/login');
    }

    const col = await getSwimmersCollection();
    await col.updateOne({
        _id: new ObjectId(id)
    }, {
        $set: {
            status: "FINISHED"
        }
    })
    const path = `/admin/swimmer/${id}`;
    revalidatePath(path);
    redirect(path);
}