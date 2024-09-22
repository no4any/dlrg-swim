"use server"

import "server-only"

import { redirect } from "next/navigation";
import LoginFormState from "./LoginFormState.interface"
import treatDefaultUser from "@/lib/mongo/operations/users/treatDefaultUser";
import validateUser from "@/lib/mongo/operations/users/validateUser";
import { cookies } from "next/headers";
import signUser from "@/lib/auth/signUser";

export default async function loginAction(_prevState: LoginFormState, form: FormData): Promise<LoginFormState> {
    const name = form.get("name")?.toString();
    const pass = form.get("password")?.toString();

    await treatDefaultUser(name || "");

    const user = await validateUser(name || "", pass || "")

    if (user) {
        cookies().set('session', await signUser(user.mail))
        redirect("/admin");
    }

    return {
        loginFailed: true
    }
}