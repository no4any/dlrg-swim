export default function formDataToObject(data: FormData): Object {
    return Object.fromEntries(data.entries());
}