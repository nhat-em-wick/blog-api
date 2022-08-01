const mongoose = require('mongoose') ;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected DB Successfully")
  } catch (error) {
    console.error(`Error connect DB ::: ${error}`)
    process.exit(1)
  }
}

connectDB()