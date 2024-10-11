"use client"

import ButtonSubmit from "@/components/input/ButtonSubmit.component";
import Team from "@/lib/model/Team.interface";
import { useState } from "react";
import { useFormState } from "react-dom";
import changeTeamAction from "./changeTeam.action";

export interface ChangeTeamFormState {
    nameError?: boolean,
    noChange?: boolean,
    wrongTypeError?: boolean
}

export default function ChangeTeamForm({ team }: { team: Team }) {
    const [name, setName] = useState<string>(team.name)
    const [type, setType] = useState(team.type);

    const [state, formAction] = useFormState<ChangeTeamFormState, FormData>(changeTeamAction, {})

    return <form action={formAction}>
        {state.nameError ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Teamname nicht zulässig (wahrscheinlich zu kurz)</div> : <></>}
        {state.noChange ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Es wurde keine Änderung vorgenommen</div> : <></>}
        <input name="id" type="hidden" value={team._id?.toString() || ""} />
        <label className="block text-sm font-medium">
            Teamname
            <input
                type="text"
                name="name"
                className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                value={name}
                onChange={(evnt) => setName(evnt.target.value)}
            />
        </label>
        <label className="block text-sm font-medium">
            Art des Teams
            <select name="type" value={type} onChange={evnt => setType(evnt.target.value as "S" | "F" | "V")} className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue">
                <option value="S">Sonstige</option>
                <option value="F">Firma</option>
                <option value="V">Verein</option>
            </select>
        </label>
        <div className="pt-4">
            <ButtonSubmit>Ändern</ButtonSubmit>
        </div>
    </form>
}