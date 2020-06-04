module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const NodeSchema = new Schema({
    type: String,
    displayName: String,
    parentId: String,
    childrenId: String,
    index: Number,
    styleProps: Schema.Types.Mixed,
    settingProps: Schema.Types.Mixed,
    eventProps: Schema.Types.Mixed,
  });

  const EventSchema = new Schema(
    {
      eventID: Schema.Types.ObjectId,
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
