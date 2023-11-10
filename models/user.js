const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: {type: String,required: true,unique: true},
  password: { type: String},
  role: { type: String, enum: ["author", "admin"], default: "author" },
  status: { type: String, enum: ["EA", "V"], default: "EA" },
  publications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Publication" }],
});

module.exports = mongoose.model("User", userSchema);
