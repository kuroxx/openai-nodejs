import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import OpenAI from 'openai';

config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// API endpoint to handle chat messages
app.post('/api/chat', async (req, res) => {
    const userInput = req.body.message;
    console.log('Received userInput:', userInput);

    setTimeout(async () => {
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                  {
                    "role": "user",
                    "content": userInput,
                  }
                ],
                temperature: 0.8,
                max_tokens: 64,
                top_p: 1,
              });
              
              console.log("RES" + JSON.stringify(response));
              const aiResponse = response.choices[0].message.content.trim();

            res.json({ success: true, message: aiResponse });
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            res.status(500).json({ success: false, message: 'Error processing the request.' });
        }
    }, 2000); // 2 sec
  });
  
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
