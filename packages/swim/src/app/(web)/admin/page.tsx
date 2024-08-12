import getSwimmers from "@/lib/mongo/operations/getSwimmers"
import SwimmersTable from "./SwimmersTable.component";
import SwimmersTableFilters from "./SwimmerTableFilters.component";

export const revalidate = 0
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const swimmers = await getSwimmers();

    return <div>
        <SwimmersTableFilters />
        <SwimmersTable swimmers={swimmers} />
    </div>
}