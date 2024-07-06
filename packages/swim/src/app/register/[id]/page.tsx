import QrCode from "@/components/QrCode.component";
import getSwimmer from "@/lib/mongo/operations/getSwimmer"
import { BASE_PATH } from "@/lib/params";

export default async function RegisteredPage({ params }: { params: { id: string } }) {
    const swimmer = await getSwimmer(params.id);

    console.log(swimmer);

    return <div className="xl:mx-64 lg:mx-32 md:mx-16 mx-8 mt-4 mb-8">
        <header className="mb-4">
            <h1 className="lg:text-5xl text-2xl text-dlrg-blue font-extrabold">
                Ihre Anmeldung ({params.id})
                <small className="ms-2 font-semibold text-dlrg-black-100">
                    bewahren sie folgende Informationen bei der Anmeldung griffbereit
                </small>
            </h1>
        </header>
        <main>
            <div className="mb-4">
                <QrCode msg={`${BASE_PATH}/confirm/${params.id}`} />
            </div>
            <table className="w-full table-auto border-collapse border border-slate-500">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{swimmer.lastName}</td>
                    </tr>
                    <tr>
                        <th>Vorname</th>
                        <td>{swimmer.firstName}</td>
                    </tr>
                    <tr>
                        <th>E-Mail</th>
                        <td>{swimmer.email}</td>
                    </tr>
                    <tr>
                        <th>Geburtstag</th>
                        <td>{swimmer.birthday}</td>
                    </tr>
                    <tr>
                        <th>Stadt</th>
                        <td>{swimmer.city}</td>
                    </tr>
                    <tr>
                        <th>Teamname</th>
                        <td>{swimmer.teamName}</td>
                    </tr>
                    <tr>
                        <th>Frühstück</th>
                        <td>{swimmer.breakfast ? "Ja" : "Nein"}</td>
                    </tr>
                    <tr>
                        <th>Distanzwertung</th>
                        <td>{swimmer.distanceRating ? "Ja" : "Nein"}</td>
                    </tr>
                    <tr>
                        <th>Name für Leistungen anzeigen</th>
                        <td>{swimmer.publishName ? "Ja" : "Nein"}</td>
                    </tr>
                </tbody>
            </table>
        </main>
    </div>
}