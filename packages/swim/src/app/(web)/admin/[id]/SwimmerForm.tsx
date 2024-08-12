"use client"

import Swimmer from "@/lib/model/Swimmer.interface";
import deleteAction from "./delete.action";

export interface SwimmerFormParams {
    swimmer: Swimmer
}

export default function SwimmerForm({ swimmer }: SwimmerFormParams) {
    return <div>
        <div>Vorname: {swimmer.firstName}</div>
        <div>Nachname: {swimmer.lastName}</div>
        <div>Geburtstag: {swimmer.birthday}</div>
        <button onClick={() => deleteAction(swimmer._id as string)}>Loeschen</button>
    </div>
}