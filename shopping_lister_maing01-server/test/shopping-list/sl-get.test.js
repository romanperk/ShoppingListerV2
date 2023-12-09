const { TestHelper } = require("uu_appg01_server-test");

let firstListId;

beforeAll(async () => {
  // Spustit aplikaci a databázi
  await TestHelper.setup();
  // Zavolat sys/uuSubAppInstance/init endpoint
  await TestHelper.initUuSubAppInstance();
  // Zavolat sys/uuAppWorkspace/create endpoint
  await TestHelper.createUuAppWorkspace();
  // Zavolat sys/uuAppWorkspace/init endpoint
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });

  await TestHelper.login("ExecutivesUser");
  const dtoInCreateList = {
    listName: "Test nákupní seznam",
  };
  const createdListResult = await TestHelper.executePostCommand("shoppingListSumm/givenList/createList", dtoInCreateList);
  firstListId = createdListResult.data.id; 
  console.log(firstListId);
});

afterAll(async () => {
  await TestHelper.teardown();
});

test("getSingleShoppingList", async () => {
  await TestHelper.login("ExecutivesUser");

  try {
    // Příkaz na vypsání všech NS
    const listResponse = await TestHelper.executeGetCommand("shoppingListSumm/list", {});
    console.log("List of Shopping Lists:", listResponse.data.list);

    //  ID prvního NS z odpovědi
    const firstListId = listResponse.data.list[0]?.id;
    console.log("First List ID:", firstListId);
    
    if (firstListId) {
        // DtoIn pro načtení jednoho NS
        const dtoIn = { id: firstListId };
      console.log("DtoIn:", dtoIn);

      // Příkaz pro získání jednoho NS
      const result = await TestHelper.executeGetCommand("shoppingListSumm/givenList/get", dtoIn);
      console.log("Výsledek:", result);
      console.log("Daný nákupní seznam:", result.data);

      const expectedShoppingList = {
        uuObject: {
          list: {
            name: 'Test List',
            ownerId: expect.any(String),
            awid: expect.any(String),
            archived: false,
            sys: expect.any(Object),
            items: expect.any(Array),
            authorizedUsers: expect.any(Array),
            visibility: true,
            uuIdentity: expect.any(String),
            uuIdentityName: expect.any(String),
            id: expect.any(String)
          },
          awid: expect.any(String),
          visibility: true,
          uuIdentity: expect.any(String),
          uuIdentityName: expect.any(String)
        },
        uuAppErrorMap: {}
      };
      
       expect(result.data).toEqual(expect.objectContaining(expectedShoppingList));
    } else {
      console.error("Není k dispozici žádné platné ID nákupního seznamu.");
    }
  } catch (error) {
    console.error("Chyba při načítání jednoho nákupního seznamu:", error);
  }
});

test("getSingleShoppingList s neexistujícím ID", async () => {
  await TestHelper.login("ExecutivesUser");

  // Neexistující ID
  const dtoIn = { id: 1234 };

  try {
    // Provedení příkazu získání NS podle neexistujícího ID
    await TestHelper.executeGetCommand("shoppingListSumm/givenList/get", dtoIn);
  } catch (error) {
    
    expect(error.status).toEqual(400);
    
  }
});

test("Neautorizovaný uživatel (Readers) nemůže získat přístup k nákupnímu seznamu", async () => {
  try {
    // Nastavení se jako ReadersUser
    await TestHelper.login("ReadersUser");

    const unauthorizedListId = firstListId;
    const dtoIn = { id: unauthorizedListId };

    await TestHelper.executeGetCommand("shoppingListSumm/givenList/get", dtoIn);

    throw new Error("Unauthorized access should have been denied.");
  } catch (error) {
    
    expect(error.status).toEqual(403);
    expect(error.code).toEqual("uu-appg01/authorization/accessDenied"); 
  }
});
  
  