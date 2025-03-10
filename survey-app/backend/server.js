const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/hardware-survey', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Survey Schema
const surveySchema = new mongoose.Schema({
    customerName: String,
    email: String,
    feedback: String,
    rating: Number,
    suggestions: String,
});

const Survey = mongoose.model('Survey', surveySchema);

// Routes
app.post('/api/survey', async (req, res) => {
    const { customerName, email, feedback, rating, suggestions } = req.body;
    const newSurvey = new Survey({ customerName, email, feedback, rating, suggestions });
    await newSurvey.save();
    res.status(201).json({ message: 'Survey submitted successfully!' });
});

app.get('/api/surveys', async (req, res) => {
    const surveys = await Survey.find();
    res.json(surveys);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));