"use client"

import Button from "@/components/basic/button";
import Swimmer from "@/lib/model/Swimmer.interface"
import { useState } from "react"
import logAction from "./log.action";

interface LogEntryFormProps {
    swimmer: Swimmer,
    onLog: (entryNr: number, laps: number) => void
}

export default function LogEntryForm({ swimmer, onLog }: LogEntryFormProps) {
    const [laps, setLaps] = useState<number>(0);

    async function log() {
        onLog(await logAction(swimmer._id?.toString() || "", laps), laps);
    }

    return <div>
        <div className="pb-4">
            <label className="block text-sm font-medium">
                <b>Bahnen für:</b> {swimmer.lastName}, {swimmer.firstName} ({swimmer.regNr}) ({swimmer.capColor} - {swimmer.capNr})
                <input className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue" type="number" pattern="\d*" onChange={evnt => setLaps(parseInt(evnt.target.value))} value={laps || ""} />
            </label>
        </div>
        <div>
            <Button onClick={log}>Bahnen erfassen</Button>
        </div>
    </div>
}