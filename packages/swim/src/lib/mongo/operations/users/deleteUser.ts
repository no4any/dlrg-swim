import getUsersCollection from "../../getUsersCollection";

export default async function deleteUser(mail: string): Promise<boolean> {
    const collection = await getUsersCollection();

    const result = await collection.deleteOne({
        mail
    });

    return result.deletedCount > 0;
}