const Errors = require("../errors/shopping-list-error.js");

const Warnings = {
  List: {
    UnsupportedKeys: {
      code: `${Errors.List.UC_CODE}unsupportedKeys`,
    },
  },
  CreateList: {
    UnsupportedKeys: {
      code: `${Errors.CreateList.UC_CODE}unsupportedKeys`,
    },
  },
  DeleteList: {
    UnsupportedKeys: {
      code: `${Errors.DeleteList.UC_CODE}unsupportedKeys`,
    },
  },
  UpdateListName: {
    UnsupportedKeys: {
      code: `${Errors.UpdateListName.UC_CODE}unsupportedKeys`,
    },
  },
  ArchiveList: {
    UnsupportedKeys: {
      code: `${Errors.ArchiveList.UC_CODE}unsupportedKeys`,
    },
  },
  CreateItem: {
    UnsupportedKeys: {
      code: `${Errors.CreateItem.UC_CODE}unsupportedKeys`,
    },
  },
  DeleteItem: {
    UnsupportedKeys: {
      code: `${Errors.DeleteItem.UC_CODE}unsupportedKeys`,
    },
  },
  ResolveItem: {
    UnsupportedKeys: {
      code: `${Errors.ResolveItem.UC_CODE}unsupportedKeys`,
    },
  },
  CreateAuthorizedUser: {
    UnsupportedKeys: {
      code: `${Errors.CreateAuthorizedUser.UC_CODE}unsupportedKeys`,
    },
  },
  DeleteAuthorizedUser: {
    UnsupportedKeys: {
      code: `${Errors.DeleteAuthorizedUser.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;