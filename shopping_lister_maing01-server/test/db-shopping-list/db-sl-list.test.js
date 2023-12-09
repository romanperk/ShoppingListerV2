// MongoDB related imports
const { MongoClient } = require("mongodb");

describe("Shopping List uuCMD tests", () => {
  let client;
  let collection;

  beforeAll(async () => {
    // Připojení k instanci MongoDB a vytvoření připojení
    client = await MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true });
    const db = client.db("TestDatabase"); 
    collection = db.collection("shoppingListSumm"); 
  });

  afterAll(async () => {
    // Po dokončení všech testů uzavření připojení MongoDB
    await client.close();
  });

  test("listAllShoppingLists", async () => {
    const allLists = await collection.find({}).toArray();
    console.log("All Shopping Lists:", allLists);

    expect(allLists).toBeDefined();
    expect(Array.isArray(allLists)).toBeTruthy(); // Kontrola, zda jde o array
  });
  test("listAllShoppingLists bez žádných nákupních seznamů k načtení", async () => {
    await collection.deleteMany({});
    const allLists = await collection.find({}).toArray();

    expect(allLists).toBeDefined();
    expect(allLists.length).toBe(0); // Kontrola, zda je výsledek prázdný array
  });
});