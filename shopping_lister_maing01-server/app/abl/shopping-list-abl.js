"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { v4: uuidv4 } = require("uuid");
const Errors = require("../api/errors/shopping-list-error.js");
const Warnings = require("../api/warnings/shopping-list-warning.js");

class ShoppingListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("shopping-list");
  }

  async list(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    // Validace dtoIn
    const validationResult = this.validator.validate("shoppingListsListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CreateList.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    // Získání uuIdentity
    const uuIdentity = session.getIdentity().getUuIdentity();
    const uuIdentityName = session.getIdentity().getName();

    // Získání všech NS
    const allLists = await this.dao.list(awid);

    // Filtrování seznamů, kde je uživatel autorizovaný
    const authorizedLists = allLists.itemList.filter((list) =>
      list.authorizedUsers.some((user) => user.userID === uuIdentity)
    );

    // Kontrola, jestli nejsou NS, kde uživatel není autorizovaný ani u jednoho
    if (authorizedLists.length === 0) {
      // Řešení, když uživatel není autorizovaný ani u jednoho NS
      throw new Errors.List.UserNotAuthorized({ uuAppErrorMap });
    }

    const dtoOut = { list: authorizedLists, awid, uuIdentity, uuIdentityName, uuAppErrorMap };
    return dtoOut;
  }

  async getList(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // Validace dtoIn
    const validationResult = this.validator.validate("shoppingListGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CreateList.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    // Nastavení viditelnosti
    const visibility = authorizationResult.getAuthorizedProfiles().includes("Executives");
    const uuIdentity = session.getIdentity().getUuIdentity();
    const uuIdentityName = session.getIdentity().getName();

    let list = await this.dao.get(dtoIn.id);

    // Kontrola, jestli je uživatel autorizovaný si NS zobrazit
    let isAuthorized = list.authorizedUsers.some((user) => user.userID === uuIdentity);
    if (!isAuthorized) {
      // Přidání chyby autorizace do uuAppErrorMap
      throw new Errors.List.UserNotAuthorized({ uuAppErrorMap });
    }

    const uuObject = {
      list,
      awid,
      visibility,
      uuIdentity,
      uuIdentityName,
    };
    return { uuObject, uuAppErrorMap };
  }

  async createList(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // Validace dtoIn
    const validationResult = this.validator.validate("shoppingListCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CreateList.UnsupportedKeys.code,
      Errors.CreateList.InvalidDtoIn
    );

    // Nastavit viditelnost
    const visibility = authorizationResult.getAuthorizedProfiles().includes("Executives");

    // Získání uuIdentity
    const uuIdentity = session.getIdentity().getUuIdentity();
    const uuIdentityName = session.getIdentity().getName();
    const now = new Date();
    
    // Uložit NS do uuObjectStore
    const uuObject = {
      name: dtoIn.listName, // název seznamu
      ownerId: uuIdentity, // id vlastníka
      awid: awid, // appWorkspaceId - unikátní kód nastavený externě
      archived: false, // značí, jestli je NS archivovaný či ne
      sys: {
        cts: now, // timestamp vytvoření
        mts: now, // timestamp modifikace
        rev: 0, // revizní číslo
      },
      items: [
        // pole položek v NS
      ],
      authorizedUsers: [{ userID: uuIdentity }],
      awid,
      visibility,
      uuIdentity,
      uuIdentityName,
    };
    const list = await this.dao.create(uuObject);

    // Připravit a vrátit dtoOut
    const dtoOut = { ...list, uuAppErrorMap };
    return dtoOut;
  }

  async deleteList(dtoIn, session) {
    let uuAppErrorMap = {};

    // Validace dtoIn
    const validationResult = this.validator.validate("shoppingListDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CreateList.UnsupportedKeys.code,
      Errors.DeleteList.InvalidDtoIn
    );

    const uuIdentity = session.getIdentity().getUuIdentity();

    let listCopy = await this.dao.get(dtoIn.listId);
    console.log(listCopy);
    if (!listCopy) {
      throw new Errors.DeleteList.ListDoesNotExist({ uuAppErrorMap });
    }

    // Kontrola, jestli je uživatel autorizovaný si NS zobrazit
    let isAuthorized = listCopy.ownerId === uuIdentity;
    if (!isAuthorized) {
      // Přidání chyby autorizace do uuAppErrorMap
      throw new Errors.DeleteList.UserNotAuthorized({ uuAppErrorMap });
    }

    const list = await this.dao.delete(dtoIn.listId);

    // Připravit a vrátit dtoOut
    const dtoOut = { list, uuAppErrorMap };
    return dtoOut;
  }

  async updateListName(dtoIn, session) {
    let uuAppErrorMap = {};

    // Validace dtoIn
    const validationResult = this.validator.validate("shoppingListUpdateNameDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CreateList.UnsupportedKeys.code,
      Errors.CreateList.InvalidDtoIn
    );

    // Nastavit viditelnost
    const uuIdentity = session.getIdentity().getUuIdentity();

    let list = await this.dao.get(dtoIn.listId);

    // Kontrola, jestli je uživatel autorizovaný si NS zobrazit
    let isAuthorized = list.ownerId === uuIdentity;
    if (!isAuthorized) {
      // Přidání chyby autorizace do uuAppErrorMap
      throw new Errors.UpdateListName.UserNotAuthorized({ uuAppErrorMap });
    }
    // Úprava názvu NS
    list.name = dtoIn.newName;
    const now = new Date();
    list.sys.mts = now; // Úprava timestamp modifikace

    // Uložit NS zpět do databáze
    let updatedList = await this.dao.update(list);

    return { list: updatedList, uuAppErrorMap };
  }

  async archiveList(dtoIn, session) {
    let uuAppErrorMap = {};

    // Validace dtoIn
    const validationResult = this.validator.validate("shoppingListArchiveDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CreateList.UnsupportedKeys.code,
      Errors.ArchiveList.InvalidDtoIn
    );

    // Nastavit viditelnost
    const uuIdentity = session.getIdentity().getUuIdentity();

    let list = await this.dao.get(dtoIn.listId);

    // Kontrola, jestli je uživatel autorizovaný si NS zobrazit
    let isAuthorized = list.ownerId === uuIdentity;
    if (!isAuthorized) {
      // Přidání chyby autorizace do uuAppErrorMap
      throw new Errors.ArchiveList.UserNotAuthorized({ uuAppErrorMap });
    }
    // Úprava názvu NS
    list.archived = true;
    const now = new Date();
    list.sys.mts = now; // Úprava timestamp modifikace

    // Uložit NS zpět do databáze
    let updatedList = await this.dao.update(list);

    return { list: updatedList, uuAppErrorMap };
  }

  async createItem(dtoIn, session) {
    let uuAppErrorMap = {};

    // Validace dtoIn
    const validationResult = this.validator.validate("shoppingListItemCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CreateList.UnsupportedKeys.code,
      Errors.CreateItem.InvalidDtoIn
    );

    // Nastavit viditelnost
    const uuIdentity = session.getIdentity().getUuIdentity();

    let list = await this.dao.get(dtoIn.listId);

    // Kontrola, jestli je uživatel autorizovaný si NS zobrazit
    let isAuthorized = list.authorizedUsers.some((user) => user.userID === uuIdentity);
    if (!isAuthorized) {
      // Přidání chyby autorizace do uuAppErrorMap
      throw new Errors.CreateItem.UserNotAuthorized({ uuAppErrorMap });
    }
    list.items.push({
      id: uuidv4(),
      itemName: dtoIn.itemName,
      resolved: false,
    });

    // Uložit NS zpět do databáze
    let updatedList = await this.dao.update(list);

    return { list: updatedList, uuAppErrorMap };
  }

  async deleteItem(dtoIn, session) {
    let uuAppErrorMap = {};

    // Validace dtoIn
    const validationResult = this.validator.validate("shoppingListItemDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CreateList.UnsupportedKeys.code,
      Errors.DeleteItem.InvalidDtoIn
    );

    // Nastavit viditelnost
    const uuIdentity = session.getIdentity().getUuIdentity();

    let list = await this.dao.get(dtoIn.listId);

    // Kontrola, jestli je uživatel autorizovaný si NS zobrazit
    let isAuthorized = list.authorizedUsers.some((user) => user.userID === uuIdentity);
    if (!isAuthorized) {
      // Přidání chyby autorizace do uuAppErrorMap
      throw new Errors.DeleteItem.UserNotAuthorized({ uuAppErrorMap });
    }

    list.items = list.items.filter((item) => item.id !== dtoIn.itemId);
    let updatedList = await this.dao.update(list);

    return { list: updatedList, uuAppErrorMap };
  }

  async resolveItem(dtoIn, session) {
    let uuAppErrorMap = {};

    // Validace dtoIn
    const validationResult = this.validator.validate("shoppingListItemResolveDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CreateList.UnsupportedKeys.code,
      Errors.ResolveItem.InvalidDtoIn
    );

    const uuIdentity = session.getIdentity().getUuIdentity();

    let list = await this.dao.get(dtoIn.listId);

    // Kontrola, jestli je uživatel autorizovaný si NS zobrazit
    let isAuthorized = list.authorizedUsers.some((user) => user.userID === uuIdentity);
    if (!isAuthorized) {
      // Přidání chyby autorizace do uuAppErrorMap
      throw new Errors.ResolveItem.UserNotAuthorized({ uuAppErrorMap });
    }

    // Najít položku a nastavit ji jako "vyřešenou"
    let item = list.items.find((item) => item.id === dtoIn.itemId);
    if (item) {
      item.resolved = true;
    } else {
      // Řešení, pokud položka není nalezena v NS
      throw new Errors.ResolveItem.ShoppingListDaoResolveItemFailed({ uuAppErrorMap });
    }

    let updatedList = await this.dao.update(list);

    return { list: updatedList, uuAppErrorMap };
  }

  async createAuthorizedUser(dtoIn, session) {
    let uuAppErrorMap = {};

    // Validace dtoIn
    const validationResult = this.validator.validate("authorizedUserCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CreateList.UnsupportedKeys.code,
      Errors.CreateAuthorizedUser.InvalidDtoIn
    );

    const uuIdentity = session.getIdentity().getUuIdentity();

    let list = await this.dao.get(dtoIn.listId);

    // Kontrola, jestli je uživatel autorizován na upravení NS
    let isOwner = list.ownerId === uuIdentity;
    if (!isOwner) {
      throw new Errors.CreateAuthorizedUser.UserNotAuthorized({ uuAppErrorMap });
    }

    //Přidání nového uživatele
    list.authorizedUsers.push({ userID: dtoIn.userId });

    let updatedList = await this.dao.update(list);

    return { list: updatedList, uuAppErrorMap };
  }

  async deleteAuthorizedUser(dtoIn, session) {
    let uuAppErrorMap = {};

    // Validace dtoIn
    const validationResult = this.validator.validate("authorizedUserDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CreateList.UnsupportedKeys.code,
      Errors.DeleteAuthorizedUser.InvalidDtoIn
    );

    const uuIdentity = session.getIdentity().getUuIdentity();

    let list = await this.dao.get(dtoIn.listId);

    // Kontrola, jestli je uživatel vlastníkem NS
    let isOwner = list.ownerId === uuIdentity;
    // Kontrola, jestli je autorizovaným uživatel v seznamu uživatelů
    let isAuthorizedUser = list.authorizedUsers.some((user) => user.userID === uuIdentity);

    // Řešení, pokud uživatel není ani vlastníkem ani autorizovaným uživatelem
    if (!isOwner && !isAuthorizedUser) {
      throw new Errors.DeleteAuthorizedUser.UserNotAuthorized({ uuAppErrorMap });
    }

    // Uživatel nemá práva a přesto se pokusí vymazat někoho jiného, než je on sám
    if (!isOwner && isAuthorizedUser && uuIdentity !== dtoIn.userId) {
      throw new Errors.DeleteAuthorizedUser.UserNotAuthorized({ uuAppErrorMap });
    }

    // Odebrání člena NS
    list.authorizedUsers = list.authorizedUsers.filter((user) => user.userID !== dtoIn.userId);

    let updatedList = await this.dao.update(list);

    return { list: updatedList, uuAppErrorMap };
  }
}

module.exports = new ShoppingListAbl();