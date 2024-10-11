"use client"

import ButtonLink from "@/components/basic/buttonLink"
import { useState } from "react"

export default function PrintTool() {
    const [title, setTitle] = useState<string>("")
    const [name, setName] = useState<string>("")

    return <div>
        <div className="pb-4">
            <label className="block text-sm font-medium">
                Titel der Urkunde
                <input
                    type="text"
                    value={title}
                    className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                    onChange={(evnt) => setTitle(evnt.target.value)}
                />
            </label>
        </div>
        <div className="pb-4">
            <label className="block text-sm font-medium">
                Name des Empfängers
                <input
                    type="text"
                    value={name}
                    className="block w-full p-2 text-black border border-dlrg-black rounded-lg bg-dlrg-black-200 text-sm focus:ring-dlrg-blue focus:border-dlrg-blue"
                    onChange={(evnt) => setName(evnt.target.value)}
                />
            </label>
        </div>
        <ButtonLink href={`/print/${encodeURIComponent(title)}/${encodeURIComponent(name)}`}>Urkunde erzeugen</ButtonLink>
    </div>
}