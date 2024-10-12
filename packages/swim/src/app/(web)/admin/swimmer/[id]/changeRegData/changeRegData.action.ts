"use server"

import "server-only"
import findByCap from "../../../log/findByCap.action";
import findByReg from "../../../log/findByReg.action";
import { redirect } from "next/navigation";
import getSwimmersCollection from "@/lib/mongo/getSwimmersCollection";
import { ObjectId } from "mongodb";
import getSession from "@/lib/auth/getSession";
import { revalidatePath } from "next/cache";

export interface ChangeRegDataStatus {
    error?: boolean,
    regNrError?: boolean,
    capNrError?: boolean,
    capInUseError?: boolean,
    regNrInUseError?: boolean
}

export default async function changeRegDataAction(_prevState: ChangeRegDataStatus, form: FormData): Promise<ChangeRegDataStatus> {
    const { mail } = await getSession();

    if (mail === null) {
        redirect('/login');
    }

    const id = form.get("id")?.toString() || "";

    const regNr = parseInt(form.get("regNr")?.toString() || "a");

    if (isNaN(regNr)) {
        return {
            regNrError: true
        }
    }

    const capNr = parseInt(form.get("capNr")?.toString() || "a")

    if (isNaN(capNr)) {
        return {
            capNrError: true
        }
    }

    const capColor = form.get("capColor")?.toString() || "0";

    if(!["W", "Y", "G", "B", "Z1", "Z2"].includes(capColor)) {
        return {
            error: true
        }
    }

    console.log(await findByCap(capColor, capNr));

    const foundCap = await findByCap(capColor, capNr);
    if(foundCap !== null) {
        if(foundCap._id?.toString() !== id) {
            return {
                capInUseError: true
            }
        }
    }
    
    const foundReg = await findByReg(regNr);
    if(foundReg !== null) {
        if(foundReg._id?.toString() !== id) {
            return {
                regNrInUseError: true
            }
        }
    }

    const collection = await getSwimmersCollection();

    await collection.updateOne({
        _id: new ObjectId(id)
    }, {
        $set: {
            capColor,
            capNr,
            regNr
        }
    })

    revalidatePath('/admin')
    redirect(`/admin/swimmer/${id}`);
}