import { Collection } from "mongodb";
import getDatabase from "./getDatabase";
import { MONGO_TEAMS_COLLECTION } from "../params";
import Team from "../model/Team.interface";

export default async function getTeamsCollection(): Promise<Collection<Team>> {
    return (await getDatabase()).collection<Team>(MONGO_TEAMS_COLLECTION);
}