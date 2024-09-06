"use client"

import { useState } from "react"
import addDistance from "./addDistance.action";

interface DistanceFormProps {
    swimmerId: string
}

export default function DistanceForm({ swimmerId }: DistanceFormProps) {
    const [count, setCount] = useState(0);
    const [addEntryId, setAddEntryId] = useState(0);
    return <div>
        <input type="number" value={count} onChange={(evnt) => setCount(parseInt(evnt.target.value))} />
        <button onClick={()=>addDistance({
            swimmerId: swimmerId,
            createdAt: new Date().getTime(),
            laps: count,
            nr: 0,
            registerer: "dummy"
        }).then(setAddEntryId)}>Senden {addEntryId}</button>
    </div>
}