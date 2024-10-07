import { H1 } from "@/components/basic/h";
import getTeamsAction from "./getTeams.action";
import TeamsTable from "./TeamsTable";

export const revalidate = 0;
export const dynamic = 'force-dynamic'

export default async function TeamsPage() {
    const teams = await getTeamsAction();

    return <div>
        <H1>Teams</H1>
        <TeamsTable teams={teams} />
    </div>
}