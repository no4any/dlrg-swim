"use server"

import getSession from "@/lib/auth/getSession";

export default async function logAction(id: string, laps: number): Promise<number> {
    const { mail } = await getSession();

    if (!mail) {
        return 0;
    }

    // TODO: implementieren

    return new Date().getTime();
}