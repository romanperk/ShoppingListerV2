"use strict";
const JokesMainUseCaseError = require("./unicorn-main-use-case-error");

const Create = {
  UC_CODE: `${JokesMainUseCaseError.ERROR_PREFIX}joke/create/`,

  InvalidDtoIn: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  TextContainsFishyWords: class extends JokesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}textContainsFishyWords`;
      this.message = "The text of the joke contains fishy words.";
    }
  },
};

module.exports = {
  Create,
};