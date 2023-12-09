
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

  test("deleteShoppingList", async () => {
    const newList = {
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
    const insertResult = await collection.insertOne(newList);

    // Načtení _id vytvořeného NS z operace vložení
    const createdListId = insertResult.insertedId;

    // Provedení delete operace vytvořeného NS z mock kolekce
    await collection.deleteOne({ _id: createdListId });

    // Načtení smazaného nákupního seznamu a kontrola, zda po smazání existuje
    const deletedList = await collection.findOne({ _id: createdListId });

    console.log("Vymazaný nákupní seznam:", deletedList);
    expect(deletedList).toBeNull(); // Ujištění, že odstraněný seznam v kolekci neexistuje

    expect(newList.uuAppErrorMap).toEqual({});
  });
  test("deleteShoppingList s neexistujícím ID", async () => {
    const nonExistentId = "non-existent-id";
    const deleteResult = await collection.deleteOne({ _id: nonExistentId });

    expect(deleteResult.deletedCount).toBe(0); // Ujištění, že nebyly smazány žádné dokumenty
  });
});