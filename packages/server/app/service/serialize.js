const Service = require("egg").Service;

class SerializeService extends Service {
  async serialize(eventId) {
    console.log("eventId: ", eventId);
    return null;
  }
}

module.exports = SerializeService;
