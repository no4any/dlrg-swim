import Footer from "@/app/(print)/Footer"

export default async function ChildrenCert({ name, distance, date, medal, age }: {
    name: string,
    distance: number,
    date: Date,
    age: number,
    medal: "Gold" | "Silber" | "Bronze"
}) {
    return <div className="print">
        <div className="page">
            <h1>Urkunde</h1>
            <h2>{name}</h2>
            <p>ist beim 24 Stunden-Schwimmen der DLRG KG Gießen e.V. vom 12. bis 13. Oktober 2024 im Westbad Gießen</p>
            <h3>{distance} m</h3>
            <p>geschwommen und hat damit in der Altersklasse {age}</p>
            <h3>{medal}</h3>
            <p>erreicht.</p>
        </div>
        <Footer />
    </div>
}