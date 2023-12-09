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

test("createList", async () => {
  await TestHelper.login("ExecutivesUser");

  const dtoIn = {
    listName: "Nový nákupní seznam", 
  };

  // Spustit příkaz createList s pomocí TestHelper
  const result = await TestHelper.executePostCommand("shoppingListSumm/givenList/createList", dtoIn);
  console.log(result)
  
  expect(result.data).toBeDefined();
});

test("createList - Readers (očekávaný error)", async () => {
  await TestHelper.login("ReadersUser");

  const dtoIn = {
    listName: "Nový nákupní seznam pro členy", 
  };

  try {
    await TestHelper.executePostCommand("shoppingListSumm/givenList/createList", dtoIn);
    fail("Očekávaný error, ale příkaz byl úspěšný.");
  } catch (error) {
    expect(error.code).toEqual("uu-appg01/authorization/accessDenied");
    expect(error.status).toEqual(403);
  }
});
  
test("createList s neplatným dtoIn", async () => {
  await TestHelper.login("ExecutivesUser");

  const dtoIn = {
    listName: ""
  };

  // Spustit příkaz createList s pomocí TestHelper a neplatným dtoIn
  try {
    await TestHelper.executePostCommand("shoppingListSumm/givenList/createList", dtoIn);
    fail("Příkaz nevyvolal chybu pro neplatný dtoIn.");
  } catch (error) {
    
    expect(error.code).toEqual("shopping-lister-main/shoppingListSumm/givenList/create/invalidDtoIn");
    expect(error.status).toEqual(400);
  }
});