export const revalidate = 0;
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function SwimmerEditPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return <div>Swimmer edit ({id})</div>
}