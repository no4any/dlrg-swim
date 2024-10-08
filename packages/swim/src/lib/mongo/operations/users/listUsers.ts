import "server-only";

import User from "@/lib/model/User.interface";
import getUsersCollection from "../../getUsersCollection";

export default async function listUsers(): Promise<User[]> {
    const collection = await getUsersCollection();

    const users = (await collection.find({})
        .sort({mail: 1})
        .toArray())
        .map((user) => ({ mail: user.mail, isAdmin: user.isAdmin }));

    return users;
}