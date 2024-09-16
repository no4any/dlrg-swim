import hash from "./hash";

export default function hashMatch(id: string, hashToCheck:string): boolean {
    return hash(id) === hashToCheck;
}