import User, { UserSchema } from "@/lib/model/User.interface";
import getUsersCollection from "../../getUsersCollection";
import hash from "@/lib/hash";

export default async function validateUser(mail: string, password: string): Promise<User | null> {
    const collection = await getUsersCollection();

    const user = await collection.findOne({
        mail,
        password: hash(password)
    });

    return user;
}