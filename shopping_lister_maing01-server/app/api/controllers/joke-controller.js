"use strict";

const JokeAbl = require("../../abl/joke-abl.js");

class JokeController {
  helloWorld() {
    return {
      text: "hello world",
      uuAppErrorMap: {},
    };
  }

  create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    let authorizationResult = ucEnv.getAuthorizationResult();
    return JokeAbl.create(awid, dtoIn, session, authorizationResult);
  }
}

module.exports = new JokeController();