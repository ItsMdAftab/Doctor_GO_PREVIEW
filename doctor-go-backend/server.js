// doctor-go-backend/server.js
require('dotenv').config(); // Must be first

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const diagnoseInAnyLanguage = require('./utils/diagnoseWithGPT');

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.post('/api/check', async (req, res) => {
  const { symptoms, language } = req.body; // ✅ include language
  try {
    const result = await diagnoseWithGPT(symptoms, language); // ✅ pass language to function
    res.json(result);
  } catch (error) {
    console.error("Diagnosis error:", error.message);
    res.status(500).json({ error: "Diagnosis failed" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`DoctorGo server running on port ${PORT}`));
