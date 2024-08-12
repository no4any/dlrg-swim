export default async function CertificatePage({ params }: { params: { id: string } }) {
    return <div className="print:text-dlrg-red">Urkunde ({params.id})</div>
}