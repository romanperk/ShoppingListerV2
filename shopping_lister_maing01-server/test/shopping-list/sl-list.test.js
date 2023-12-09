const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  // Spustit aplikaci a databázi
  await TestHelper.setup();
  // Zavolat sys/uuSubAppInstance/init endpoint
  await TestHelper.initUuSubAppInstance();
  // Zavolat sys/uuAppWorkspace/create endpoint
  await TestHelper.createUuAppWorkspace();
  // Zavolat sys/uuAppWorkspace/init endpoint
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });
});

afterEach(async () => {
  await TestHelper.teardown();
});

test("ShoppingListSumm list", async () => {
  await TestHelper.login("ExecutivesUser");

  const dtoInCreateList = {
    listName: "Test List",
  };

  await TestHelper.executePostCommand("shoppingListSumm/givenList/createList", dtoInCreateList);

  // Příkaz pro výpis všech NS
  const result = await TestHelper.executeGetCommand("shoppingListSumm/list", {});

  expect(result.data).toBeDefined();
});

test("Neoprávněný uživatel nemá přístup k nákupním seznamům", async () => {
  await TestHelper.login("ExecutivesUser");

  const dtoInCreateList = {
    listName: "Test List",
  };

  await TestHelper.executePostCommand("shoppingListSumm/givenList/createList", dtoInCreateList);

  // Přístup neoprávněného uživatele
  await TestHelper.login("ReadersUser");

  try {
    const result = await TestHelper.executeGetCommand("shoppingListSumm/list", {});
    expect(result.data).toEqual([]);
  } catch (error) {
    expect(error.status).toEqual(403);
    expect(error.code).toEqual("uu-appg01/authorization/accessDenied");
  }
});

test("Nejsou k dispozici žádné seznamy", async () => {
  await TestHelper.login("ExecutivesUser");

  try {
    // Příkaz pro výpis všech nákupních seznamů
    const result = await TestHelper.executeGetCommand("shoppingListSumm/list", {});
    console.log("Výsledek:", result);
    
    fail("Očekávaná chyba UserNotAuthorized, ale místo toho byly přijaty seznamy.");
  } catch (error) {
    expect(error.code).toEqual("shopping-lister-main/shoppingListSumm/list/userNotAuthorized");
    expect(error.message).toEqual("Uživatel není autorizovaný.");
    expect(error.status).toEqual(400); 
  }
});