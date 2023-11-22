"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ShoppingListMongo extends UuObjectDao {
  async createSchema() {}
  async create(list) {
    return super.insertOne(list);
  }
}

module.exports = ShoppingListMongo;