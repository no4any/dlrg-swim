import hashMatch from "@/lib/hashMatch";
import getTeam from "@/lib/mongo/operations/getTeam";
import { notFound } from "next/navigation";
import TeamRegisterForm from "./TeamRegisterForm.component";

export default async function TeamRegistrationPage({ params }: { params: { id: string, hash: string } }) {
    if (!hashMatch(params.id, params.hash)) {
        notFound();
    }

    const team = await getTeam(params.id);

    if (team === null) {
        notFound();
    }

    return <div className="">
        <header className="mb-4">
            <h1 className="lg:text-5xl text-2xl text-dlrg-blue font-extrabold">
                Anmeldung
                <small className="ms-2 font-semibold text-dlrg-black-100">
                    zum 24 Stunden Schwimmen 2024
                </small>
            </h1>
        </header>
        <main>
            <TeamRegisterForm id={params.id} hash={params.hash} />
        </main>
    </div>
}