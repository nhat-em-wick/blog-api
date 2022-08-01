const JWT = require('jsonwebtoken')

const verify = async (req, res, next) => {
  if(!req.headers['authorization']) {
    return next({status: 401, message: 'Unauthorized'})
  }
  const token = req.headers['authorization'].split(' ')[1]
  try{
    const payload = await JWT.verify(token, process.env.JWT_SECRET)
    req.user = payload
    next()
  }catch(error) {
    return next({status: 401, message: 'Unauthorized'})
  }
}

module.exports = verify
