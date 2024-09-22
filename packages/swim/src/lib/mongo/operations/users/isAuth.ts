import checkSignature from "@/lib/auth/checkSignature";
import userExists from "./userExists";

export default async function isAuth(token: string): Promise<string | null> {
    const user = await checkSignature(token);

    if (user !== null) {
        if (await userExists(user)) {
            return user;
        }
    }

    return null;
}