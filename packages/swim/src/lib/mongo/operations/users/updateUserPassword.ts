import getUsersCollection from "../../getUsersCollection";
import hash from "@/lib/hash";

export default async function updateUserPassword(mail: string, password: string): Promise<boolean> {
    const collection = await getUsersCollection();

    const result = await collection.updateOne({
        mail
    }, {
        $set: {
            password: hash(password)
        }
    });

    return result.modifiedCount > 0;
}