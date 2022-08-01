const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: Number,
    default: 1
  }
}, {timestamps: true, collection: 'users'})

userSchema.pre('save', async function(next) {
  try{
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(this.password, salt)
    this.password = hashPass
    next()
  }catch(error){
    next(error)
  }
})



module.exports = mongoose.model('user', userSchema)