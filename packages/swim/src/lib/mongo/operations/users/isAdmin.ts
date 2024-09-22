import getUsersCollection from "../../getUsersCollection";

export default async function isAdmin(mail: string): Promise<boolean> {
    const collection = await getUsersCollection();
    const user = await collection.findOne({ mail, isAdmin: true });
    return user !== null;
}