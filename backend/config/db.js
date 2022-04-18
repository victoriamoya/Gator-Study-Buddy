const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI)

    console.log(`Express server connected to MongoDB: ${db.connection.host}`.green.italic.bold)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
