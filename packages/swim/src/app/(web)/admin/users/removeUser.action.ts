"use server"

import "server-only"

import isAdmin from "@/lib/mongo/operations/users/isAdmin"
import { cookies } from "next/headers";
import isAuth from "@/lib/mongo/operations/users/isAuth";
import deleteUser from "@/lib/mongo/operations/users/deleteUser";

export default async function removeUser(user:string):Promise<boolean> {
    const token = cookies().get('session')?.value || "";
    const userName = await isAuth(token);

    if (userName === null) {
        return false;
    }

    if(userName === user) {
        return false;
    }

    if (!await isAdmin(userName)) {
        return false;
    }
    
    return await deleteUser(user);
}