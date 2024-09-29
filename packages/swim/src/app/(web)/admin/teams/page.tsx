import { H1 } from "@/components/basic/h";
import TeamsTable from "./TeamsTable";
import getTeamsAction from "./getTeams.action";

export const revalidate = 0;
export const dynamic = 'force-dynamic'

export default async function TeamsPage() {
    const teams = await getTeamsAction();

    return <div>
        <H1>Teams</H1>
        <TeamsTable teams={teams} />
    </div>
}