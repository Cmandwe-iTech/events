const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
});

const EventModel = mongoose.model("events", EventSchema);
module.exports = EventModel;
