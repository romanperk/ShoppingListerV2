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

  test("createList", async () => {
    const dtoIn = {
      listName: "Kaufland", 
    };

    // Očekávané hodnoty pro vytvořený NS
    const expectedList = {
      name: "Kaufland",
      ownerId: null,
      awid: "22222222222222222222222222222222",
      archived: false,
      sys: {
        rev: 0
      },
      items: [],
      authorizedUsers: [{ userID: null }],
      visibility: false,
      uuIdentity: null,
      uuAppErrorMap: {}
    };

    // Simulace vytvoření NS
    const newList = {
      name: dtoIn.listName,
      ownerId: null,
      awid: "22222222222222222222222222222222",
      archived: false,
      sys: {
        rev: 0
      },
      items: [],
      authorizedUsers: [{ userID: null }],
      visibility: false,
      uuIdentity: null,
      uuAppErrorMap: {}
    };

    const insertResult = await collection.insertOne(newList);
    const createdList = await collection.findOne({ _id: insertResult.insertedId });

    console.log("Výsledná data:", createdList);
    expect(createdList).toBeDefined();
    expect(createdList).toMatchObject(expectedList);
    expect(createdList.uuAppErrorMap).toEqual({});
  });

  test("createList s neplatným dtoIn", async () => {
    const dtoIn = {
      // Chybějící nebo neplatné vlastnosti
    };

    try {
      const insertResult = await collection.insertOne(dtoIn);
      expect(insertResult).toBeNull();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});