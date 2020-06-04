const Controller = require("egg").Controller;

class HomeController extends Controller {
  // Get the events list
  async index() {
    const result = await this.ctx.model.Event.find().select(
      "eventID eventName createdBy createdAt"
    );
    this.ctx.body = result;
  }

  // Delete the event
  async destroy() {}

  // Save the changes
  async update() {}

  // Create a new event
  async new() {
    const { eventName } = this.ctx.request.query;
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

  // Serialize the Json
  async create() {}

  // Edit the event
  async edit() {
    const { id } = this.ctx.params;
    const result = await this.ctx.model.Event.findOne({ _id: id });
    this.ctx.body = { nodes: [result.children], eventName: [result.eventName] };
  }

  // Preview the event
  async show() {}
}

module.exports = HomeController;
