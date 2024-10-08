"use server"

import "server-only";
import getSession from "@/lib/auth/getSession";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout() {
    const { mail } = await getSession();

    if(mail) {
        cookies().delete('session');
        redirect('/login');
    }
}