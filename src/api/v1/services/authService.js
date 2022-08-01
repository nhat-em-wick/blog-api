const _User = require('../models/userModel')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const signAccessToken = async (data) => {
  const payload = data
  const secret = process.env.JWT_SECRET
  const option = {
    expiresIn: '1h'
  }
  try{
    return await JWT.sign(payload, secret, option)
  }catch(error) {
    console.error(`Error ::: ${error}`)
  }
}

const createUser = async ({name, email, password}) => {
  const isExist = await _User.findOne({email})
  if(isExist) {
    return {
      errorRegister: {
        status: 400,
        message: "email is exist!!!"
      },
      user: null
    }
  } 
  const user = await _User.create({name, email, password})
  return {
    errorRegister: null,
    user: user
  }
}

const loginUser = async ({email, password}) => {
  const user = await _User.findOne({email})
  if(!user) {
    return {
      errorLogin: {
        status: 404,
        message: "user not registered"
      },
      user: null
    }
  }
  const comparePass = await bcrypt.compare(password, user.password)
  if(!comparePass) {
    return {
      errorLogin: {
        status: 404,
        message: "Password is wrong"
      },
      user: null
    }
  }

  const accessToken = await signAccessToken({
    id: user._id,
    name: user.name
  })


  return {
    errorLogin: null,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
      access_token: accessToken
    },
  }

}

module.exports = {
  createUser,
  loginUser
}