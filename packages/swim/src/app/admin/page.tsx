import getSwimmers from "@/lib/mongo/operations/getSwimmers"

export default async function AdminPage() {
    const swimmers = await getSwimmers();
    return <div>
        <table className="table-auto w-full text-left">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Vorname</th>
                    <th>Status</th>
                    <th className="text-right">Aktionen</th>
                </tr>
            </thead>
            <tbody>
                {swimmers.map((swimmer, i) => <tr key={swimmer._id?.toString() || i}>
                    <td>{swimmer.lastName}</td>
                    <td>{swimmer.firstName}</td>
                    <td>{swimmer.status}</td>
                    <td className="text-right">
                        <button className="bg-dlrg-blue rounded-lg px-2">Ändern</button>
                        <button className="bg-dlrg-red rounded-lg px-2 mx-2">Löschen</button>
                        <button className="bg-dlrg-yellow rounded-lg px-2">Karte</button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </div>
}