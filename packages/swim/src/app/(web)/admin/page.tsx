import isAuth from "@/lib/mongo/operations/users/isAuth";
import { cookies } from "next/headers"

export default async function AdminPage() {
    const session = cookies().get('session')?.value;
    const userName = await isAuth(session || "");

    if(userName) {
        return <div>Admin ({userName})</div>
    } else {
        return <div>ERROR</div>
    }
}