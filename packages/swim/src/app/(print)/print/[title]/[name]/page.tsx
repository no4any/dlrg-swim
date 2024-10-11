import Footer from "@/app/(print)/Footer";
import PlainCert from "@/app/(print)/rangliste/cert/PlainCert";
import getSession from "@/lib/auth/getSession";
import { redirect } from "next/navigation";

export default async function PrintPage({ params }: { params: { name: string, title: string } }) {
    const { mail } = await getSession();

    if (mail === null) {
        redirect('/login');
    }

    const { name, title } = params;

    return <div className="print">
        <div className="page">
            <h1>Urkunde</h1>
            <h2>{decodeURIComponent(title)}</h2>
            <p className="for">für</p>
            <h4>{decodeURIComponent(name)}</h4>
            <p>beim 24 Stunden-Schwimmen der DLRG KG Gießen e.V. vom 12. bis 13. Oktober 2024 im Westbad Gießen</p>
        </div>
        <Footer />
    </div>
}