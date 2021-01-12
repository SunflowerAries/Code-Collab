const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  docName: { type: String, required: true },
  creator: { type: String, required: true },
  content: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
});

module.exports = mongoose.model("Doc", schema);
