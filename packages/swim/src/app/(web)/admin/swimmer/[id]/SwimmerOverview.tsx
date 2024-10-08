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
        <dl>
            <dt>Name</dt>
            <dd>{swimmer.lastName}, {swimmer.firstName}</dd>

            {swimmer.gender ? <>
                <dt>Geschlecht</dt>
                <dd>{swimmer.gender}</dd>
            </> : <></>}

            <dt>E-Mail</dt>
            <dd>{swimmer.email}</dd>

            {swimmer.city ? <>
                <dt>Stadt</dt>
                <dd>{swimmer.city}</dd>
            </> : <></>}

            {swimmer.birthday ? <>
                <dt>Geburtstsg</dt>
                <dd>{birthdayToReadable(swimmer.birthday)}</dd>

                <dt>Alter</dt>
                <dd>{getAge(new Date(swimmer.birthday))}</dd>
            </> : <></>}

            {swimmer.status !== "ANNOUNCED" ? <>
                <dt>Bandnummer</dt>
                <dd>{swimmer.regNr}</dd>

                <dt>Badekappe</dt>
                <dd>{swimmer.capColor} - {swimmer.capNr}</dd>
            </> : <></>}

            {swimmer.teamName ? <>
                <dt>Team</dt>
                <dd>{swimmer.teamName}</dd>
            </> : <></>}
        </dl>
        <div>
            <H2>Gesamtestrecke geschwommen: {distanceAll}</H2>
            <H2>Im Nachpokal geschwommen: {distanceNight}</H2>
            <div>
                {distances.map(distance => <Link key={distance._id?.toString() || "key"} href={`/admin/laps/${distance._id?.toString() || "undefined"}`}>
                    <div className="grid grid-cols-3">
                        <div>{distance.nr}</div>
                        <div>{distance.laps}</div>
                        <div>{distance.nightCup ? "Nachpokal" : ""}</div>
                    </div>
                </Link>)}
            </div>
        </div>
    </div>
}