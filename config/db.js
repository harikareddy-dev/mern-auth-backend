const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://test:123456@cluster0.xlfrv74.mongodb.net/myapp?retryWrites=true&w=majority"
    );

    console.log("MongoDB Atlas Connected ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1);
  }
};

module.exports = connectDB;