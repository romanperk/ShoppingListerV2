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
    listName: "Test List",
  };
  const createdListResult = await TestHelper.executePostCommand("shoppingListSumm/givenList/createList", dtoInCreateList);
  firstListId = createdListResult.data.id;
  console.log(firstListId); 
});

afterAll(async () => {
  await TestHelper.teardown();
});

test("změna názvu nákupního seznamu", async () => {
    await TestHelper.login("ExecutivesUser");
  
    // Vytvoření nového NS pro pozdější změnu názvu
    const createListDto = {
      listName: "Original List Name",
    };
    const createListResult = await TestHelper.executePostCommand("shoppingListSumm/givenList/createList", createListDto);
    console.log("Nákupní seznam před změnou:", createListResult);
    
    const newListId = createListResult.data.id;
    console.log("ID nového seznamu:", newListId);

    // Provedení příkazu pro změnu názvu NS
    const newName = "Updated List Name";
    const dtoIn = {
      listId: newListId,
      newName: newName,
    };
    console.log("dtoIn:", dtoIn);

    const changeNameResult = await TestHelper.executePostCommand("shoppingListSumm/givenList/name/update", dtoIn);
    console.log("Výsledek změněného seznamu:", changeNameResult);
    
    expect(changeNameResult.data.uuAppErrorMap).toEqual({});
    expect(changeNameResult.data.list.name).toEqual(newName);
  });
  
test("změna názvu nákupního seznamu s neexistujícím ID", async () => {
  await TestHelper.login("ExecutivesUser");

  // Neplatné/neexistující ID
  const invalidListId = '123456789';

  // Provedení příkazu pro změnu názvu NS s neplatným ID
  const newName = "Updated List Name";
  const dtoIn = {
    listId: invalidListId,
    newName: newName,
  };
  console.log("dtoIn:", dtoIn);

  try {
    await TestHelper.executePostCommand("shoppingListSumm/givenList/name/update", dtoIn);

    throw new Error("Očekáván error kvůli neexistujícímu ID.");
  } catch (error) {
    expect(error.status).toEqual(400); // Expected HTTP status code for invalid request
  }
});

test("změna názvu nákupního seznamu s nevalidním dtoIn", async () => {
  await TestHelper.login("ExecutivesUser");

  // Definice nevalidního dtoIn
  const invalidDtoIn = {
    // Chybějící nebo neplatné vlastnosti
  };

  try {
    // Pokus o změnu NS s neplatným dtoIn
    await TestHelper.executePostCommand("shoppingListSumm/givenList/name/update", invalidDtoIn);

    // Pokud nedošlo k žádné chybě, neproveďte test
    throw new Error("Očekáván error kvůli nevalidnímu dtoIn.");
  } catch (error) {
    // Kontrola, zda chyba zaznamenala, že dtoIn je neplatný
    expect(error.status).toEqual(400);
  }
});
