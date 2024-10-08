"use client"

import ButtonSubmit from "@/components/input/ButtonSubmit.component"
import InputNum from "@/components/input/InputNum.component"
import { useState } from "react"
import { useFormState } from "react-dom";
import changeDistanceEntryFormAction, { ChangeDistanceEntryState } from "./changeDistanceEntryForm.action";

export default function ChangeDistanceEntryForm({ id, laps, night }: { id: string, laps: number, night?: boolean }) {
    const [lapsState, setLapsState] = useState<number>(laps);
    const [nightState, setNightState] = useState<"D" | "N">(night?"N":"D")
    const [state, formAction] = useFormState<ChangeDistanceEntryState, FormData>(changeDistanceEntryFormAction, {})

    return <div>
        {state.error ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Beim Speichern in die Datenbank. Evtl. ungültiger Wert.</div> : <></>}
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <div className="pb-4">
                <label className="block text-sm font-medium">
                    Bahnen
                    <input
                        type="number"
                        name="laps"
                        className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                        value={lapsState}
                        onChange={(evnt) => setLapsState(parseInt(evnt.target.value))}
                        pattern="\d*"
                    />
                </label>
            </div>
            <div className="pb-4">
                <select name="night" value={nightState} onChange={evnt => setNightState(evnt.target.value as "D" | "N")} className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue">
                    <option value={"D"}>Regulär</option>
                    <option value={"N"}>Nachtpokal</option>
                </select>
            </div>
            <div>
                <ButtonSubmit>Ändern</ButtonSubmit>
            </div>
        </form>
    </div>
}