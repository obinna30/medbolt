const jwt = require('jsonwebtoken')
const db = require('../models')
const {User} = db

const checkIsLogin = async (req, res, next) => {
  const header = req.headers.authorization
  if (typeof header !== 'undefined') {
    const bearer = header.split(' ')
    const token = bearer[1]

    req.token = token
  } else {
    return res.json({
      status: 'forbidden',
      message: 'headers Not set JWT token',
    })
  }

  try {
    const jwtPayload = jwt.verify(req.token, process.env.JWT_SECRET)
    const user = await User.findByPk(jwtPayload.id)
    req.user = user
    next()
  } catch (err) {
    return res.json({
      status: 'forbidden',
      message: 'wrong JWT token or token expired，Please log in to get a newly issued JWT token',
    })
  }
}

const checkIsAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.role === 'admin') {
      return next()
    }
    return res.json({ status: 'error', message: 'Access permissions are not enough' })
  } else {
    return res.json({
      status: 'error',
      message: 'Please log in',
    })
  }
}

module.exports = { checkIsLogin, checkIsAdmin }
