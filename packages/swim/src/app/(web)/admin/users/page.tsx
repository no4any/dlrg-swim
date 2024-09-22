import isAdmin from "@/lib/mongo/operations/users/isAdmin";
import isAuth from "@/lib/mongo/operations/users/isAuth";
import listUsers from "@/lib/mongo/operations/users/listUsers";
import { cookies } from "next/headers"

export const revalidate = 0;
export const dynamic = 'force-dynamic'

export default async function UsersPage() {
    const token = cookies().get('session')?.value || "";
    const userName = await isAuth(token);

    if (userName === null) {
        return <div>Fehler in der Anmeldung</div>;
    }

    if (!await isAdmin(userName)) {
        return <div>Fehlende Berechtigungen</div>
    }

    const users = await listUsers();

    return <div>
        <div>
            {users.map((user) => <div>{user.mail}</div>)}
        </div>
    </div>
}