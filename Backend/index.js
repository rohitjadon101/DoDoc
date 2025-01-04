const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const allRoutes = require('./routes/allRoutes');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}));
app.use('/api/documents', allRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));