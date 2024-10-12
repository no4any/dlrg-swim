"use client"

import { useState } from "react"
import { RegFormProps } from "./RegForm"
import Button from "@/components/basic/button";
import findByCap from "./findByCap.action";

export default function CapForm({ onSwimmer }: RegFormProps) {
    const [capColor, setCapColor] = useState("R")
    const [capNr, setCapNr] = useState(0);

    async function searchByReg() {
        onSwimmer(await findByCap(capColor, capNr));
    }

    return <div>
        <div className="pb-4">
            <label className="block text-sm font-medium">
                Farbe der Badekappe
                <select name="capColor" value={capColor} onChange={evnt => setCapColor(evnt.target.value)} className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue">
                    <option value="W">Weiß</option>
                    <option value="Y">Gelb</option>
                    <option value="G">Grün</option>
                    <option value="B">Blau</option>
                    <option value="O">Orange</option>
                </select>
            </label>
        </div>
        <div className="pb-4">
            <input className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue" type="number" pattern="\d*" onChange={evnt => setCapNr(parseInt(evnt.target.value))} value={capNr} />
        </div>
        <div>
            <Button onClick={searchByReg}>Suchen</Button>
        </div>
    </div>
}