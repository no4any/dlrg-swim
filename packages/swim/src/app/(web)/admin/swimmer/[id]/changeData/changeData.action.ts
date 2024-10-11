"use server"

import SwimErrorNoSwimmer from "@/lib/error/SwimErrorNoSwimmer";
import Swimmer, { SwimmerSchema } from "@/lib/model/Swimmer.interface";
import getSwimmersCollection from "@/lib/mongo/getSwimmersCollection";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import "server-only"

export interface ChangeDataActionState {
    error?: boolean;
}

async function formToSchwimmer(form: FormData): Promise<Swimmer> {
    try {
        return SwimmerSchema.parse({
            lastName: form.get('name')?.toString() || "",
            firstName: form.get('prename')?.toString() || "",
            gender: form.get('gender')?.toString() || "0",
            email: (form.get('email')?.toString() || "").toLowerCase(),
            birthday: form.get('birthday')?.toString() || undefined,
            teamId: form.get('teamId') || undefined,
            city: form.get('city')?.toString(),
            breakfast: form.get('breakfast') === "on",
            distanceRating: form.get('distanceRating') === "on",
            publishName: form.get('publishName') === "on",
            newsletter: form.get('newsletter') === "on",
            status: "ANNOUNCED"
        });
    } catch (e) {
        throw new SwimErrorNoSwimmer("Form is no swimmer")
    }
}

export default async function changeDataAction(_prevState: ChangeDataActionState, form: FormData): Promise<ChangeDataActionState> {
    const id = form.get("id")?.toString() || "undefined"
    try {
        const swimmer = await formToSchwimmer(form);

        const collection = await getSwimmersCollection();

        const result = await collection.updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                lastName: swimmer.lastName,
                firstName: swimmer.firstName,
                email: swimmer.email,
                birthday: swimmer.birthday,
                city: swimmer.city,
                gender: swimmer.gender,
                breakfast: swimmer.breakfast,
                distanceRating: swimmer.distanceRating,
                publishName: swimmer.publishName,
                newsletter: swimmer.newsletter
            }
        })

        if (result.modifiedCount === 0) {
            return {
                error: true
            }
        }
    } catch (e) {
        console.error(e);
        return { error: true }
    }

    revalidatePath('/admin');
    redirect(`/admin/swimmer/${id}`)
}