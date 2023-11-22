"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

const Errors = require("../api/errors/joke-error.js");
const Warnings = require("../api/warnings/joke-warning.js");

const FISHY_WORDS = ["barracuda", "broccoli", "Topolánek"];

class JokeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("joke");
  }

  async create(awid, dtoIn, session, authorizationResult) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("jokeCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // check for fishy words
    FISHY_WORDS.forEach((word) => {
      if (dtoIn.text.includes(word)) {
        throw new Errors.Create.TextContainsFishyWords({ uuAppErrorMap }, { text: dtoIn.text, fishyWord: word });
      }
    });
    const EXECUTIVES_PROFILE = "Executives";
    // set visibility
    const visibility = authorizationResult.getAuthorizedProfiles().includes(EXECUTIVES_PROFILE);

    // get uuIdentity information
    const uuIdentity = session.getIdentity().getUuIdentity();
    const uuIdentityName = session.getIdentity().getName();

    // save joke to uuObjectStore
    const uuObject = {
      ...dtoIn,
      awid,
      visibility,
      uuIdentity,
      uuIdentityName,
    };
    const joke = await this.dao.create(uuObject);

    // prepare and return dtoOut
    const dtoOut = { ...joke, uuAppErrorMap };
    return dtoOut;
  }
}

module.exports = new JokeAbl();