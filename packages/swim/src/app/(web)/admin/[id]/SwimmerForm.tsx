"use client"

import Swimmer from "@/lib/model/Swimmer.interface";
import deleteAction from "./delete.action";
import DistanceForm from "./DistanceForm";
import DistanceEntry from "@/lib/model/DistanceEntry.interface";

export interface SwimmerFormParams {
    swimmer: Swimmer,
    distances: DistanceEntry[]
}

export default function SwimmerForm({ swimmer, distances }: SwimmerFormParams) {
    return <div>
        <div>Vorname: {swimmer.firstName}</div>
        <div>Nachname: {swimmer.lastName}</div>
        <div>Geburtstag: {swimmer.birthday}</div>
        <button onClick={() => deleteAction(swimmer._id as string)}>Loeschen</button>
        {distances.map((distance)=><div key={distance.nr}>
            {new Date(distance.createdAt).toISOString()} {distance.laps} {distance.registerer}
        </div>)}
        <DistanceForm swimmerId={swimmer._id?.toString() || ""}/>
    </div>
}