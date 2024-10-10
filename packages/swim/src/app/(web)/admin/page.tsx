import { H1, H2 } from "@/components/basic/h";
import getSession from "@/lib/auth/getSession";
import getBreakfastBookingsAction from "./getBreakfastsBookings.action";
import getDistanceTotal from "@/lib/mongo/operations/distances/getDistanceTotal";
import getDistanceTotalNight from "@/lib/mongo/operations/distances/getDistanceTotalNight";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const { mail } = await getSession();

    const breakfasts: number = (await getBreakfastBookingsAction()).length;
    const distanceTotal: number = await getDistanceTotal();
    const distanceTotalNight: number = await getDistanceTotalNight();

    if (mail) {
        return <div>
            <H1>Dashboard</H1>
            <p><b>Hallo {mail}</b></p>
            <div className="grid grid-cols-2 mt-4">
                <div>
                    <H2>Bahnen gesamt: <b>{distanceTotal}m ({distanceTotal / 50} Bahnen)</b></H2>
                </div>
                <div>
                    <H2>Bahnen Nachpokal: <b>{distanceTotalNight}m ({distanceTotalNight / 50} Bahnen)</b></H2>
                </div>
                <div>
                    <H2>Frühstücke: <b>{breakfasts}</b></H2>
                </div>
            </div>
        </div>
    } else {
        return <div>ERROR</div>
    }
}