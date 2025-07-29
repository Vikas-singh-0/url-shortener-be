require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const limiter = require('./middleware/rate-limiter.middleware');
// const redis = require('./configs/redis');
const connectDb = require('./configs/db');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/url-shortner';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// middleware to handle CORS and JSON requests

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(limiter); // Apply globally
app.use(helmet());


// health check route

// Redis test
// app.get("/test-redis", async (req, res) => {
//   console.log(req.get("host"));
  
//   try {
//     await redis.set("message", "Hello Redis!");
//     const value = await redis.get("message");
//     res.send({ value });
//   } catch (err) {
//     res.status(500).send("Redis Error");
//   }
// });

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong!' });
});

app.use('/', require('./routes/url.routes'));
app.use('/auth', require('./routes/auth.routes'));

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("🛑 Gracefully shutting down");
  // await redis.quit();
  await mongoose.disconnect();
  process.exit(0);
});

// MongoDB connection
app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running on port ${PORT}`);
});