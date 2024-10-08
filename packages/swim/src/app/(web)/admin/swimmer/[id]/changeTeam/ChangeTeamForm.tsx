"use client"

import ButtonSubmit from "@/components/input/ButtonSubmit.component";
import Team from "@/lib/model/Team.interface";
import { useState } from "react";
import { useFormState } from "react-dom";
import { ChangeDistanceEntryState } from "../../../laps/[id]/changeDistanceEntryForm.action";
import changeTeamAction from "./changeTeam.action";

export default function ChangeTeamForm({ id, teams, currentTeamId }: { id: string, teams: Team[], currentTeamId?: string }) {
    const [selectedId, setSelectedId] = useState<string>(currentTeamId || "NONE");
    const [state, formAction] = useFormState<ChangeDistanceEntryState, FormData>(changeTeamAction, {})

    return <form action={formAction}>
        {state.error ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Es ist ein unbekannter Fehler aufgetreten</div> : <></>}
        <input type="hidden" value={id} name="id" />
        <div className="pb-4">
            <select name="team" value={selectedId} onChange={evnt => setSelectedId(evnt.target.value)} className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue">
                <option value="NONE">Kein Team</option>
                {teams.sort((a, b) => a.name > b.name ? 1 : -1).map(team => <option key={team._id?.toString() || undefined} value={team._id?.toString() || undefined}>{team.name}</option>)}
            </select>
        </div>
        <ButtonSubmit>Ändern</ButtonSubmit>
    </form>
}