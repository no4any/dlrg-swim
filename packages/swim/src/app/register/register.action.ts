"use server"

import Swimmer, { SwimmerSchema } from "@/lib/model/Swimmer.interface";
import addSwimmer from "@/lib/mongo/operations/addSwimmer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RegisterFormState } from "./RegisterForm.component";

export default async function registerAction(prevState: RegisterFormState, form: FormData): Promise<RegisterFormState> {
    console.log(form);
    let swimmerId = "---";
    try {
        const swimmer: Swimmer = SwimmerSchema.parse({
            lastName: form.get('name')?.toString() || "",
            firstName: form.get('prename')?.toString() || "",
            email: form.get('email')?.toString() || "",
            birthday: form.get('birthday')?.toString() || undefined,
            city: form.get('city')?.toString(),
            teamName: form.get('teamName')?.toString(),
            breakfast: form.get('breakfast') === "on",
            distanceRating: form.get('distanceRating') === "on",
            publishName: form.get('publishName') === "on",
            status: "ANNOUNCED"
        })
        swimmerId = await addSwimmer(swimmer);
        console.log(swimmerId);
    } catch (e) {
        return { checkInput: true }
    }
    revalidatePath(`/register/${swimmerId}`)
    redirect(`/register/${swimmerId}`);
}