"use server"

import Swimmer, { SwimmerSchema } from "@/lib/model/Swimmer.interface";
import addSwimmer from "@/lib/mongo/operations/addSwimmer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RegisterFormState } from "./RegisterForm.component";
import mailAlreadyExists from "@/lib/mongo/operations/mailAlreadyExits";
import hash from "@/lib/hash";

export default async function registerAction(_prevState: RegisterFormState, form: FormData): Promise<RegisterFormState> {
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
    } catch (e) {
        return { checkInput: true }
    }

    const newPath = `/anmelden/${swimmerId}/${hash(swimmerId)}`
    console.log(newPath);
    revalidatePath(newPath);
    redirect(newPath);
}