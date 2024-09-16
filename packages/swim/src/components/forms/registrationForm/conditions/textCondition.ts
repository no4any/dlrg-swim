import { z } from "zod";

export default function textCondition(value: string): boolean {
    try {
        z.string().min(2).parse(value)
        return true;
    } catch (e) { }
    return false;
}