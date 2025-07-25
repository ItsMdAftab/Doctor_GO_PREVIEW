const connectDB = require("./config/db");
connectDB(); // connect to MongoDB

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ChatbotTalk = require("./models/chatbotTalks");
const predictConditionsAndSpecialist = require("./mlModel"); // Simple ML logic
// const talkToChatbot = require("./nlp/dialogflowClient"); // Optional: Dialogflow NLP

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/doctorGo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Main POST Route
app.post("/api/check", async (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms) {
    return res.status(400).json({ error: "Symptoms are required" });
  }

  // If using Dialogflow (optional):
  // const aiResponse = await talkToChatbot(symptoms);
  // const result = {
  //   conditions: [aiResponse.intent.displayName],
  //   specialist: [aiResponse.intent.displayName.includes("Skin") ? "Dermatologist" : "General Physician"]
  // };

  // If using ML logic:
  const result = predictConditionsAndSpecialist(symptoms);

  // ✅ Save to MongoDB
  try {
    const newChat = new ChatbotTalk({
      messageSent: symptoms,
      messageReceived: `${result.conditions.join(", ")} => ${result.specialist.join(", ")}`,
      date: new Date(),
      nearestdoctor: result.specialist[0],
    });

    await newChat.save();
  } catch (err) {
    console.error("❌ Failed to save chat to DB:", err);
  }

  res.json(result);
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
