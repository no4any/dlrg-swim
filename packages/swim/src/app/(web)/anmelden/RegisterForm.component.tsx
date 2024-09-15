"use client"

import InputCheckbox from "@/components/input/InputCheckbox.component"
import InputDate from "@/components/input/InputDate.component"
import InputText from "@/components/input/InputText.component"
import ButtonSubmit from "../../../components/input/ButtonSubmit.component"
import registerAction from "./register.action"
import { useFormState } from "react-dom"
import { z } from "zod"
import { useState } from "react"

export interface RegisterFormState {
    checkInput?: boolean,
    mailAlreadyInUse?: boolean,
    problemWithTeamName?: boolean
}

function textCondition(value: string): boolean {
    try {
        z.string().min(2).parse(value)
        return true;
    } catch (e) { }
    return false;
}
const TEXT_CONDITION_MESSAGE = "Muss mindestens 2 Zeichen lang sein"

function mailCondition(value: string): boolean {
    try {
        z.string().email().parse(value)
        return true;
    } catch (e) { }
    return false;
}
const MAIL_CONDITION_MESSAGE = "Scheint keine ordentliche E-Mail-Adresse zu sein";

export default function RegisterForm() {
    const [state, formAction] = useFormState<RegisterFormState, FormData>(registerAction, {})
    const [addTeam, setAddTeam] = useState(false);

    return <form action={formAction}>
        {state.mailAlreadyInUse ? <div>Mit der E-Mail wurde brereits eine Anmeldung vollzogen</div> : undefined}
        {state.problemWithTeamName ? <div>Es besteht ein Problem mit dem Teamnamen. Dieser ist möglicherweise bereits vergeben</div> : undefined}
        <div className="grid lg:grid-cols-2 gap-4 mb-4">
            <InputText name="name" title="Name" validate={state.checkInput} conditionMessage={TEXT_CONDITION_MESSAGE} condition={textCondition} />
            <InputText name="prename" title="Vorname" validate={state.checkInput} conditionMessage={TEXT_CONDITION_MESSAGE} condition={textCondition} />
            <InputText name="email" title="E-Mail" validate={state.checkInput} conditionMessage={MAIL_CONDITION_MESSAGE} condition={mailCondition} />
            <InputDate name="birthday" title="Geburtstag (optional)" />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
            <InputText name="city" title="Stadt (optional)" />

        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
                <input id="addTeam" name="addTeam" type="checkbox" checked={addTeam} onChange={(evnt) => setAddTeam(evnt.target.checked)} className="mr-2 accent-dlrg-blue" />
                <label htmlFor={"addTeam"} className="w-full h-4 border-gray-300 rounded select-none">Ich möchte mit dieser Anmeldung ein neues Team anlegen (Sie erhalten im Nachgang einen Link mit dem sich weitere Teammitglieder anmelden können)</label>
            </div>
            {addTeam ? <InputText name="teamName" title="Name des Teams (optional)" /> : undefined}
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
            <InputCheckbox name="breakfast" title="Möchten Sie Frühstück" />
            <InputCheckbox name="distanceRating" title="Möchten Sie an der Distanzwertung teilnehmen" />
            <InputCheckbox name="publishName" title="Ich bin damit einverstanden, dass mein Name mit meinen Leistungen veröffentlicht wird" />
        </div>
        <div className="grid grid-cols-1 gap-4">
            <div>
                <ButtonSubmit>Anmelden</ButtonSubmit>
            </div>
        </div>
    </form>
}