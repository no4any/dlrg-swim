import "server-only"
import getCountersCollection from "../../getCountersCollection"

export default async function generateId(name: string) {
    const collection = await getCountersCollection();
    const result = await collection.findOneAndUpdate({
        name
    }, {
        $inc: {
            autoIncrementId: 1
        }
    }, {
        returnDocument: "after"
    })

    if (result !== null) {
        return result.autoIncrementId;
    }

    await collection.insertOne({name, autoIncrementId: 1});

    return 1;
}