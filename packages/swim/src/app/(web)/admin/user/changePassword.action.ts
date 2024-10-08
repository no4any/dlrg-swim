"use server"

import "server-only";
import getSession from "@/lib/auth/getSession";
import { redirect } from "next/navigation";
import validateUser from "@/lib/mongo/operations/users/validateUser";
import updateUserPassword from "@/lib/mongo/operations/users/updateUserPassword";

export interface ChangePasswordState {
    passwordWrong?: boolean,
    confirmationDoesNotMatch?: boolean,
    requirementsNotMet?: boolean,
    passwordChanged?: boolean
}

export default async function changePasswordAction(_prevState: ChangePasswordState, form: FormData): Promise<ChangePasswordState> {
    const { mail } = await getSession();

    if (mail === null) {
        redirect("/login")
    }

    const password = form.get("password")?.toString();
    const newPassword = form.get("newPassword")?.toString();
    const confirmPassword = form.get("confirmPassword")?.toString();

    if (newPassword !== null && confirmPassword !== null) {
        if ((newPassword?.length || 0) < 8) {
            return {
                requirementsNotMet: true
            }
        }
        if (newPassword !== confirmPassword) {
            return {
                confirmationDoesNotMatch: true
            }
        }
    }

    if (!await validateUser(mail, password || "")) {
        return {
            passwordWrong: true
        }
    }

    await updateUserPassword(mail, newPassword || "");

    return {passwordChanged: true}
}