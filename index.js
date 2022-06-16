import express from "express";
import bodyParser from "body-parser";
import usersRoutes from './routes/users.js';
// import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5000;



app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
    console.log('[TEST]!');
    res.send('Hello From API')
});

app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));