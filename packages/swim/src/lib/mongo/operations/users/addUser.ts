import User, { UserSchema } from "@/lib/model/User.interface";
import getUsersCollection from "../../getUsersCollection";
import hash from "@/lib/hash";

export default async function addUser(mail: string, password: string, isAdmin?: boolean): Promise<User> {
    const user = UserSchema.parse({
        mail,
        password: hash(password),
        isAdmin
    });

    const collection = await getUsersCollection();

    const result = await collection.insertOne(user);

    return user;
}