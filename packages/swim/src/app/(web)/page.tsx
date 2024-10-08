import getCountersCollection from "@/lib/mongo/getCountersCollection";
import getDistancesCollection from "@/lib/mongo/getDistancesCollection";
import getSwimmersCollection from "@/lib/mongo/getSwimmersCollection"
import getTeamsCollection from "@/lib/mongo/getTeamsCollection";
import getUsersCollection from "@/lib/mongo/getUsersCollection";
import fs from "fs";

const TEAMS_FILE = "/data/teams.json";
const SWIMMERS_FILE = "/data/swimmers.json";
const COUNTERS_FILE = "/data/counters.json";
const DISTANCES_FILE = "/data/distances.json";
const USERS_FILE = "/data/users.json";

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
    console.log("Exporting swimmers")
    const scol = await getSwimmersCollection();
    const sJson = JSON.stringify(await scol.find({}).toArray());
    fs.writeFileSync(SWIMMERS_FILE, sJson);

    console.log("Exporting teams")
    const tcol = await getTeamsCollection();
    const tJson = JSON.stringify(await tcol.find({}).toArray());
    fs.writeFileSync(TEAMS_FILE, tJson);

    console.log("Exporting counters")
    const ccol = await getCountersCollection();
    const cJson = JSON.stringify(await ccol.find({}).toArray());
    fs.writeFileSync(COUNTERS_FILE, cJson);

    console.log("Exporting distances")
    const dcol = await getDistancesCollection();
    const dJson = JSON.stringify(await dcol.find({}).toArray());
    fs.writeFileSync(DISTANCES_FILE, dJson);

    console.log("Exporting users")
    const ucol = await getUsersCollection();
    const uJson = JSON.stringify(await ucol.find({}).toArray());
    fs.writeFileSync(USERS_FILE, uJson);
  } catch (e) { }

  return <div>Hello DLRG!</div>
}
