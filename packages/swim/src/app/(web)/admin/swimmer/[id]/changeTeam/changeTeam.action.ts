"use server"

import "server-only"

import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import getSwimmersCollection from "@/lib/mongo/getSwimmersCollection";

export interface ChangeTeamActionState {
    error?: boolean;
}

export default async function changeTeamAction(_prevState: ChangeTeamActionState, form: FormData): Promise<ChangeTeamActionState> {
    const collection = await getSwimmersCollection();

    const newTeamId = form.get('team')?.toString() || "NONE";

    try {

        collection.updateOne({
            _id: new ObjectId(form.get("id")?.toString())
        }, {
            $set: {
                teamId: newTeamId === "NONE" ? undefined : newTeamId
            }
        })
    } catch (e) {
        console.error(e);
        return { error: true }
    }
    
    redirect('/admin/swimmer');
}