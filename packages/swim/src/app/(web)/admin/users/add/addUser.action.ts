"use server"

import "server-only";
import AddUserState from "./AddUserState.interface";
import { redirect } from "next/navigation";
import getSession from "@/lib/auth/getSession";
import userExists from "@/lib/mongo/operations/users/userExists";
import addUser from "@/lib/mongo/operations/users/addUser";
import { z } from "zod";

export default async function addUserAction(_prevState: AddUserState, form: FormData): Promise<AddUserState> {
    const { isAdmin } = await getSession();

    if (!isAdmin) {
        redirect("/admin")
    }

    try {
        const mail = z.string().email().parse(form.get('mail')?.toString().toLowerCase());
        const password = z.string().min(8).parse(form.get('password')?.toString());

        console.log("Pass", password);

        if (await userExists(mail)) {
            return { userAlreadyExists: true }
        }

        await addUser(mail, password, form.get('admin') === "on");
    } catch (e) {
        return {
            error: true
        }
    }


    redirect("/admin/users")
}