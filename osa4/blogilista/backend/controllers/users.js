const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({
      error:
        'Password is required and it should be at least three characters long',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      // Handle duplicate username error
      return response.status(400).json({ error: 'Username must be unique' })
    } else if (error.name === 'ValidationError') {
      // Handle validation errors
      return response.status(400).json({ error: error.message })
    } else {
      // Handle other unknown errors
      return response.status(500).json({ error: 'An unknown error occurred' })
    }
  }
})

module.exports = usersRouter
