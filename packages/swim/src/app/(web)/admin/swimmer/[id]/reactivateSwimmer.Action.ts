"use server"

import getSwimmersCollection from "@/lib/mongo/getSwimmersCollection"
import { ObjectId } from "mongodb";
import "server-only"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import getSession from "@/lib/auth/getSession";

export default async function reactivateSwimmerAction(id: string):Promise<void> {
    const { mail } = await getSession();

    if (mail === null) {
        redirect('/login');
    }

    const col = await getSwimmersCollection();
    col.updateOne({
        _id: new ObjectId(id)
    }, {
        $set: {
            status: "REGISTERED"
        }
    })

    const path = `/admin/swimmer/${id}`;
    revalidatePath(path);
    redirect(path);
}