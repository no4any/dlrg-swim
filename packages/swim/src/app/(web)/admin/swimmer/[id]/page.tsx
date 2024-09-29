import { H1, H2 } from "@/components/basic/h";
import getSwimmerAction from "./getSwimmer.action";
import { notFound } from "next/navigation";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function EditSwimmerPage({ params }: { params: { id: string } }) {
    const swimmer = await getSwimmerAction(params.id);

    if(swimmer === null) {
        notFound();
    }

    return <div>
        <H1>Schwimmer bearbeiten</H1>
        <H2>{swimmer.lastName}, {swimmer.firstName}</H2>
        <div>{JSON.stringify(swimmer)}</div>
    </div>
}