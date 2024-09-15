import QrCode from "@/components/QrCode.component";
import hash from "@/lib/hash";
import getSwimmer from "@/lib/mongo/operations/getSwimmer"
import getTeam from "@/lib/mongo/operations/getTeam";
import { BASE_PATH } from "@/lib/params";
import { notFound } from "next/navigation";

export default async function RegisteredPage({ params }: { params: { id: string, hash: string } }) {
    if (hash(params.id) !== params.hash) {
        return <div>Falsche Seite
            <br />Hashed:{hash(params.id)}
            <br />Got:{params.hash}
        </div>
    }

    const swimmer = await getSwimmer(params.id);

    if (swimmer === null) {
        notFound();
    }

    let team = null;
    let teamLink = undefined;
    if (swimmer.teamId) {
        team = await getTeam(swimmer.teamId);
        const teamId = team?._id?.toString() || "null";
        teamLink = `${BASE_PATH}/team/${teamId}/${hash(teamId)}`;
    }

    return <div className="xl:mx-64 lg:mx-32 md:mx-16 mx-8 mt-4 mb-8">
        <header className="mb-4">
            <h1 className="lg:text-5xl text-2xl text-dlrg-blue font-extrabold">
                Ihre Anmeldung
                <small className="block font-semibold text-dlrg-black-100">
                    Halten sie folgende Informationen bei der Anmeldung griffbereit
                </small>
            </h1>
        </header>
        <main>
            <div className="mb-4 flex justify-center">
                <QrCode msg={`${BASE_PATH}/admin/${params.id}/register`} />
            </div>
            {teamLink ? <div className="mb-4 flex justify-center">
                <div>
                    <QrCode msg={teamLink} />
                    <div className="text-center"><a href={teamLink}>Link um weitere Teammitglieder anzumelden</a></div>
                </div>
            </div> : undefined}
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
                        <td>{team?.name || <i className="text-gray-700">Keine Angabe</i>}</td>
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
                </tbody>
            </table>
        </main>
    </div>
}