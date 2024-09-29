import { cookies } from "next/headers";
import isAuth from "../mongo/operations/users/isAuth";
import { redirect } from "next/navigation";

export default async function isLoggedIn(): Promise<boolean> {
    const token = cookies().get('session')?.value || "";
    const userName = await isAuth(token);

    if (userName === null) {
        redirect("/login")
    }

    return true;
}