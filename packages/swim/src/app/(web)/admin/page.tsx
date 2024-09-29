import getSession from "@/lib/auth/getSession";

export default async function AdminPage() {
    const { mail, isAdmin } = await getSession();

    if (mail) {
        return <div>Admin ({mail})</div>
    } else {
        return <div>ERROR</div>
    }
}