import { DEFAULT_USER } from "@/lib/params";
import addUser from "./addUser";
import userExists from "./userExists";
import randomString from "@/lib/auth/randomString";

export default async function treatDefaultUser(mail: string): Promise<void> {
    if (mail === DEFAULT_USER) {
        if (!await userExists(DEFAULT_USER)) {
            const password = await randomString(8);
            console.log(`Added default user with password: ${password}`);
            await addUser(DEFAULT_USER, password, true);
        }
    }
}