const mongoose = require('mongoose');

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resume_skill_gap_db';

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 8000,
    };
    cached.promise = mongoose.connect(connStr, opts).then((mongooseInstance) => {
      console.log(`✅ MongoDB Connected Successfully: ${mongooseInstance.connection.host} / DB: ${mongooseInstance.connection.name}`);
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
  }

  return cached.conn;
};

module.exports = connectDB;
