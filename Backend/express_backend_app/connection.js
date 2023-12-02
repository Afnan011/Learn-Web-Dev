const { MongoClient } = require("mongodb");

const uri =
  `mongodb+srv://afnan011:Afnan%40123@cluster0.7jypref.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  
  main().catch(console.error);
  
  async function main() {
    try {
    await client.connect();

    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};