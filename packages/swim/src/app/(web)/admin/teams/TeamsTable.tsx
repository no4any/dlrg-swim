"use client"

import { useState } from "react";
import Team from "@/lib/model/Team.interface";
import getTeamsAction from "./getTeams.action";
import Link from "next/link";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function TeamsTable({ teams }: { teams: Team[] }) {
    const [localTeams, setLocalTeams] = useState<Team[]>(teams);

    async function reload() {
        setLocalTeams(await getTeamsAction())
    }

    return <div>
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