import { z } from "zod";

export default function cityCondition(value: string): boolean {
    try {
        z.string().parse(value)
        return true;
    } catch (e) { }
    return false;
}