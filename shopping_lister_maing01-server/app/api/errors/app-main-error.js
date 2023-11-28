"use strict";
const AppMainUseCaseError = require("./app-main-use-case-error.js");

const Init = {
  UC_CODE: `${AppMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends AppMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn není validní.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends AppMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Vytvoření schématu podle Dao createSchema selhalo.";
    }
  },

  SetProfileFailed: class extends AppMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Nastavení profilu selhalo.";
    }
  },

  CreateAwscFailed: class extends AppMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Vytvoření uuAwsc selhalo.";
    }
  },
};

module.exports = {
  Init,
};
