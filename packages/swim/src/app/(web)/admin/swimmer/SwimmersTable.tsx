"use client"

import Swimmer from "@/lib/model/Swimmer.interface";
import Link from "next/link";
import { useState } from "react";
import getSwimmersAction from "./getSwimmers.action";
import deleteSwimmerAction from "./deleteSwimmer.action";

export default function SwimmersTable({ swimmers }: { swimmers: Swimmer[] }) {
    const [localSwimmers, setLocalSwimmers] = useState<Swimmer[]>(swimmers);

    async function reload() {
        setLocalSwimmers(await getSwimmersAction());
    }

    async function onDelete(id: string) {
        await deleteSwimmerAction(id);
        await reload();
    }

    return <div>
        {localSwimmers.map((swimmer) => <SwimmerRow key={swimmer._id?.toString() || ""} swimmer={swimmer} onDelete={onDelete} />)}
    </div>
}

function SwimmerRow({ swimmer, onDelete }: { swimmer: Swimmer, onDelete: (id: string) => void }) {
    return <div className="grid grid-cols-8">
        <div className="p-1"><Link href={`/admin/swimmer/${swimmer._id?.toString()}` || ""}>{swimmer.lastName}, {swimmer.firstName}</Link></div>
        <div className="p-1 col-span-3">{swimmer.email}</div>
        <div className="p-1">{swimmer.status}</div>
        <div className="p-1">{swimmer.capColor}</div>
        <div className="p-1">{swimmer.capNr}</div>
        <div className="p-1 text-right">
            <button onClick={()=>{
                if(confirm(`${swimmer.lastName}, ${swimmer.firstName} (${swimmer.email}) wirklich löschen?`)) {
                    onDelete(swimmer._id?.toString() || "")
                }
            }}>Löschen</button>
        </div>
    </div>
}