import { H1 } from "@/components/basic/h";

export default async function EditSwimmerPage({ params }: { params: { id: string } }) {
    return <div>
        <H1>Schwimmer bearbeiten</H1>
        <div>{params.id}</div>
    </div>
}