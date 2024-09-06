"use server"

import Swimmer, { SwimmerSchema } from "@/lib/model/Swimmer.interface";
import addSwimmer from "@/lib/mongo/operations/addSwimmer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RegisterFormState } from "./RegisterForm.component";
import mailAlreadyExists from "@/lib/mongo/operations/mailAlreadyExits";

export default async function registerAction(prevState: RegisterFormState, form: FormData): Promise<RegisterFormState> {
    console.log(form);
    let swimmerId = "---";
    try {
        const swimmer: Swimmer = SwimmerSchema.parse({
            lastName: form.get('name')?.toString() || "",
            firstName: form.get('prename')?.toString() || "",
            email: (form.get('email')?.toString() || "").toLowerCase(),
            birthday: form.get('birthday')?.toString() || undefined,
            city: form.get('city')?.toString(),
            teamName: form.get('teamName')?.toString(),
            breakfast: form.get('breakfast') === "on",
            distanceRating: form.get('distanceRating') === "on",
            publishName: form.get('publishName') === "on",
            status: "ANNOUNCED"
        })
        if (await mailAlreadyExists(swimmer.email)) {
            return {
                checkInput: true,
                mailAlreadyInUse: true
            }
        }
        swimmerId = await addSwimmer(swimmer);
        console.log(swimmerId);
    } catch (e) {
        return { checkInput: true }
    }
    revalidatePath(`/register/${swimmerId}`)
    redirect(`/register/${swimmerId}`);
}