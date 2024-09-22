import { verify } from "jsonwebtoken";
import { JWT_KEY } from "../params";

export default async function checkSignature(token: string): Promise<string | null> {
    try {
        const decoded = verify(token, JWT_KEY);
        if (typeof decoded !== 'string') {
            if (typeof decoded.mail === 'string') {
                return decoded.mail;
            }
        }
    } catch (e) {
        return null;
    }

    return null;
}