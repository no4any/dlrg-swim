import { H1, H2 } from "@/components/basic/h";
import getSwimmersForPublishing from "@/lib/mongo/operations/getSwimmersForPublishing";
import SwimmerRow from "./SwimmerRow";
import getTeams from "@/lib/mongo/operations/teams/getTeams";
import TeamRow from "./TeamRow";

export const revalidate = 300;

export default async function ErgebnissePage() {
    const swimmers = (await getSwimmersForPublishing()).sort((a, b) => a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1);
    const teams = (await getTeams()).sort((a, b) => a.lowerName > b.lowerName ? 1 : -1);
    return <div>
        <H1>Ergebnisse</H1>
        <H2>Einzelschwimmer</H2>
        <div className="grid grid-cols-4">
            <div><b>Name</b></div>
            <div><b>Vorname</b></div>
            <div><b>Gesamt</b></div>
            <div><b>Nachtpokal</b></div>
        </div>
        <div className="pb-4">
            {swimmers.map(swimmer => <SwimmerRow key={swimmer._id?.toString() || ""} swimmer={swimmer} />)}
        </div>
        <H2>Teams</H2>
        <div className="grid grid-cols-2">
            <div><b>Teamname</b></div>
            <div><b>Strecke</b></div>
        </div>
        <div>
            {teams.map(team => <TeamRow team={team} />)}
        </div>
    </div>
}