export default async function checkCredentials(name?: string, password?:string): Promise<boolean> {
    if(!name || !password) {
        return false
    }
    // TODO: implement
    return true;
}