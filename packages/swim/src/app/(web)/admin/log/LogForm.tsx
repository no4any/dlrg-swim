"use client";

import { useEffect, useState } from "react";
import RegForm from "./RegForm";
import CapForm from "./CapFrom";
import Button from "@/components/basic/button";
import Swimmer from "@/lib/model/Swimmer.interface";
import LogEntryForm from "./LogEntryForm";
import { H2, H3 } from "@/components/basic/h";

export default function LogForm() {
    const [mode, setMode] = useState<"reg" | "cap" | undefined>(undefined)
    const [swimmer, setSwimmer] = useState<Swimmer | null | undefined>(undefined);
    const [logNr, setLogNr] = useState<number | undefined>(undefined);
    const [laps, setLaps] = useState<number | undefined>(0);

    useEffect(() => {
        setSwimmer(undefined);
    }, [mode])

    function reset() {
        setMode(undefined);
        setSwimmer(undefined);
        setLogNr(undefined);
    }

    function log(logNr: number, lps: number) {
        setLogNr(logNr);
        setLaps(lps);
    }

    if (logNr !== undefined && swimmer) {
        return <div>
            <H2>{swimmer.lastName}, {swimmer.firstName} ({swimmer.regNr}) ({swimmer.capColor} - {swimmer.capNr})</H2>
            <H3>Bahnen: {laps}</H3>
            <H3>ID: {logNr}</H3>
            <div>
                <Button onClick={reset}>Weiterer Eintrag</Button>
            </div>
        </div>
    }

    return <div>
        {!swimmer ? <div>
            <div className="pb-4">
                <Button active={mode === "reg"} onClick={() => setMode("reg")}>Nach Registiernummer</Button>
            </div>
            <div className="pb-4">
                <Button active={mode === "cap"} onClick={() => setMode("cap")}>Nach Kappe</Button>
            </div>
        </div> : <></>}
        {swimmer === undefined ? <>
            {mode === "reg" ? <RegForm onSwimmer={setSwimmer} /> : <></>}
            {mode === "cap" ? <CapForm onSwimmer={setSwimmer} /> : <></>}
        </> : <></>}
        {swimmer !== undefined ? <div>
            {swimmer !== null ? <LogEntryForm onLog={log} swimmer={swimmer} /> : "Schwimmer nicht gefunden"}
        </div> : <></>}
    </div>
}