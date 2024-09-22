"use server"

import "server-only"

import { redirect } from "next/navigation";
import checkCredentials from "./checkCredentials"
import LoginFormState from "./LoginFormState.interface"

export default async function loginAction(_prevState: LoginFormState, form: FormData): Promise<LoginFormState> {
    const name = form.get("name")?.toString();
    const pass = form.get("password")?.toString();

    if (await checkCredentials(name, pass)) {
        redirect("/admin");
    }

    return {
        loginFailed: true
    }
}