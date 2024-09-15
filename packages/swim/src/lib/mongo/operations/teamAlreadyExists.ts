import getTeamsCollection from "../getTeamsCollection";


export default async function teamAlreadyExists(name: string): Promise<boolean> {
    const collection = await getTeamsCollection();
    const result = await collection.findOne({ lowerName: name.toLowerCase() });
    return result !== null;
}