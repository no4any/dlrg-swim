"use client"

import { H2 } from "@/components/basic/h";
import ButtonSubmit from "@/components/input/ButtonSubmit.component";
import InputCheckbox from "@/components/input/InputCheckbox.component";
import InputNum from "@/components/input/InputNum.component";
import Swimmer from "@/lib/model/Swimmer.interface";
import { useFormState } from "react-dom";
import RegisterActionState from "./RegisterActionstate.interface";
import registerAction from "./register.action";

export default function RegisterForm({ swimmer }: { swimmer: Swimmer }) {
    const [state, formAction] = useFormState<RegisterActionState, FormData>(registerAction, {})

    return <div>
        {state.error ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Eingabe bitte prüfen</div> : <></>}
        {state.capInUse ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Badekappe bereits vergeben</div> : <></>}
        {state.regNrInUse ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Bändchennummer bereits vergeben</div> : <></>}
        <H2>Name</H2>
        <div>{swimmer.lastName}, {swimmer.firstName}</div>
        <H2>E-Mail</H2>
        <div>{swimmer.email}</div>
        <H2>Registrierung</H2>
        {swimmer.birthday ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>WARNUNG: </b>KEINE Teilnahme an Alterswertung</div> : <></>}
        {!swimmer.gender ||  swimmer.gender === "0"? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>WARNUNG: </b>Einzelwertung NICHT möglich - <b>KEIN Pokal oder Siegerehrung möglich!!!</b> (angabe Geschlecht fehlt)</div> : <></>}
        <form action={formAction}>
            <input name="id" type="hidden" value={swimmer._id?.toString() || ""} />
            <div className="pb-4">
                <InputNum name="regNr" title="Registriernummer" />
            </div>
            <div className="pb-4">
                <label className="block text-sm font-medium">
                    Farbe der Badekappe
                    <select name="capColor" className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue">
                        <option value="0">Auswahl</option>
                        <option value="W">Weiß</option>
                        <option value="Y">Gelb</option>
                        <option value="G">Grün</option>
                        <option value="B">Blau</option>
                        <option value="O">Orange</option>
                    </select>
                </label>
            </div>
            <div className="pb-4">
                <InputNum name="capNr" title="Nummer der Badekappe" />
            </div>
            <div className="pb-4">
                <InputCheckbox name="breakfast" title="Frühstück" checked={swimmer.breakfast} />
            </div>
            <div className="pb-4">
                <InputCheckbox name="distanceRating" title="Distanzwertung" checked={swimmer.distanceRating} />
            </div>
            <div className="pb-4">
                <InputCheckbox name="publishName" title="Namen veröffentlichen" checked={swimmer.publishName} />
            </div>
            <div className="pb-4">
                <InputCheckbox name="newsletter" title="Zukünftig informieren" checked={swimmer.newsletter} />
            </div>
            <div>
                <ButtonSubmit>Registrieren</ButtonSubmit>
            </div>
        </form>
    </div>
}