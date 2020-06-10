const fs = require("fs");
const path = require("path");

const Controller = require("egg").Controller;

class HomeController extends Controller {
  // Get the events list
  async index() {
    const result = await this.ctx.model.Event.find()
      .sort({ updatedAt: -1 })
      .select("eventID eventName createdBy createdAt");
    this.ctx.body = result;
  }

  // Delete the event
  async destroy() {}

  // Save the changes
  async update() {
    const { id } = this.ctx.params;
    const children = [];
    Object.entries(this.ctx.request.body).forEach((item) => {
      const node = item[1];
      node.id = item[0];
      children.push(node);
    });

    await this.ctx.model.Event.update({ _id: id }, { children });
    this.ctx.body = id;
  }

  // Serialize the Json
  async new() {
    const { id } = this.ctx.query;
    const result = await this.ctx.model.Event.findOne({ _id: id });
    const nodes = {};
    result.children.forEach((item) => {
      const nodeId = item.id;
      delete item.id;
      nodes[nodeId] = item;
    });
    let str = JSON.stringify({ nodes, eventName: [result.eventName] });
    fs.writeFile(
      path.join(__dirname, `../public/${result.eventName}.json`),
      str,
      (err) => {
        if (err) {
          console.log("err: ", err);
          return;
        }
      }
    );
    this.ctx.body = { message: "success" };
  }

  // Create a new event
  async create() {
    const { eventName } = this.ctx.request.body;
    if (eventName) {
      const result = await this.ctx.model.Event.create({
        eventName: eventName,
        createdBy: "Marvin",
        updatedBy: "Marvin",
        belongTo: "Imaginato",
        isPublished: false,
        isDeleted: false,
        children: [
          {
            id: "root",
            type: "Root",
            displayName: "root",
            parentId: "",
            childrenId: [],
            index: 0,
            styleProps: {},
            settingProps: {},
            eventProps: {},
          },
        ],
      });

      this.ctx.body = { id: result["_id"] };
    }
  }

  // Edit the event
  async edit() {
    const { id } = this.ctx.params;
    const result = await this.ctx.model.Event.findOne({ _id: id });
    const nodes = {};
    result.children.forEach((item) => {
      const nodeId = item.id;
      delete item.id;
      nodes[nodeId] = item;
    });
    this.ctx.body = { nodes, eventName: [result.eventName] };
  }

  // Preview the event
  async show() {
    const { id } = this.ctx.params;
    const result = await this.ctx.model.Event.findOne({ eventName: id });
    const nodes = {};
    result.children.forEach((item) => {
      const nodeId = item.id;
      delete item.id;
      nodes[nodeId] = item;
    });
    this.ctx.body = { nodes, eventName: [result.eventName] };
  }
}

module.exports = HomeController;
