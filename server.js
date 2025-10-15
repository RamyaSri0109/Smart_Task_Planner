const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get('/', (req, res) => {
  res.send('Smart Task Planner Backend is running!');
});

app.post('/generate-plan', async (req, res) => {
  const { goal } = req.body;

  try {
    const prompt = `
    Break down this goal into actionable tasks with timelines and dependencies:
    Goal: ${goal}
    Format response as:
    1. Task
    2. Timeline
    3. Dependency (if any)
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    const plan = response.choices[0].message.content;
    res.json({ plan });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate plan" });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
