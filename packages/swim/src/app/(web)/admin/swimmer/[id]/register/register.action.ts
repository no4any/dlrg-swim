"use server"

import "server-only";

import RegisterActionState from "./RegisterActionstate.interface";
import RegistrationData, { RegistrationDataSchema } from "./RegistrationData.interface";
import { redirect } from "next/navigation";
import getSwimmersCollection from "@/lib/mongo/getSwimmersCollection";
import { ObjectId } from "mongodb";
import getSession from "@/lib/auth/getSession";
import findByCap from "../../../log/findByCap.action";
import findByReg from "../../../log/findByReg.action";

function formToRegistrationData(form: FormData): RegistrationData {
    return RegistrationDataSchema.parse({
        regNr: parseInt(form.get("regNr")?.toString() || "0"),
        capColor: form.get("capColor")?.toString(),
        capNr: parseInt(form.get("capNr")?.toString() || "0"),
        breakfast: form.get("breakfast") === 'on',
        distanceRating: form.get("distanceRating") === 'on',
        publishName: form.get("publishName") === 'on',
        newsletter: form.get("newsletter") === 'on'
    })
}

export default async function registerAction(_prevState: RegisterActionState, form: FormData): Promise<RegisterActionState> {
    const { mail } = await getSession();

    if(mail === null) {
        redirect('/login');
    }

    const id = form.get('id')?.toString() || "";

    if (id.length === 0) {
        return { error: true }
    }

    try {
        const data = formToRegistrationData(form);

        if(await findByCap(data.capColor, data.capNr)) {
            return {
                capInUse: true
            }
        }

        if(await findByReg(data.regNr)) {
            return {
                regNrInUse: true
            }
        }

        console.log(data)
        const swimmerCollection = await getSwimmersCollection();
        await swimmerCollection.updateOne({ _id: new ObjectId(id) }, {
            $set: {
                regNr: data.regNr,
                capNr: data.capNr,
                capColor: data.capColor,
                breakfast: data.breakfast,
                distanceRating: data.distanceRating,
                publishName: data.publishName,
                newsletter: data.newsletter,
                status: "REGISTERED"
            }
        })
    } catch (e) {
        console.error(e);
        return { error: true }
    }

    redirect(`/admin/swimmer/${id}`);
}