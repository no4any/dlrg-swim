import "server-only";

import { sign } from "jsonwebtoken";
import { JWT_KEY } from "../params";

export default async function signUser(mail: string): Promise<string> {
    return sign({ mail }, JWT_KEY, { algorithm: 'HS512' })
}