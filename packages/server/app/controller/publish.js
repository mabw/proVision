const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = "Hello world";
  }

  async destroy(id) {}

  async update(id) {}

  async create() {}

  async edit(id) {}
  async show(id) {}
}

module.exports = HomeController;
