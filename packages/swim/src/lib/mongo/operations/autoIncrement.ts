import getCountersCollection from "../getCountersCollection";

export default async function autoIncrement(counterName: string) {
    const collection = await getCountersCollection();
    collection.createIndex({ name: 1 }, { unique: true })

    const toCheck = await collection.findOne({ _id: counterName });

    if (!toCheck) {
        collection.insertOne({
            name: counterName,
            value: 0
        })
    }

    const entry = await collection.findOneAndUpdate({
        name: counterName
    }, {
        $inc: {
            value: 1
        }
    }, {
        returnDocument: "after"
    });

    return entry.value;
}