"use server"

import "server-only"
import { ChangeTeamFormState } from "./ChangeTeamForm"
import getSession from "@/lib/auth/getSession";
import { redirect } from "next/navigation";
import getTeamsCollection from "@/lib/mongo/getTeamsCollection";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export default async function changeTeamAction(_prev: ChangeTeamFormState, form: FormData): Promise<ChangeTeamFormState> {
    const { mail } = await getSession();

    if (mail === null) {
        redirect('/login')
    }

    const id = form.get("id")?.toString() || "";
    const name = form.get("name")?.toString() || "";
    const type = form.get("type")?.toString() || "S";

    if (!["S", "F", "V"].includes(type)) {
        return {
            wrongTypeError: true
        }
    }

    if (name.length <= 2) {
        return {
            nameError: true
        }
    }

    const col = await getTeamsCollection();
    const result = await col.updateOne({
        _id: new ObjectId(id)
    }, {
        $set: {
            name,
            lowerName: name.toLocaleLowerCase(),
            type: type as "S" | "F" | "V"
        }
    })

    if (result.modifiedCount === 0) {
        return {
            noChange: true
        }
    }

    revalidatePath('/admin');
    redirect(`/admin/teams/${id}`)
}