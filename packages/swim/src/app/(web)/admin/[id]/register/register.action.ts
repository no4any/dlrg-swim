"use server"

import Swimmer from "@/lib/model/Swimmer.interface";
import updateSwimmer from "@/lib/mongo/operations/updateSwimmer";
import { redirect } from "next/navigation";

export default async function RegisterSwimmer(id: string, swimmer: Swimmer) {
    await updateSwimmer(id, swimmer);
    redirect("/admin");
}