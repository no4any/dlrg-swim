"use server"

import "server-only";

import getSession from "@/lib/auth/getSession";
import getDistancesCollection from "@/lib/mongo/getDistancesCollection";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

export interface ChangeDistanceEntryState {
    error?: boolean
}

export default async function changeDistanceEntryFormAction(_prevState: ChangeDistanceEntryState, form: FormData): Promise<ChangeDistanceEntryState> {
    const { mail } = await getSession();

    if (mail === null) {
        redirect('/login');
    }

    try {
        const collection = await getDistancesCollection();
        const id = form.get("id")?.toString() || "0";
        const newLaps = parseInt(form.get('laps')?.toString() || "0");

        console.log(id, newLaps);

        const result = await collection.updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                laps: newLaps
            }
        });

        console.log(result.matchedCount);

        if (result.modifiedCount === 0) {
            return { error: true }
        }
    } catch (e) {
        return {
            error: true
        }
    }

    redirect('/admin/laps');
}