import User from "@/lib/model/User.interface";
import getUsersCollection from "../../getUsersCollection";

export default async function listUsers(): Promise<User[]> {
    const collection = await getUsersCollection();

    const users = await collection.find({}).toArray();

    return users;
}