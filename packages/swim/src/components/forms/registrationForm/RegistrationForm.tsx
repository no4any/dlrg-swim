"use client"

import InputCheckbox from "@/components/input/InputCheckbox.component"
import InputDate from "@/components/input/InputDate.component"
import InputText from "@/components/input/InputText.component"
import ButtonSubmit from "../../../components/input/ButtonSubmit.component"
import { useFormState } from "react-dom"
import { useState } from "react"
import RegisterFormState from "./RegisterFormState.interface"
import registerAction from "./register.action"
import textCondition from "./conditions/textCondition"
import mailCondition from "./conditions/mailCondition"
import cityCondition from "./conditions/cityCondition"

const TEXT_CONDITION_MESSAGE = "Muss mindestens 2 Zeichen lang sein"
const MAIL_CONDITION_MESSAGE = "Scheint keine ordentliche E-Mail-Adresse zu sein";

export interface RegisterFormProps {
    team?: {
        id: string,
        hash: string
    }
}

export default function RegisterForm(props: RegisterFormProps) {
    const [state, formAction] = useFormState<RegisterFormState, FormData>(registerAction, {})
    const [addTeam, setAddTeam] = useState(false);

    return <form action={formAction}>
        {state.mailAlreadyInUse ? <div className="block bg-dlrg-yellow rounded p-1 my-2">Mit der E-Mail wurde brereits eine Anmeldung vollzogen</div> : undefined}
        {state.problemWithTeamName ? <div className="block bg-dlrg-yellow rounded p-1 my-2">Es besteht ein Problem mit dem Teamnamen. Dieser ist möglicherweise bereits vergeben</div> : undefined}
        {state.hashMatchError ? <div className="block bg-dlrg-yellow rounded p-1 my-2">Sie sind nicht autorisiert sich dieses Team anzumelden.</div> : undefined}

        {props.team ? <>
            <input type="hidden" name="teamId" value={props.team?.id} />
            <input type="hidden" name="hash" value={props.team?.hash} />
        </> : undefined}
        <div className="grid lg:grid-cols-2 gap-4 mb-4">
            <InputText name="name" title="Name" validate={state.checkInput} conditionMessage={TEXT_CONDITION_MESSAGE} condition={textCondition} />
            <InputText name="prename" title="Vorname" validate={state.checkInput} conditionMessage={TEXT_CONDITION_MESSAGE} condition={textCondition} />
            <InputText name="email" title="E-Mail" validate={state.checkInput} conditionMessage={MAIL_CONDITION_MESSAGE} condition={mailCondition} />
            <InputDate name="birthday" title="Geburtstag (optional)" />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
            <InputText name="city" title="Stadt (optional)" validate={state.checkInput} />
        </div>
        {!props.team ? <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
                <input id="addTeam" name="addTeam" type="checkbox" checked={addTeam} onChange={(evnt) => setAddTeam(evnt.target.checked)} className="mr-2 accent-dlrg-blue" />
                <label htmlFor={"addTeam"} className="w-full h-4 border-gray-300 rounded select-none">Ich möchte mit dieser Anmeldung ein neues Team anlegen (Sie erhalten im Nachgang einen Link mit dem sich weitere Teammitglieder anmelden können)</label>
            </div>
            {addTeam ? <InputText name="teamName" title="Name des Teams (optional)" validate={state.checkInput} conditionMessage={TEXT_CONDITION_MESSAGE} condition={textCondition} /> : undefined}
        </div> : undefined}
        <div className="grid grid-cols-1 gap-4 mb-4">
            <InputCheckbox name="breakfast" title="Ich möchte Frühstück (6€ bei Anmeldung zusätzlich zu bezahlen)" />
            <InputCheckbox name="distanceRating" title="Ich möchte NICHT an der Distanzwertung  teilnehmen" />
            <InputCheckbox name="publishName" title="Ich bin damit einverstanden, dass mein Name mit meinen Leistungen veröffentlicht wird" />
            <InputCheckbox name="newsletter" title="Ich möchte über zukünftige Veranstaltungen per Mail informiert werden" />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
            <b>Die Startgebürt beträgt 7€ und ist bei der Anmeldung zu bezahlen. Zusätzlich ist ein Pfand von 5€ für die Badekappe zu bezahlen. Bitte zahlen Sie nach möglichkeit für das Pfand mit einem 5€ Schein.</b>
        </div>
        <div className="grid grid-cols-1 gap-4">
            <div>
                <ButtonSubmit>Unverbindlich Anmelden</ButtonSubmit>
            </div>
        </div>
    </form>
}