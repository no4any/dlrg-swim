"use client";

import Swimmer from "@/lib/model/Swimmer.interface";
import { useState } from "react";
import RegisterSwimmer from "./register.action";

export interface RegisterFormProps {
    swimmer: Swimmer
}

export default function RegisterForm({ swimmer }: RegisterFormProps) {
    const [capColor, setCapColor] = useState<string | undefined>("r");
    const [capNr, setCapNr] = useState<number>(0);
    const [regNr, setRegNr] = useState<number>(0);

    function submit() {
        RegisterSwimmer(swimmer._id?.toString() || "", {
            ...swimmer,
            status: "REGISTERED",
            capNr,
            capColor,
            regNr
        })
    }

    return <div>
        <div>
            <select value={capColor} onChange={evnt => setCapColor(evnt.target.value)}>
                <option value={"r"}>Rot</option>
                <option value={"y"}>Gelb</option>
                <option value={"g"}>Grün</option>
                <option value={"b"}>Blau</option>
            </select>
        </div>
        <div>
            Kappennummer <input type="number" value={capNr} onChange={evnt => setCapNr(parseInt(evnt.target.value))} />
        </div>
        <div>
            Registriernummer <input type="number" value={regNr} onChange={evnt => setRegNr(parseInt(evnt.target.value))} />
        </div>

        <button onClick={submit}>Registrieren</button>
    </div>
}