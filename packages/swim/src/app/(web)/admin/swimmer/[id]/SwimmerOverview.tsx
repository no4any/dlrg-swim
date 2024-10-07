"use client"

import DistanceEntry from "@/lib/model/DistanceEntry.interface"
import Swimmer from "@/lib/model/Swimmer.interface"
import Link from "next/link";

function getAge(dob: Date): number {
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function birthdayToReadable(date: string): string {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`
}

export default function SwimmerOverview({ swimmer, distances }: { swimmer: Swimmer & { teamName?: string }, distances: DistanceEntry[] }) {
    return <div>
        <div>
            {swimmer.status === "ANNOUNCED" ? <Link href={`/admin/swimmer/${swimmer._id?.toString()}/register`}>Registrieren</Link> : <></>}
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
    </div>
}