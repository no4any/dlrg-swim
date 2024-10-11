import Image from "next/image";
import LOGO from "./logo.png";
import BINDE from "./binde.png";
import SIGN from "./sig.png";

export default function Footer({ all }: { all?: boolean }) {
    const date = new Date();
    return <>
        <div className="footer">
            <div className="date">
                Gießen, den {date.getMonth() + 1 < 10 ? "0" : ""}{date.getDate() + 1}.{date.getMonth() < 10 ? "0" : ""}{date.getMonth()}.{date.getFullYear()}
            </div>
            <div className="signature">
                <div className="sig">_______________________________</div>
                <div className="details">Alexander Sack, Leiter 24 Stunden Schwimmen</div>
            </div>
        </div>
        <Image src={SIGN} alt="Unterschrift" className={`sign ${all ? "all" : ""}`} width={250} />
        <Image src={BINDE} alt="Binde" className={`binde  ${all ? "all" : ""}`} />
        <Image src={LOGO} alt="Hintergrund" className="background" width={all ? 750 : 500} />
    </>
}