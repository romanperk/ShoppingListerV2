import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// NOTE During frontend development it's possible to redirect uuApp command calls elsewhere, e.g. to production/staging
// backend, by configuring it in *-hi/env/development.json:
//   "uu5Environment": {
//     "callsBaseUri": "https://uuapp-dev.plus4u.net/vnd-app/awid"
//   }

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  ShoppingList: {
    list(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingListSumm/list");
      return Calls.call("get", commandUri, dtoIn);
    },

    getList(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingListSumm/givenList/get");
      return Calls.call("get", commandUri, dtoIn);
    },

    createList(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingListSumm/givenList/createList");
      return Calls.call("post", commandUri, dtoIn);
    },

    deleteList(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingListSumm/givenList/delete");
      return Calls.call("delete", commandUri, dtoIn);
    },

    updateListName(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingListSumm/givenList/name/update");
      return Calls.call("put", commandUri, dtoIn);
    },

    archiveList(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingListSumm/givenList/archived/update");
      return Calls.call("put", commandUri, dtoIn);
    },

    createItem(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingListSumm/givenList/item/create");
      return Calls.call("post", commandUri, dtoIn);
    },

    deleteItem(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingListSumm/givenList/item/delete");
      return Calls.call("delete", commandUri, dtoIn);
    },

    resolveItem(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingListSumm/givenList/item/resolved/update");
      return Calls.call("put", commandUri, dtoIn);
    },

    createAuthorizedUser(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingListSumm/givenList/authorizedUsers/create");
      return Calls.call("post", commandUri, dtoIn);
    },

    deleteAuthorizedUser(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingListSumm/givenList/authorizedUsers/delete");
      return Calls.call("delete", commandUri, dtoIn);
    },
  },

  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
