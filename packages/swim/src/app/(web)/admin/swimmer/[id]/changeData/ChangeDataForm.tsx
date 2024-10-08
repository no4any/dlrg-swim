"use client"

import Swimmer from "@/lib/model/Swimmer.interface";
import { useFormState } from "react-dom";
import changeDataAction, { ChangeDataActionState } from "./changeData.action";
import ButtonSubmit from "@/components/input/ButtonSubmit.component";
import { useState } from "react";

export default function ChangeDataForm({ swimmer }: { swimmer: Swimmer }) {
    const [state, formAction] = useFormState<ChangeDataActionState, FormData>(changeDataAction, {});

    const [name, setName] = useState(swimmer.lastName);
    const [firstname, setFirstname] = useState(swimmer.firstName);
    const [email, setEmail] = useState(swimmer.email);
    const [birthday, setBirthday] = useState(swimmer.birthday);
    const [city, setCity] = useState(swimmer.city || "")
    const [gender, setGender] = useState(swimmer.gender);

    const [breakfast, setBreakfast] = useState(swimmer.breakfast);
    const [distanceRating, setDistanceRating] = useState(swimmer.distanceRating);
    const [publishName, setPublishName] = useState(swimmer.publishName);
    const [newsletter, setNewsletter] = useState(swimmer.newsletter);

    return <form action={formAction}>
        <input type="hidden" name="id" value={swimmer._id?.toString() || "undefined"} />
        <div className="grid lg:grid-cols-2 gap-4 mb-4">
            <div>
                <label className="block text-sm font-medium">
                    Name
                    <input
                        type="text"
                        name={'name'}
                        className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                        onChange={(evnt) => setName(evnt.target.value)}
                        value={name}
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium">
                    Vorname
                    <input
                        type="text"
                        name={'prename'}
                        className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                        onChange={(evnt) => setFirstname(evnt.target.value)}
                        value={firstname}
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium">
                    E-Mail
                    <input
                        type="text"
                        name={'email'}
                        className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                        onChange={(evnt) => setEmail(evnt.target.value)}
                        value={email}
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium">
                    Geburtstag
                    <input
                        type="date"
                        name={'birthday'}
                        className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                        onChange={(evnt) => setBirthday(evnt.target.value)}
                        value={birthday || ""}
                    />
                </label>
            </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 mb-4">
            <div>
                <label className="block text-sm font-medium">
                    Stadt
                    <input
                        type="text"
                        name={'city'}
                        className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                        onChange={(evnt) => setCity(evnt.target.value)}
                        value={city}
                    />
                </label>
            </div>
            <div>
                <label className="block text-sm font-medium">
                    Geschlecht
                    <select name="gender" value={gender || "0"} onChange={evnt => setGender(evnt.target.value as "0" | "M" | "W")} className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue">
                        <option value="0">Keine Angabe</option>
                        <option value="W">Weiblich</option>
                        <option value="M">Männlich</option>
                    </select>
                </label>
            </div>
        </div>
        <div>
            <div>
                <input id="breakfast" type="checkbox" name="breakfast" className="mr-2 accent-dlrg-blue" checked={breakfast || false} onChange={evnt => setBreakfast(evnt.target.checked)} />
                <label htmlFor="breakfast" className="w-full h-4 border-gray-300 rounded select-none">Frühstück</label>
            </div>
            <div>
                <input id="distanceRating" type="checkbox" name="distanceRating" className="mr-2 accent-dlrg-blue" checked={distanceRating || false} onChange={evnt => setDistanceRating(evnt.target.checked)} />
                <label htmlFor="distanceRating" className="w-full h-4 border-gray-300 rounded select-none">An Distanzwertung teilnehmen</label>
            </div>
            <div>
                <input id="publishName" type="checkbox" name="publishName" className="mr-2 accent-dlrg-blue" checked={publishName || false} onChange={evnt => setPublishName(evnt.target.checked)} />
                <label htmlFor="publishName" className="w-full h-4 border-gray-300 rounded select-none">Namen mit Ergebnissen veröffentlichen</label>
            </div>
            <div>
                <input id="newsletter" type="checkbox" name="newsletter" className="mr-2 accent-dlrg-blue" checked={newsletter || false} onChange={evnt => setNewsletter(evnt.target.checked)} />
                <label htmlFor="newsletter" className="w-full h-4 border-gray-300 rounded select-none">Über zukünftige Ereignisse informieren</label>
            </div>
        </div>
        <ButtonSubmit>Ändern</ButtonSubmit>
    </form>
}