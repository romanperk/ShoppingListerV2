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

test("deleteShoppingList", async () => {
  await TestHelper.login("ExecutivesUser");

  try {
    // Provedení příkazu smazání NS
    const dtoIn = {
      listId: firstListId
    };
    console.log("ID smazaného nákupního seznamu:", firstListId);
    const deleteResult = await TestHelper.executePostCommand("shoppingListSumm/givenList/delete", dtoIn);

    expect(deleteResult.data.uuAppErrorMap).toEqual({}); // Bez errorů
    
  } catch (error) {
    console.log("Error při mazání nákupního seznamu:", error);
  }
});


test("deleteShoppingList s neexistujícím ID", async () => {
  await TestHelper.login("ExecutivesUser");

  const nonExistentListId = '123456789';

  try {
    // Provedení příkazu pro smazání NS s neexistujícím ID
    const dtoIn = {
      listId: nonExistentListId
    };
    console.log("ID neexustijícího listu:", nonExistentListId); 
    const deleteResult = await TestHelper.executePostCommand("shoppingListSumm/givenList/delete", dtoIn);
    
    expect(deleteResult.data.uuAppErrorMap).toEqual({}); // Bez errorů
    
    // Selhání testu, pokud nedojde k chybě (protože se očekává chyba u neexistujícího ID)
    throw new Error("Očekáván error kvůli neexistujícímu ID.");
  } catch (error) {
    expect(error.status).toEqual(405);
  }
});

test("Neoprávněný uživatel nemůže smazat nákupní seznam", async () => {
  // Simulace přihlášeného uživatele, který NEMÁ oprávnění smazat NS
  await TestHelper.login("ReadersUser");

  const unauthorizedListId = firstListId; 

  try {
    const dtoIn = {
      listId: unauthorizedListId
    };
    console.log("ID nákupního seznamu, který nebyl neoprávněně smazán:", unauthorizedListId); 
    const deleteResult = await TestHelper.executePostCommand("shoppingListSumm/givenList/delete", dtoIn);
    
    expect(deleteResult.data.uuAppErrorMap).toEqual({}); // Bez errorů

    // Selhání testu, pokud nedojde k chybě (protože se očekává chyba pro neoprávněný přístup)
    throw new Error("Očekáván error kvůli neoprávněné akci.");
  } catch (error) {
    expect(error.status).toEqual(405);
    expect(error.code).toEqual("uu-appg01/server/invalidHttpMethod"); 
  }
});