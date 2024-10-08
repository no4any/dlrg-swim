"use client"

import { useEffect, useState } from "react";
import Team from "@/lib/model/Team.interface";
import getTeamsAction from "./getTeams.action";
import Link from "next/link";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function TeamsTable({ teams }: { teams: Team[] }) {
    const [localTeams, setLocalTeams] = useState<Team[]>(teams);
    const [searchString, setSearchString] = useState<string>("");

    useEffect(() => {
        setLocalTeams(teams
            .filter(team => {
                const query = searchString.toLowerCase();
                return team.lowerName.toLowerCase().includes(query);
            })
        )
    }, [searchString, teams])

    return <div>
        <div className="col-span-4 px-2 pb-4">
            <input
                type="text"
                placeholder="Freie Suche"
                className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                value={searchString}
                onChange={evnt => setSearchString(evnt.target.value)}
            />
        </div>
        {localTeams.map((team) => <TeamLine key={team._id?.toString() || ""} team={team} />)}
    </div>
}

function TeamLine({ team }: { team: Team }) {
    return <Link href={`/admin/teams/${team._id?.toString() || ""}`}>
        <div className="grid grid-cols-1 hover:bg-dlrg-red-100 rounded-lg">
            <div className="p-1">{team.name}</div>
        </div>
    </Link >
}