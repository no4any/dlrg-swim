import { H1 } from "@/components/basic/h";
import getSwimmersAction from "./getSwimmers.action";
import SwimmersTable from "./SwimmersTable";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function SwimmersPage() {
    const swimmers = await getSwimmersAction();

    return <div>
        <H1>Schwimmer</H1>
        <SwimmersTable swimmers={swimmers} />
    </div>
}