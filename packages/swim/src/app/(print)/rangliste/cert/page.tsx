import getResultsAction from "@/app/(web)/rangliste/getResults.action"

import RankedCert from "./RankedCert";
import TeamCert from "./TeamCert";
import PlainCert from "./PlainCert";
import getSession from "@/lib/auth/getSession";
import Footer from "../../Footer";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function ResultsPrintPage() {
    const {mail} = await getSession();

    if(mail === null) {
        return <div>Nicht berechtigt</div>
    }

    const results = await getResultsAction();
    const date = new Date();

    return <div className="print">
        {results.swimmerYoungestMale ? <PlainCert swimmer={results.swimmerYoungestMale} title="Jüngster Teilnehmer" /> : <></>}
        {results.swimmerYoungestFemale ? <PlainCert swimmer={results.swimmerYoungestFemale} title="Jüngste Teilnehmerin" /> : <></>}
        {results.swimmerOldestMale ? <PlainCert swimmer={results.swimmerOldestMale} title="Ältester Teilnehmer" /> : <></>}
        {results.swimmerOldestFemale ? <PlainCert swimmer={results.swimmerOldestFemale} title="Älteste Teilnehmerin" /> : <></>}
        
        <div className="page"><h1>Weiteste Strecke männlich</h1></div>
        {results.swimmersMale.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke" swimmer={swimmer} />)}
        <div className="page"><h1>Weiteste Strecke weiblich</h1></div>
        {results.swimmersFemale.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke" swimmer={swimmer} />)}

        <div className="page"><h1>Nachtpokal männlich</h1></div>
        {results.swimmersMaleNight.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Nachtpokal" swimmer={swimmer} />)}
        <div className="page"><h1>Nachtpokal weiblich</h1></div>
        {results.swimmersFemaleNight.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Nachtpokal" swimmer={swimmer} />)}

        <div className="page"><h1>Altergruppe 15 bis 17 männlich</h1></div>
        {results.swimmersMale15.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 15 bis 17 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 18 bis 25 männlich</h1></div>
        {results.swimmersMale18.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 18 bis 25 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 26 bis 35 männlich</h1></div>
        {results.swimmersMale26.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 26 bis 35 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 36 bis 45 männlich</h1></div>
        {results.swimmersMale36.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 36 bis 45 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 46 bis 55 männlich</h1></div>
        {results.swimmersMale46.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 46 bis 55 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 56 bis 65 männlich</h1></div>
        {results.swimmersMale56.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 56 bis 65 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 66 bis 75 männlich</h1></div>
        {results.swimmersMale66.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 66 bis 75 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 76 bis 99 männlich</h1></div>
        {results.swimmersMale76.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 76 bis 99 Jahre" swimmer={swimmer} />)}

        <div className="page"><h1>Altergruppe 15 bis 17 weiblich</h1></div>
        {results.swimmersFemale15.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 15 bis 17 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 18 bis 25 weiblich</h1></div>
        {results.swimmersFemale18.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 18 bis 25 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 26 bis 35 weiblich</h1></div>
        {results.swimmersFemale26.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 26 bis 35 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 36 bis 45 weiblich</h1></div>
        {results.swimmersFemale36.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 36 bis 45 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 46 bis 55 weiblich</h1></div>
        {results.swimmersFemale46.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 46 bis 55 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 56 bis 65 weiblich</h1></div>
        {results.swimmersFemale56.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 56 bis 65 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 66 bis 75 weiblich</h1></div>
        {results.swimmersFemale66.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 66 bis 75 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 76 bis 99 weiblich</h1></div>
        {results.swimmersFemale76.slice(0,3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 76 bis 99 Jahre" swimmer={swimmer} />)}

        
        <div className="page"><h2>Beste Leistung sonstiger Teams</h2></div>
        {results.teamsDiv.slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung sonstiger Teams" team={team} />)}
        <div className="page"><h2>Beste Leistung im Durchschnitt sonstiger Teams</h2></div>
        {results.teamsDivAvg.slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung im Durchschnitt sonstiger Teams" team={team} />)}

        
        <div className="page"><h2>Beste Leistung eines Firmenteams</h2></div>
        {results.teamsCompany.slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung eines Firmenteams" team={team} />)}
        <div className="page"><h2>Beste Leistung im Durchschnitt eines Firmenteams</h2></div>
        {results.teamsCompanyAvg.slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung im Durchschnitt eines Firmenteams" team={team} />)}

        <div className="page"><h2>Beste Leistung eines Schwimmvereins</h2></div>
        {results.teamsClub.slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung eines Schwimmvereins" team={team} />)}
        <div className="page"><h2>Beste Leistung im Durchschnitt eines Schwimmvereins</h2></div>
        {results.teamsClubAvg.slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung im Durchschnitt eines Schwimmvereins" team={team} />)}
        <Footer />
    </div>
}