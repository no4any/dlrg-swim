export default async function flatten<T>(obj: T): Promise<T> {
    return JSON.parse(JSON.stringify(obj));
}