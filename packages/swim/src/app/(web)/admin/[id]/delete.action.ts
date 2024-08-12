"use server"

import deleteSwimmer from "@/lib/mongo/operations/deleteSimmer"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteAction(id: string) {
    const result = await deleteSwimmer(id);
    revalidatePath(`/admin`);
    redirect(`/admin`)
}