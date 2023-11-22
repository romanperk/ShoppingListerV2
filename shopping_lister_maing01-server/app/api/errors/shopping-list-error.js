"use strict";
const ShoppingListMainUseCaseError = require("./shopping-list-main-use-case-error");

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
};

const ListItem = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/singleList/:id/item/list/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListItem.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoListItemFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListItem.UC_CODE}shoppingListDaoListItemFailed`;
      this.message = "Zobrazení položek nákupního seznamu selhalo.";
    }
  },
};

const CreateList = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/singleList/create/`,

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
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/singleList/:id/delete/`,

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
};

const UpdateListName = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/singleList/:id/name/update/`,

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
};

const ArchiveList = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/singleList/:id/archived/update/`,

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
};

const ListArchived = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/archived/list/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListArchived.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoListArchivedFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListArchived.UC_CODE}shoppingListDaoListArchivedFailed`;
      this.message = "Zobrazení přehledu archivovaných nákupních seznamů selhalo.";
    }
  },
};

const CreateItem = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/singleList/:id/item/create/`,

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
};

const DeleteItem = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/singleList/:id/item/:id/delete/`,

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
};

const ResolveItem = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/singleList/:id/item/:id/resolved/update/`,

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
};

const ListResolvedItems = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/singleList/:id/resolved/list/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListResolvedItems.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoListResolvedItemsFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListResolvedItems.UC_CODE}shoppingListDaoListResolvedItemsFailed`;
      this.message = "Zobrazení vyřešených položek v nákupním seznamu selhalo.";
    }
  },
};

const ListAuthorizedUsers = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/singleList/:id/authorizedUsers/list/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListAuthorizedUsers.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoListAuthorizedUsersFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListAuthorizedUsers.UC_CODE}shoppingListDaoListAuthorizedUsersFailed`;
      this.message = "Zobrazení uživatelů v nákupním seznamu selhalo.";
    }
  },
};

const CreateAuthorizedUser = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/singleList/:id/authorizedUsers/create/`,

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
};

const DeleteAuthorizedUser = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/singleList/:id/authorizedUsers/:id/delete/`,

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
};

const DeleteSelfFromAuthorizedUsers = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/singleList/:id/authorizedUsers/:myID/delete/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteSelfFromAuthorizedUsers.UC_CODE}invalidDtoIn`;
      this.message = "Vstupní data nejsou validní.";
    }
  },

  ShoppingListDaoDeleteSelfFromAuthorizedUsersFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteSelfFromAuthorizedUsers.UC_CODE}shoppingListDaoDeleteSelfFromAuthorizedUsersFailed`;
      this.message = "Odebrání sebe sama ze seznamu uživatelů selhalo.";
    }
  },
};

module.exports = {
  List,
  ListItem,
  CreateList,
  DeleteList,
  UpdateListName,
  ArchiveList,
  ListArchived,
  CreateItem,
  DeleteItem,
  ResolveItem,
  ListResolvedItems,
  ListAuthorizedUsers,
  CreateAuthorizedUser,
  DeleteAuthorizedUser,
  DeleteSelfFromAuthorizedUsers,
};