const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
