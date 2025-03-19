const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/feedss', {
    useNewUrlParser: true,
       useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB", err));
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
