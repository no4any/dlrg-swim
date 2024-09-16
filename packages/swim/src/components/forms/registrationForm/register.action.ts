"use server"

import getMongoClient from "@/lib/mongo/getMongoClient";
import RegisterFormState from "./RegisterFormState.interface"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import hash from "@/lib/hash";
import formToSchwimmer from "./formToSwimmer";
import mailAlreadyExists from "@/lib/mongo/operations/mailAlreadyExits";
import mail from "@/lib/mail";
import textForRegMail from "@/lib/textForRegMail";
import { BASE_PATH, MONGO_SWIMMERS_COLLECTION, MONGO_SWIMMERS_DATABASE, MONGO_TEAMS_COLLECTION } from "@/lib/params";
import hashMatch from "@/lib/hashMatch";
import Team, { TeamSchema } from "@/lib/model/Team.interface";
import { ObjectId } from "mongodb";
import Swimmer from "@/lib/model/Swimmer.interface";

export default async function registerAction(_prevState: RegisterFormState, form: FormData): Promise<RegisterFormState> {
    let swimmerId = "---";
    let teamId = "---";
    const mongo = await getMongoClient();
    const mongodb = mongo.db(MONGO_SWIMMERS_DATABASE);
    const swimmersCollection = mongodb.collection<Swimmer>(MONGO_SWIMMERS_COLLECTION);
    const teamsCollection = mongodb.collection<Team>(MONGO_TEAMS_COLLECTION);
    try {
        const swimmer = await formToSchwimmer(form);

        if (form.get("teamId")) {
            if (!hashMatch(form.get("teamId")?.toString() || "", form.get("hash")?.toString() || "")) {
                return {
                    checkInput: true,
                    hashMatchError: true
                }
            }
        }

        if (await mailAlreadyExists(swimmer.email)) {
            return {
                checkInput: true,
                mailAlreadyInUse: true
            }
        }

        swimmerId = (await swimmersCollection.insertOne(swimmer)).insertedId.toString();

        if (form.get("addTeam") === "on" && form.get("teamName")) {
            const team: Team = TeamSchema.parse({
                name: form.get('teamName')?.toString(),
                lowerName: form.get('teamName')?.toString().toLowerCase(),
                owner: swimmerId
            });

            teamId = (await teamsCollection.insertOne(team)).insertedId.toString();

            await swimmersCollection.updateOne({ _id: new ObjectId(swimmerId) }, {
                $set: {
                    teamId: teamId
                }
            })
        }

        try {
            await mail(swimmer.email, textForRegMail(`${BASE_PATH}/anmelden/${swimmerId}/${hash(swimmerId)}`));
            console.log(`Mail send to ${swimmer.email}`)
        } catch (e) {
            console.error(`Error on sending mail to ${swimmer.email}`)
        }
    } catch (e) {
        try { await swimmersCollection.deleteOne({ _id: new ObjectId(swimmerId) }); } catch (e) { }
        try { await teamsCollection.deleteOne({ _id: new ObjectId(teamId) }) } catch (e) { }
        return { checkInput: true }
    }
    const newPath = `/anmelden/${swimmerId}/${hash(swimmerId)}`
    revalidatePath(newPath);
    redirect(newPath);
}