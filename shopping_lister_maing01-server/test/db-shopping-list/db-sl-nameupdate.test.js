// MongoDB related imports
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

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

  test("updateListName", async () => {
    const initialList = {
      name: "Kaufland",
      ownerId: null,
      awid: "22222222222222222222222222222222",
      archived: false,
      sys: { rev: 0 },
      items: [],
      authorizedUsers: [{ userID: null }],
      visibility: false,
      uuIdentity: null,
      uuAppErrorMap: {}
    };

    // Vložení mock NS do kolekce
    const insertResult = await collection.insertOne(initialList);
    const createdListId = insertResult.insertedId;

    // Simulace upravení názvu NS
    const updatedName = "Hornbach";
    await collection.updateOne(
      { _id: createdListId },
      { $set: { name: updatedName } }
    );

    // Získání aktualizovaného NS z mock kolekce
    const updatedList = await collection.findOne({ _id: createdListId });

    console.log("Updated List:", updatedList);
    expect(updatedList).toBeDefined();
    expect(updatedList.name).toBe(updatedName);
  });

  test("updateListName s prázdným dtoIn", async () => {
    const initialList = {
      name: "Nákupní seznam 1",
      ownerId: null,
      awid: "22222222222222222222222222222222",
      archived: false,
      sys: { rev: 0 },
      items: [],
      authorizedUsers: [{ userID: null }],
      visibility: false,
      uuIdentity: null,
      uuAppErrorMap: {}
    };

    const insertResult = await collection.insertOne(initialList);
    const createdListId = insertResult.insertedId;

    // Simulace aktualizace názvu NS s prázdným dtoIn
    const emptyDtoIn = {};
    try {
      await collection.updateOne(
        { _id: createdListId },
        { $set: { name: emptyDtoIn.listName } }
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});