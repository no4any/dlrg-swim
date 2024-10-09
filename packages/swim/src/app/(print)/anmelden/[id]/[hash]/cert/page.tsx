import { notFound } from "next/navigation";
import hash from "@/lib/hash";
import getSwimmer from "@/lib/mongo/operations/getSwimmer";
import Cert from "./Cert";
import ChildrenCert from "./ChildrenCert";
import getAge from "@/lib/getAge";
import youthMedal from "@/lib/medal/youthMedal";
import getDistanceForSwimmer from "@/lib/mongo/operations/distances/getDistanceForSwimmer";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function CertPage({ params }: { params: { id: string, hash: string } }) {
    if (hash(params.id) !== params.hash) {
        notFound();
    }

    const swimmer = await getSwimmer(params.id);

    if (swimmer === null) {
        notFound();
    }

    const name = `${swimmer.firstName} ${swimmer.lastName}`;
    const distance = await getDistanceForSwimmer(swimmer._id?.toString() || "");

    if (!swimmer.birthday || swimmer.status !== "FINISHED") {
        return <Cert date={new Date()} distance={distance} name={name} />
    }


    const medal = youthMedal(distance, new Date(swimmer.birthday));

    if (medal) {
        return <ChildrenCert age={getAge(new Date(swimmer.birthday))} date={new Date()} medal={medal} distance={distance} name={name} />
    }

    return <Cert date={new Date()} distance={distance} name={name} />
}