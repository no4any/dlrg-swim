import { DEFAULT_USER } from "@/lib/params";
import addUser from "./addUser";
import userExists from "./userExists";

export default async function treatDefaultUser(mail: string): Promise<void> {
    if (mail === DEFAULT_USER) {
        if (!await userExists(DEFAULT_USER)) {
            const password = Math.random().toString(36).slice(2, 7);
            console.log(`Added default user with password: ${password}`);
            await addUser(DEFAULT_USER, password, true);
        }
    }
}