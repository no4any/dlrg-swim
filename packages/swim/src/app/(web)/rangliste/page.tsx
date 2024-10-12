import { H1, H2 } from "@/components/basic/h";
import Swimmer from "@/lib/model/Swimmer.interface";
import Team from "@/lib/model/Team.interface";
import getResultsAction from "./getResults.action";

export const revalidate = 300;

function dateToString(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} um ${hours < 10 ? "0" : ""}${date.getHours()}:${minutes < 10 ? "0" : ""}${date.getMinutes()} Uhr (GMT)`
}

export default async function RankPage() {
    const results = await getResultsAction();

    return <div>
        <H1>Ergebnisse</H1>

        <H2>Stand: {dateToString(new Date)}</H2>

        <Result title="Weiteste Strecke" swimmers={results.swimmers}></Result>
        <Result title="Weiteste Strecke männlich" swimmers={results.swimmersMale}></Result>
        <Result title="Weiteste Strecke weiblich" swimmers={results.swimmersFemale}></Result>
        <Result title="Weiteste Strecke Nachtpokal männlich" swimmers={results.swimmersMaleNight} night></Result>
        <Result title="Weiteste Strecke Nachtpokal weiblich" swimmers={results.swimmersFemaleNight} night></Result>

        <TeamResult title="Weiteste Strecke Team (Sonstige)" teams={results.teamsDiv} />
        <TeamResult title="Weitester Durchschnitt Team (Sonstige)" teams={results.teamsDivAvg} average />

        <TeamResult title="Weiteste Strecke Team (Schwimmverein)" teams={results.teamsClub} />
        <TeamResult title="Weitester Durchschnitt Team (Schwimmverein)" teams={results.teamsClubAvg} average />

        <TeamResult title="Weiteste Strecke Team (Firma)" teams={results.teamsCompany} />
        <TeamResult title="Weitester Durchschnitt Team (Firma)" teams={results.teamsCompanyAvg} average />
    </div>
}

function Result({ title, swimmers, night }: {
    title: string,
    swimmers: (Swimmer & {
        total: number,
        night: number,
        age: number
    })[],
    night?: boolean
}) {
    return <div>
        <H2>{title}</H2>
        <div className="grid grid-cols-4">
            <div><b>Platz</b></div>
            <div><b>Name</b></div>
            <div><b>Vorname</b></div>
            <div><b>Geschwommen</b></div>
        </div>
        {swimmers.map(((swimmer, i) => <div key={swimmer._id?.toString()} className="grid grid-cols-4">
            <div>{++i}</div>
            <div>{swimmer.publishName ? swimmer.lastName : ""}</div>
            <div>{swimmer.publishName ? swimmer.firstName : ""}</div>
            <div>{night ? swimmer.night : swimmer.total}m</div>
        </div>))}
    </div>
}

function TeamResult({ title, teams, average }: {
    title: string,
    teams: (Team & {
        total: number,
        swimmerCount: number
    })[],
    average?: boolean
}) {
    return <div>
        <H2>{title}</H2>
        <div className="grid grid-cols-4">
            <div><b>Platz</b></div>
            <div><b>Name</b></div>
            <div><b>Anzahl Schwimmer</b></div>
            <div><b>{average ? "Durchschnittsleistung" : "Bahnen"}</b></div>
        </div>
        {teams.map(((team, i) => <div key={team._id?.toString()} className="grid grid-cols-4">
            <div>{++i}</div>
            <div>{team.name}</div>
            <div>{team.swimmerCount}</div>
            <div>{average ? Math.floor(team.total / team.swimmerCount) : team.total}m</div>
        </div>))}
    </div>
}