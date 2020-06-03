module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const NodeSchema = new Schema({
    type: String,
    displayName: String,
    parentId: String,
    childrenId: String,
    index: Number,
    styleProps: Mixed,
    settingProps: Mixed,
    eventProps: Mixed,
  });

  const EventSchema = new Schema(
    {
      eventID: ObjectId,
      eventName: String,
      createdBy: String,
      updatedBy: String,
      belongTo: String,
      isPublished: Boolean,
      createdAt: Date,
      updatedAt: Date,
      isDeleted: Boolean,
      children: [NodeSchema],
    },
    { timestamps: true }
  );
  return mongoose.model("Event", EventSchema, "event");
};
