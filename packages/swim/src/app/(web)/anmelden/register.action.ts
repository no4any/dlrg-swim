"use server"

import Swimmer, { SwimmerSchema } from "@/lib/model/Swimmer.interface";
import addSwimmer from "@/lib/mongo/operations/addSwimmer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RegisterFormState } from "./RegisterForm.component";
import mailAlreadyExists from "@/lib/mongo/operations/mailAlreadyExits";
import hash from "@/lib/hash";
import Team, { TeamSchema } from "@/lib/model/Team.interface";
import teamAlreadyExists from "@/lib/mongo/operations/teamAlreadyExists";
import addTeam from "@/lib/mongo/operations/addTeam";
import updateSwimmerTeam from "@/lib/mongo/operations/updateSwimmerTeam";
import getMongoClient from "@/lib/mongo/getMongoClient";
import SwimErrorNoSwimmer from "@/lib/error/SwimErrorNoSwimmer";

async function formToSchwimmer(form: FormData): Promise<Swimmer> {
    try {
        return SwimmerSchema.parse({
            lastName: form.get('name')?.toString() || "",
            firstName: form.get('prename')?.toString() || "",
            email: (form.get('email')?.toString() || "").toLowerCase(),
            birthday: form.get('birthday')?.toString() || undefined,
            city: form.get('city')?.toString(),
            breakfast: form.get('breakfast') === "on",
            distanceRating: form.get('distanceRating') === "on",
            publishName: form.get('publishName') === "on",
            status: "ANNOUNCED"
        });
    } catch(e) {
        throw new SwimErrorNoSwimmer("Form is no swimmer")
    }
}

export default async function registerAction(_prevState: RegisterFormState, form: FormData): Promise<RegisterFormState> {
    let swimmerId = "---";
    const mongo = await getMongoClient();
    const session = mongo.startSession();
    try {
        session.startTransaction();

        const teamName = form.get("teamName")?.toString();

        if (form.get("addTeam") === "on" && teamName) {
            if (await teamAlreadyExists(teamName)) {
                return {
                    checkInput: true,
                    problemWithTeamName: true
                }
            }
        }

        const swimmer: Swimmer = await formToSchwimmer(form)

        if (await mailAlreadyExists(swimmer.email)) {
            return {
                checkInput: true,
                mailAlreadyInUse: true
            }
        }

        swimmerId = await addSwimmer(swimmer);

        if (form.get("addTeam") === "on" && form.get("teamName")) {
            const team: Team = TeamSchema.parse({
                name: form.get('teamName'),
                lowerName: form.get('teamName')?.toString().toLowerCase(),
                owner: swimmerId
            });

            const teamId = await addTeam(team);

            updateSwimmerTeam(swimmerId, teamId);
        }
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