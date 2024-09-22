import getUsersCollection from "../../getUsersCollection";

export default async function updateUserIsAdmin(mail: string, isAdmin?: boolean): Promise<boolean> {
    const collection = await getUsersCollection();

    const result = await collection.updateOne({
        mail
    }, {
        $set: {
            isAdmin
        }
    });

    return result.modifiedCount > 0;
}