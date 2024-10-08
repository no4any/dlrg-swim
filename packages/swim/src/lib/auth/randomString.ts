import { randomBytes } from "crypto";

export default async function randomString(length: number = 8):Promise<string> {
    return randomBytes(length).toString('hex');
}