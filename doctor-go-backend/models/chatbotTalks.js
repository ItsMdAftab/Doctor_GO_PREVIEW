const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatbotTalks = new Schema({
  messageSent: String,
  messageReceived: String,
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  nearestdoctor: String,
});

const ChatbotTalk = mongoose.model("chatbotTalks", chatbotTalks);
module.exports = ChatbotTalk;
