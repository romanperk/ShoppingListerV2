"use strict";
const ShoppingListMainUseCaseError = require("./app-main-use-case-error.js");

const List = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingListSumm/list/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoListFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}shoppingListDaoListFailed`;
      this.message = "Zobrazení přehledu nákupních seznamů selhalo.";
    }
  },
  UserNotAuthorized: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}userNotAuthorized`;
      this.message = "Uživatel není autorizovaný.";
    }
  },
};

const CreateList = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingListSumm/givenList/create/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateList.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoCreateListFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateList.UC_CODE}shoppingListDaoCreateListFailed`;
      this.message = "Vytvoření nákupního seznamu selhalo.";
    }
  },
};

const DeleteList = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingListSumm/givenList/delete/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteList.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoDeleteFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteList.UC_CODE}shoppingListDaoDeleteFailed`;
      this.message = "Smazání nákupního seznamu selhalo.";
    }
  },

  UserNotAuthorized: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}userNotAuthorized`;
      this.message = "Uživatel není autorizovaný.";
    }
  },

  ListDoesNotExist: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteList.UC_CODE}listDoesNotExist`;
      this.message = "Zvolený nákupní seznam ke smazání neexistuje.";
    }
  },
};

const UpdateListName = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingListSumm/givenList/name/update/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateListName.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoUpdateNameFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateListName.UC_CODE}shoppingListDaoUpdateNameFailed`;
      this.message = "Upravení názbu nákupního seznamu selhalo.";
    }
  },

  UserNotAuthorized: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}userNotAuthorized`;
      this.message = "Uživatel není autorizovaný.";
    }
  },
};

const ArchiveList = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingListSumm/givenList/archived/update/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ArchiveList.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoArchiveFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ArchiveList.UC_CODE}shoppingListDaoArchiveFailed`;
      this.message = "Archivování nákupního seznamu selhalo.";
    }
  },

  UserNotAuthorized: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}userNotAuthorized`;
      this.message = "Uživatel není autorizovaný.";
    }
  },
};

const CreateItem = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingListSumm/givenList/item/create/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateItem.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoCreateItemFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateItem.UC_CODE}shoppingListDaoCreateItemFailed`;
      this.message = "Vytvoření položky v nákupním seznamu selhalo.";
    }
  },

  UserNotAuthorized: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}userNotAuthorized`;
      this.message = "Uživatel není autorizovaný.";
    }
  },
};

const DeleteItem = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingListSumm/givenList/item/delete/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteItem.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoDeleteItemFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteItem.UC_CODE}shoppingListDaoDeleteItemFailed`;
      this.message = "Smazání položky v nákupním seznamu selhalo.";
    }
  },

  UserNotAuthorized: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}userNotAuthorized`;
      this.message = "Uživatel není autorizovaný.";
    }
  },
};

const ResolveItem = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingListSumm/givenList/item/resolved/update/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ResolveItem.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoResolveItemFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ResolveItem.UC_CODE}shoppingListDaoResolveItemFailed`;
      this.message = "Vyřešení položky v nákupním seznamu selhalo.";
    }
  },

  UserNotAuthorized: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}userNotAuthorized`;
      this.message = "Uživatel není autorizovaný.";
    }
  },
};

const CreateAuthorizedUser = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingListSumm/givenList/authorizedUsers/create/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateAuthorizedUser.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoCreateAuthorizedUserFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateAuthorizedUser.UC_CODE}shoppingListDaoCreateAuthorizedUserFailed`;
      this.message = "Přidání člena do seznamu uživatelů selhalo.";
    }
  },

  UserNotAuthorized: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}userNotAuthorized`;
      this.message = "Uživatel není autorizovaný.";
    }
  },
};

const DeleteAuthorizedUser = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingListSumm/givenList/authorizedUsers/delete/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteAuthorizedUser.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoDeleteAuthorizedUserFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteAuthorizedUser.UC_CODE}shoppingListDaoDeleteAuthorizedUserFailed`;
      this.message = "Odebrání člena ze seznamu uživatelů selhalo.";
    }
  },

  UserNotAuthorized: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}userNotAuthorized`;
      this.message = "Uživatel není autorizovaný.";
    }
  },
};

module.exports = {
  List,
  CreateList,
  DeleteList,
  UpdateListName,
  ArchiveList,
  CreateItem,
  DeleteItem,
  ResolveItem,
  CreateAuthorizedUser,
  DeleteAuthorizedUser,
};