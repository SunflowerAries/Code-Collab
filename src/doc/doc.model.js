const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  url: { type: String, required: true },
  creator: { type: String, required: true },
  content: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

module.exports = mongoose.model("Doc", schema);
