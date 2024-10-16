import { H1, H2 } from "@/components/basic/h";
import getSession from "@/lib/auth/getSession";
import getBreakfastBookingsAction from "./getBreakfastsBookings.action";
import getDistanceTotal from "@/lib/mongo/operations/distances/getDistanceTotal";
import getDistanceTotalNight from "@/lib/mongo/operations/distances/getDistanceTotalNight";
import Link from "next/link";
import PrintTool from "./PrintTool";
import Swimmer from "@/lib/model/Swimmer.interface";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const { mail } = await getSession();

    const breakfasts: Swimmer[] = await getBreakfastBookingsAction();
    const breakfastsTotal: number = breakfasts.length;
    const breakfastsRegistered: number = breakfasts.filter(swimmer => swimmer.status !== "ANNOUNCED").length;
    const distanceTotal: number = await getDistanceTotal();
    const distanceTotalNight: number = await getDistanceTotalNight();

    if (mail) {
        return <div>
            <H1>Dashboard</H1>
            <p><b>Hallo {mail}</b></p>
            <div className="grid lg:grid-cols-2 mt-4">
                <div>
                    <H2>Bahnen gesamt: <b>{distanceTotal}m ({distanceTotal / 50} Bahnen)</b></H2>
                </div>
                <div>
                    <H2>Bahnen Nachtpokal: <b>{distanceTotalNight}m ({distanceTotalNight / 50} Bahnen)</b></H2>
                </div>
                <div>
                    <H2>Frühstücke: <b>{breakfastsTotal} ({breakfastsRegistered} Angemeldet)</b></H2>
                </div>
                <div>
                    <H2>Links</H2>
                    <div><Link href="/ergebnisse">Ergebnisse</Link></div>
                    <div><Link href="/rangliste">Rangliste</Link></div>
                    <div><Link href="/rangliste/cert">Rangliste zum drucken</Link></div>
                </div>
                <div>
                    <H2>Freie Urkunde</H2>
                    <PrintTool />
                </div>
            </div>
        </div>
    } else {
        return <div>ERROR</div>
    }
}