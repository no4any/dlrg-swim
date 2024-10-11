"use server"

import "server-only"

import deleteUser from "@/lib/mongo/operations/users/deleteUser";
import getSession from "@/lib/auth/getSession";
import { revalidatePath } from "next/cache";

export default async function removeUser(user: string): Promise<boolean> {
    const { mail, isAdmin } = await getSession();

    if (mail === null) {
        return false;
    }

    if (mail === user) {
        return false;
    }

    if (!isAdmin) {
        return false;
    }

    revalidatePath('/admin');
    return await deleteUser(user);
}