export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function SwimmerPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return <div>Swimmer ({id})</div>
}