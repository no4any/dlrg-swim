"use server"

import Swimmer, { SwimmerSchema } from "@/lib/model/Swimmer.interface";
import addSwimmer from "@/lib/mongo/operations/addSwimmer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import mailAlreadyExists from "@/lib/mongo/operations/mailAlreadyExits";
import hash from "@/lib/hash";
import getMongoClient from "@/lib/mongo/getMongoClient";
import SwimErrorNoSwimmer from "@/lib/error/SwimErrorNoSwimmer";
import { TeamRegisterFormState } from "./TeamRegisterForm.component";
import mail from "@/lib/mail";
import textForRegMail from "@/lib/textForRegMail";
import { BASE_PATH } from "@/lib/params";

async function formToSchwimmer(form: FormData): Promise<Swimmer> {
    try {
        return SwimmerSchema.parse({
            lastName: form.get('name')?.toString() || "",
            firstName: form.get('prename')?.toString() || "",
            email: (form.get('email')?.toString() || "").toLowerCase(),
            birthday: form.get('birthday')?.toString() || undefined,
            teamId: form.get('teamId') || undefined,
            city: form.get('city')?.toString() || undefined,
            breakfast: form.get('breakfast') === "on",
            distanceRating: form.get('distanceRating') === "on",
            publishName: form.get('publishName') === "on",
            newsletter: form.get('newsletter') === "on",
            status: "ANNOUNCED"
        });
    } catch(e) {
        throw new SwimErrorNoSwimmer("Form is no swimmer")
    }
}

export default async function teamRegisterAction(_prevState: TeamRegisterFormState, form: FormData): Promise<TeamRegisterFormState> {
    let swimmerId = "---";
    const mongo = await getMongoClient();
    const session = mongo.startSession();
    try {
        session.startTransaction();

        const swimmer: Swimmer = await formToSchwimmer(form)

        if (await mailAlreadyExists(swimmer.email)) {
            return {
                checkInput: true,
                mailAlreadyInUse: true
            }
        }

        swimmerId = await addSwimmer(swimmer);
        mail(swimmer.email, textForRegMail(`${BASE_PATH}/anmelden/${swimmerId}/${hash(swimmerId)}`));
    } catch (e) {
        await session.abortTransaction();
        return { checkInput: true }
    } finally {
        await session.endSession();
    }

    const newPath = `/anmelden/${swimmerId}/${hash(swimmerId)}`
    revalidatePath(newPath);
    redirect(newPath);
}