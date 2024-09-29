import { H1 } from "@/components/basic/h";
import User from "@/lib/model/User.interface";
import UserList from "./UserList";
import getUsers from "./getUsers.action";
import getSession from "@/lib/auth/getSession";

export const revalidate = 0;
export const dynamic = 'force-dynamic'

export default async function UsersPage() {
    const {isAdmin} = await getSession();

    if(!isAdmin) {
        return <div>Sie sind nicht berechtig</div>
    }

    const users: User[] = await getUsers();

    return <div>
        <H1>Benutzerverwaltung</H1>
        <UserList users={users} />
    </div>
}