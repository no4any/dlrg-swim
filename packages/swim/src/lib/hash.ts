import { createHash } from "crypto";
import { HASH_SALT } from "./params";

export default function hash(msg: string): string {
    return createHash('sha256').update(`${HASH_SALT}${msg}${HASH_SALT}`).digest('hex')
}