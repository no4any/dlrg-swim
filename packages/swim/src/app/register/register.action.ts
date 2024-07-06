"use server"

import Swimmer, { SwimmerSchema } from "@/lib/model/Swimmer.interface";
import addSwimmer from "@/lib/mongo/operations/addSwimmer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function registerAction(form: FormData) {
    const swimmer: Swimmer = SwimmerSchema.parse({
        lastName: form.get('name')?.toString() || "",
        firstName: form.get('prename')?.toString() || "",
        email: form.get('email')?.toString() || "",
        birthday: form.get('birthday')?.toString(),
        city: form.get('city')?.toString(),
        teamName: form.get('teamName')?.toString(),
        breakfast: form.get('breakfast') === "on",
        distanceRating: form.get('distanceRating') === "on",
        publishName: form.get('publishName') === "on"
    })

    const swimmerId = await addSwimmer(swimmer);

    console.log(swimmerId);

    revalidatePath(`/register/${swimmerId}`)
    redirect(`/register/${swimmerId}`);
}