"use client"

import ButtonLink from "@/components/basic/buttonLink";
import { H2 } from "@/components/basic/h";
import DistanceEntry from "@/lib/model/DistanceEntry.interface"
import Swimmer from "@/lib/model/Swimmer.interface"
import Link from "next/link";
import deleteSwimmerAction from "./deleteSimmer.action";
import { Medal } from "@/lib/medal/youthMedal";
import closeForMedalAction from "./closeForMedal.action";
import reactivateSwimmerAction from "./reactivateSwimmer.Action";
import getTeam from "@/lib/mongo/operations/getTeam";

function getAge(dob: Date): number {
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function birthdayToReadable(date: string): string {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`
}

export default function SwimmerOverview({ swimmer, distances }: { swimmer: Swimmer & { teamName?: string, medal: Medal, hash: string }, distances: DistanceEntry[] }) {
    const distanceAll = distances
        .reduce((acc, distance) => distance.laps + acc, 0);
    const distanceNight = distances
        .filter(distance => distance.nightCup === true)
        .reduce((acc, distance) => distance.laps + acc, 0);

    return <div>
        <div className="pb-4">
            <span className="pr-4">
                <ButtonLink href={`/anmelden/${swimmer._id?.toString()}/${swimmer.hash}`}>Seite des Users</ButtonLink>
            </span>
            {swimmer.status === "ANNOUNCED" ? <span className="pr-4">
                <ButtonLink href={`/admin/swimmer/${swimmer._id?.toString()}/register`}>Registrieren</ButtonLink>
            </span> : <></>}
            <span className="pr-4">
                <ButtonLink href={`/admin/swimmer/${swimmer._id?.toString() || "undefined"}/changeTeam`}>Team ändern</ButtonLink>
            </span>
            <span className="pr-4">
                <ButtonLink href={`/admin/swimmer/${swimmer._id?.toString() || "undefined"}/changeData`}>Daten ändern</ButtonLink>
            </span>
            {swimmer.status === "REGISTERED" ? <span className="pr-4">
                <ButtonLink href={`/admin/swimmer/${swimmer._id?.toString()}/changeRegData`}>Registrierung ändern</ButtonLink>
            </span> : <></>}
            {swimmer.medal && swimmer.status !== "FINISHED" ? <span className="pr-4">
                <button
                    className="bg-dlrg-blue text-dlrg-black-100 disabled:text-dlrg-black-900 disbaled:hover:text-dlrg-black-600 hover:bg-dlrg-blue-900 rounded p-2 font-bold"
                    onClick={async () => {
                        if (confirm("Wirklich schließen und Medallie abholen?")) {
                            await closeForMedalAction(swimmer._id?.toString() || "");
                        }
                    }}>{swimmer.medal} Medaille und Urkunde abholen</button>
            </span> : <></>}
            {swimmer.medal && swimmer.status === "FINISHED" ? <span className="pr-4">
                <ButtonLink href={`/anmelden/${swimmer._id?.toString()}/${swimmer.hash}/cert`}>Urkunde</ButtonLink>
            </span> : <></>}
            {swimmer.status === "FINISHED" ? <span className="pr-4">
                <button
                    className="bg-dlrg-blue text-dlrg-black-100 disabled:text-dlrg-black-900 disbaled:hover:text-dlrg-black-600 hover:bg-dlrg-blue-900 rounded p-2 font-bold"
                    onClick={async () => {
                        if (confirm("Wirklich wieder aktivieren?")) {
                            await reactivateSwimmerAction(swimmer._id?.toString() || "");
                        }
                    }}>Reaktivieren</button>
            </span> : <></>}
            {swimmer.status === "ANNOUNCED" ? <span className="pr-4">
                <button
                    className="bg-dlrg-blue text-dlrg-black-100 disabled:text-dlrg-black-900 disbaled:hover:text-dlrg-black-600 hover:bg-dlrg-blue-900 rounded p-2 font-bold"
                    onClick={async () => {
                        if (confirm("Wirklich löschen?")) {
                            await deleteSwimmerAction(swimmer._id?.toString() || "");
                        }
                    }}>Löschen</button>
            </span> : <></>}
        </div>
        <div className="grid lg:grid-cols-2 mt-4">
            <div><H2>Name</H2><span>{swimmer.lastName}, {swimmer.firstName}</span></div>
            <div><H2>Geschlecht</H2><span>{!swimmer.gender || swimmer.gender === "0" ? "Keine Angabe" : (swimmer.gender === "W" ? "Weiblich" : "Männlich")}</span></div>
            <div><H2>E-Mail</H2><span>{swimmer.email}</span></div>
            <div><H2>Herkunft</H2><span>{swimmer.city?.trim() || <b><i>Keine Angabe</i></b>}</span></div>
            <div><H2>Geburtdatum</H2><span>{swimmer.birthday ? birthdayToReadable(swimmer.birthday) : <b><i>Keine Angabe</i></b>}</span></div>
            <div><H2>Alter</H2><span>{swimmer.birthday ? getAge(new Date(swimmer.birthday)) : <b><i>Keine Angabe</i></b>}</span></div>
            {swimmer.status === "ANNOUNCED" ? <>
                <div><H2>Bandnummer</H2><span>{swimmer.regNr}</span></div>
                <div><H2>Bandekappe</H2><span>{swimmer.capColor} - {swimmer.capNr}</span></div>
            </> : <></>}
            <div><H2>Team</H2><span>{swimmer.teamName ? <Link href={`/admin/teams/${swimmer.teamId}`}>{swimmer.teamName}</Link> : <b><i>Kein Team</i></b>}</span></div>
            <div><H2>Frühstück</H2><span>{swimmer.breakfast ? "Ja" : "Nein"}</span></div>
        </div>

        <div>
            <H2>Bahnen gesamt: {distanceAll}</H2>
            <H2>Bahnen Nachtpokal: {distanceNight}</H2>
            <div>
                <div className="grid grid-cols-3">
                    <div className="p-1"><b>Laufende Nummer</b></div>
                    <div className="p-1"><b>Bahnen</b></div>
                    <div className="p-1"><b>Nachtpokal</b></div>
                </div>
                {distances.map(distance => <Link key={distance._id?.toString() || "key"} href={`/admin/laps/${distance._id?.toString() || "undefined"}`}>
                    <div className="grid grid-cols-3 hover:bg-dlrg-red-100 rounded-lg">
                        <div className="p-1">{distance.nr}</div>
                        <div className="p-1">{distance.laps}</div>
                        <div className="p-1">{distance.nightCup ? "Nachtpokal" : ""}</div>
                    </div>
                </Link>)}
            </div>
        </div>
    </div>
}