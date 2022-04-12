const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    console.log(`Connected to MongoDB: ${conn.connection.host}`.green.italic.bold)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
