import getUsersCollection from "../../getUsersCollection";

export default async function userExists(mail: string): Promise<boolean> {
    const collection = await getUsersCollection();

    const user = await collection.findOne({ mail });

    return user !== null;
}