const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect((process.env.MONGO_URI || 'mongodb+srv://vikassingh892354:Govind123@cluster0.c518jpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), {
      useNewUrlParser: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with failure
  }
}

module.exports = connectDb;