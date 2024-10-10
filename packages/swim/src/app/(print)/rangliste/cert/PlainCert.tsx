import Swimmer from "@/lib/model/Swimmer.interface";

export default function PlainCert({ title, swimmer }: { title: string, swimmer: Swimmer }) {
    return <div className="page">
        <h1>Urkunde</h1>
        <h2>{title}</h2>
        <p className="for">für</p>
        <h4>{swimmer.firstName} {swimmer.lastName}</h4>
        <p>beim 24 Stunden-Schwimmen der DLRG KG Gießen e.V. vom 12. bis 13. Oktober 2024 im Westbad Gießen</p>
    </div>
}