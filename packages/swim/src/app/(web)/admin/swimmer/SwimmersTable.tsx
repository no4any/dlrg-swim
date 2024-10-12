"use client"

import Swimmer from "@/lib/model/Swimmer.interface";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SwimmersTable({ swimmers }: { swimmers: Swimmer[] }) {
    const [localSwimmers, setLocalSwimmers] = useState<Swimmer[]>(swimmers.sort((a, b) => a.lastName.trim() > b.lastName.trim() ? 1 : -1));
    const [searchString, setSearchString] = useState<string>("");
    const [searchStatus, setSearchStatus] = useState<"ANNOUNCED" | "REGISTERED" | "FINISHED" | "NONE">("NONE");

    useEffect(() => {
        setLocalSwimmers(swimmers
            .filter(swimmer => {
                if (searchStatus === "NONE") {
                    return true;
                }
                return swimmer.status === searchStatus;
            })
            .filter(swimmer => {
                const query = searchString.toLowerCase();
                return swimmer.firstName.toLowerCase().includes(query) ||
                    swimmer.lastName.toLocaleLowerCase().includes(query) ||
                    swimmer.email.toLocaleLowerCase().includes(query) ||
                    `${swimmer.regNr}`.includes(query) ||
                    `${swimmer.capNr}`.includes(query) ||
                    !!swimmer.capColor?.includes(query) ||
                    `${swimmer.capColor}-${swimmer.capNr}`.toLowerCase().includes(query)
            })
        )
    }, [searchString, searchStatus, swimmers])

    return <div>
        <div className="grid grid-cols-7">
            <div className="col-span-4 px-2">
                <input
                    type="text"
                    placeholder="Freie Suche"
                    className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                    value={searchString}
                    onChange={evnt => setSearchString(evnt.target.value)}
                />
            </div>
            <div className="col-span-3">
                <select
                    value={searchStatus}
                    onChange={evnt => setSearchStatus(evnt.target.value as "ANNOUNCED" | "REGISTERED" | "FINISHED" | "NONE")}
                    className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                >
                    <option value="NONE">---</option>
                    <option value="ANNOUNCED">ANNOUNCED</option>
                    <option value="REGISTERED">REGISTERED</option>
                    <option value="FINISHED">FINISHED</option>
                </select>
            </div>
        </div>
        <div className="grid grid-cols-7 hover:bg-dlrg-red-100 rounded-lg">
            <div className="p-1"><b>Name</b></div>
            <div className="p-1 col-span-3"><b>E-Mail</b></div>
            <div className="p-1"><b>Status</b></div>
            <div className="p-1"><b>Badekappe</b></div>
            <div className="p-1"><b>Bändchen</b></div>
        </div>
        {localSwimmers.map((swimmer) => <SwimmerRow key={swimmer._id?.toString() || ""} swimmer={swimmer} />)}
    </div>
}

function SwimmerRow({ swimmer }: { swimmer: Swimmer }) {
    return <Link href={`/admin/swimmer/${swimmer._id?.toString() || "undefined"}`}>
        <div className="grid grid-cols-7 hover:bg-dlrg-red-100 rounded-lg">
            <div className="p-1"><Link href={`/admin/swimmer/${swimmer._id?.toString()}` || ""}>{swimmer.lastName}, {swimmer.firstName}</Link></div>
            <div className="p-1 col-span-3">{swimmer.email}</div>
            <div className="p-1">{swimmer.status}</div>
            <div className="p-1">{swimmer.capColor ? <>{swimmer.capColor} - {swimmer.capNr}</> : <></>}</div>
            <div className="p-1">{swimmer.regNr}</div>
        </div>
    </Link>
}