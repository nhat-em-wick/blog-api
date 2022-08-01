const { registerValidate, loginValidate } = require('../validations/authValidation')
const {createUser, loginUser} = require('../services/authService')

const authController = {
  register: async (req, res, next) => {
    try{
      const {error} = registerValidate(req.body)
      if(error) {
        return next({status: 400, message: error.details[0].message})
      }
      const {errorRegister, user} = await createUser(req.body)
      if(errorRegister && !user) {
        return next({status: errorRegister.status, message: errorRegister.message})
      }
      res.status(201).json({
        element: user,
        code: 201,
        message: 'success'
      })
    }catch(error) {
      console.log(`Error ::: ${error}`)
      return next({status: 500, message: error})
    }
  },
  login: async (req, res, next) => {
    try{
      const {error} = loginValidate(req.body)
      if(error) {
        return next({status: 400, message: error.details[0].message})
      }
      const {user, errorLogin} = await loginUser(req.body)
      if(errorLogin && !user) {
        return next({status: errorLogin.status, message: errorLogin.message})
      }
      res.status(200).json({
        element: user,
        code: 200,
        message: 'success'
      })
    }catch(error) {
      console.error(`Error ::: ${error}`)
      next({status: 500, message: 'Error login'})
    }
  }
}

module.exports = authController