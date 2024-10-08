import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import isAuth from "../mongo/operations/users/isAuth";
import isAdmin from "../mongo/operations/users/isAdmin";

export interface Session {
    mail: string | null, // null in case of not authenticated
    isAdmin: true | false
}

const getSession = cache(async (): Promise<Session> => {
    const session = cookies().get('session')?.value;
    
    if (session) {
        const user = await isAuth(session);
        if (user !== null) {
            console.log(`${user} was authenticated`)
            return {
                mail: user,
                isAdmin: await isAdmin(user)
            }
        }
    }

    return {
        mail: await isAuth(session),
        isAdmin: false
    }
});

export default getSession;