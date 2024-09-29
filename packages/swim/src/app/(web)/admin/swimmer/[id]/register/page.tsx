import { H1 } from "@/components/basic/h";

export default async function RegisterSwimmerPage({ params }: { params: { id: string } }) {
    return <div>
        <H1>Anmeldung eines neuen Schwimmers</H1>
        <div>{params.id}</div>
    </div>
}