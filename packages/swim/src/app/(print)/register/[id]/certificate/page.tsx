import autoIncrement from "@/lib/mongo/operations/autoIncrement";

export const revalidate = 0
export const dynamic = 'force-dynamic';

export default async function CertificatePage({ params }: { params: { id: string } }) {
    return <div className="print:text-dlrg-red">Urkunde ({params.id})({await autoIncrement("test")})</div>
}