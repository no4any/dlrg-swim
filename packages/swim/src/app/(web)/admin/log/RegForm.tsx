"use client"

import Button from "@/components/basic/button";
import Swimmer from "@/lib/model/Swimmer.interface";
import { useState } from "react"
import findByReg from "./findByReg.action";

export interface RegFormProps {
    onSwimmer: (swimmer: Swimmer | null) => void
}

export default function RegForm({ onSwimmer }: RegFormProps) {
    const [regNr, setRegNr] = useState(0);

    async function searchByReg(reg: number) {
        onSwimmer(await findByReg(reg))
    }

    return <div>
        <div className="pb-4">
            <input className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue" type="number" pattern="\d*" onChange={evnt => setRegNr(parseInt(evnt.target.value))} value={regNr} />
        </div>
        <div>
            <Button onClick={()=>searchByReg(regNr)}>Suchen</Button>
        </div>
    </div>
}