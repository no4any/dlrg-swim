export default async function RegisterSelfService({ params }: { params: Promise<{ id: string, token: string }> }) {
    const {id, token} = await params;

    return <div>
        Self service ({id} --- {token})
    </div>
}