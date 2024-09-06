import getSwimmersCollection from "../getSwimmersCollection";

export default async function mailAlreadyExists(mail: string): Promise<boolean> {
    const collection = await getSwimmersCollection();
    const result = await collection.findOne({ email: mail.toLowerCase() });
    return result !== null;
}