import QrCode from "@/components/QrCode.component";
import hash from "@/lib/hash";
import Swimmer from "@/lib/model/Swimmer.interface";
import getSwimmer from "@/lib/mongo/operations/getSwimmer"
import getTeam from "@/lib/mongo/operations/getTeam";
import getTeamMembers from "@/lib/mongo/operations/getTeamMembers";
import { BASE_PATH } from "@/lib/params";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "DLRG Gießen: Ihre Daten",
    description: "Verwaltungsseite für das 24 Stunden schwimmen der DLRG Gießen",
  };

export default async function RegisteredPage({ params }: { params: { id: string, hash: string } }) {
    if (hash(params.id) !== params.hash) {
        notFound();
    }

    const swimmer = await getSwimmer(params.id);

    if (swimmer === null) {
        notFound();
    }

    let team = null;
    let teamLink = undefined;
    let isTeamLeader = false;
    let teamMembers: Swimmer[] = []

    if (swimmer.teamId) {
        team = await getTeam(swimmer.teamId);
        const teamId = team?._id?.toString() || "null";
        teamLink = `${BASE_PATH}/anmelden/team/${teamId}/${hash(teamId)}`;

        if (swimmer._id?.toString() === team?.owner.toString()) {
            isTeamLeader = true;
            teamMembers = await getTeamMembers(swimmer.teamId);
        }
    }

    return <div className="xl:mx-64 lg:mx-32 md:mx-16 mx-8 mt-4 mb-8">
        <header className="mb-4">
            <h1 className="lg:text-5xl text-2xl text-dlrg-blue font-extrabold">
                Ihre Anmeldung
                <small className="block font-semibold text-dlrg-black-100 mt-4">
                    Halten sie folgende Informationen bei der Anmeldung griffbereit.
                </small>
                <small className="block font-semibold text-dlrg-black-100 mt-4">
                    Speichern sie wenn möglich diese Seite in Ihren Favoriten ab.
                </small>
            </h1>
        </header>
        <main>
            <div className="mb-4 justify-center">
                <h2 className="text-2xl text-center font-extrabold">Bei der Anmeldung vorzeigen (ausgedruckt oder auf Smartphone)</h2>
            </div>
            <div className="mb-4 flex justify-center">
                <QrCode msg={`${BASE_PATH}/admin/${params.id}/register`} />
            </div>
            <div className="mb-4 justify-center">
                <h2 className="text-2xl text-center font-extrabold">Teilen Sie diesen Link oder den QR-Code mit ihren Teammitglieder damit diese sich für das Team anmelden können</h2>
            </div>
            {teamLink ? <div className="mb-4 flex justify-center">
                <div>
                    <QrCode msg={teamLink} />
                    <div className="text-center"><a href={teamLink}>Link um weitere Teammitglieder anzumelden</a></div>
                </div>
            </div> : undefined}
            {isTeamLeader ? <div className="mb-4 justify-center">
                <div><h2 className="text-2xl text-center font-extrabold">Teammitglieder</h2></div>
                {teamMembers.map((swimmer) => <div key={swimmer._id?.toString() || ""} className="text-center">{swimmer.lastName}, {swimmer.firstName}</div>)}
            </div> : undefined}
            <div><h2 className="text-2xl text-center font-extrabold">Persönliche Daten</h2></div>
            <table className="w-full table-fixed border-separate border-spacing-2">
                <tbody>
                    <tr>
                        <th className="text-right">Name</th>
                        <td>{swimmer.lastName}</td>
                    </tr>
                    <tr>
                        <th className="text-right">Vorname</th>
                        <td>{swimmer.firstName}</td>
                    </tr>
                    <tr>
                        <th className="text-right">E-Mail</th>
                        <td>{swimmer.email}</td>
                    </tr>
                    <tr>
                        <th className="text-right">Geburtstag</th>
                        <td>{swimmer.birthday || <i className="text-gray-700">Keine Angabe</i>}</td>
                    </tr>
                    <tr>
                        <th className="text-right">Stadt</th>
                        <td>{swimmer.city || <i className="text-gray-700">Keine Angabe</i>}</td>
                    </tr>
                    <tr>
                        <th className="text-right">Teamname</th>
                        <td>{swimmer.teamId ? `${team?.name} ${isTeamLeader ? "(Teamleiter)" : undefined}` : <i className="text-gray-700">Keine Angabe</i>}</td>
                    </tr>
                    <tr>
                        <th className="text-right">Frühstück</th>
                        <td>{swimmer.breakfast ? "Ja" : "Nein"}</td>
                    </tr>
                    <tr>
                        <th className="text-right">Distanzwertung</th>
                        <td>{swimmer.distanceRating ? "Ja" : "Nein"}</td>
                    </tr>
                    <tr>
                        <th className="text-right">Name für Leistungen anzeigen</th>
                        <td>{swimmer.publishName ? "Ja" : "Nein"}</td>
                    </tr>
                    <tr>
                        <th className="text-right">Ich möchte über zukünftige Veranstaltungen informiert werden</th>
                        <td>{swimmer.newsletter ? "Ja" : "Nein"}</td>
                    </tr>
                </tbody>
            </table>
        </main>
    </div>
}