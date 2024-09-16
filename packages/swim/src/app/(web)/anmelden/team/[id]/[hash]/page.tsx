import hashMatch from "@/lib/hashMatch";
import getTeam from "@/lib/mongo/operations/getTeam";
import { notFound } from "next/navigation";
import TeamRegisterForm from "./TeamRegisterForm.component";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "DLRG Gießen: Teamanmeldung 24 Stunden Schwimmen",
    description: "Verwaltungsseite für das 24 Stunden schwimmen der DLRG Gießen",
  };

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
                Teamanmeldung
                <small className="ms-2 font-semibold text-dlrg-black-100">
                    zum 24 Stunden Schwimmen 2024
                </small>
            </h1>
            <h2 className="text-dlrg-black-100 text-xl font-bold"><span className="text-dlrg-blue">Team:</span> {team.name}</h2>
        </header>
        <main>
            <TeamRegisterForm id={params.id} hash={params.hash} />
        </main>
    </div>
}