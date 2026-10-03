const mongoose = require('mongoose');

const connectDB = async () => {
  const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resume_skill_gap_db';
  console.log(`⏳ Connecting to MongoDB at ${connStr}...`);
  try {
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000,
      family: 4, // Force IPv4
    });
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}:${conn.connection.port} / Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log(`⚠️ Will retry connection in background...`);
  }
};

module.exports = connectDB;
