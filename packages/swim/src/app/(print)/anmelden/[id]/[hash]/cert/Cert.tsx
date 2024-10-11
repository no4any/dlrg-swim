import Image from "next/image";
import LOGO from "./logo.png";
import BINDE from "./binde.png";

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
        <div className="footer">
            <div className="date">
            Gießen, den {date.getMonth()+1 < 10?"0":""}{date.getDate()+1}.{date.getMonth() < 10?"0":""}{date.getMonth()}.{date.getFullYear()}
            </div>
            <div className="signature">
                <div className="sig">_______________________________</div>
                <div className="details">Alexander Sack, Leiter 24 Stunden Schwimmen</div>
            </div>
        </div>
        <Image src={BINDE} alt="Binde" className="binde" />
        <Image src={LOGO} alt="Hintergrund" className="background" width={500} />
    </div>
}