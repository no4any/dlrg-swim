import Image from "next/image";
import LOGO from "./logo.png";
import BINDE from "./binde.png";
import SIGN from "./sig.png";
import Footer from "@/app/(print)/Footer";

export default async function Cert({ name, distance, date }: {
    name: string,
    distance: number,
    date: Date
}) {
    return <div className="print">
        <div className="page">
            <h1>Urkunde</h1>
            <h2>{name}</h2>
            <p>ist beim 24 Stunden-Schwimmen der DLRG KG Gießen e.V. vom 12. bis 13. Oktober 2024 im Westbad Gießen</p>
            <h3>{distance} m</h3>
            <p>geschwommen.</p>
        </div>
        <Footer />
    </div>
}