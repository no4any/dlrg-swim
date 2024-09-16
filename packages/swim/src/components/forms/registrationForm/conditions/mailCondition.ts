import { z } from "zod";

export default function mailCondition(value: string): boolean {
    try {
        z.string().email().parse(value)
        return true;
    } catch (e) { }
    return false;
}