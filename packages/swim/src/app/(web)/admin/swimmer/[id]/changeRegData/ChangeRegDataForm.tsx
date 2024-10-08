"use client"

import { useFormState } from "react-dom";
import changeRegDataAction, { ChangeRegDataStatus } from "./changeRegData.action";
import { useState } from "react";
import Swimmer from "@/lib/model/Swimmer.interface";
import ButtonSubmit from "@/components/input/ButtonSubmit.component";

export default function ChangeRegDataForm({ swimmer }: { swimmer: Swimmer }) {
    const [state, formAction] = useFormState<ChangeRegDataStatus, FormData>(changeRegDataAction, {});

    const [regNr, setRegNr] = useState<number>(swimmer.regNr || 0);
    const [capNr, setCapNr] = useState<number>(swimmer.capNr || 0);
    const [capColor, setCapColor] = useState<string>(swimmer.capColor || "");

    return <form action={formAction}>
        {state.error ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Unbekannter fehler</div> : <></>}
        {state.capInUseError ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Die Badekappe wird bereits verwendet</div> : <></>}
        {state.regNrInUseError ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Die Registrierungsnummer wird bereits verwendet</div> : <></>}
        {state.capNrError ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Nummer der Badekappe verursacht ein Problem</div> : <></>}
        {state.regNrError ? <div className="block bg-dlrg-yellow rounded p-2 my-2"><b>Fehler: </b>Registrierungsnummer verursacht ein Problem</div> : <></>}
        <input name="id" type="hidden" value={swimmer._id?.toString()} />
        <div className="pb-4">
            <label className="block text-sm font-medium">
                Registriernummer
                <input
                    type="number"
                    name="regNr"
                    className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                    value={regNr}
                    onChange={(evnt) => setRegNr(parseInt(evnt.target.value))}
                    pattern="\d*"
                />
            </label>
        </div>
        <div className="pb-4">
            <label className="block text-sm font-medium">
                Farbe der Badekappe
                <select name="capColor" value={capColor} onChange={evnt => setCapColor(evnt.target.value)} className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue">
                    <option value="0">Auswahl</option>
                    <option value="R">Rot</option>
                    <option value="Y">Gelb</option>
                    <option value="G">Grün</option>
                    <option value="B">Blau</option>
                </select>
            </label>
        </div>
        <div className="pb-4">
            <label className="block text-sm font-medium">
                Kappennummer
                <input
                    type="number"
                    name="capNr"
                    className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                    value={capNr}
                    onChange={(evnt) => setCapNr(parseInt(evnt.target.value))}
                    pattern="\d*"
                />
            </label>
        </div>
        <ButtonSubmit>Registrierung ändern</ButtonSubmit>
    </form>
}