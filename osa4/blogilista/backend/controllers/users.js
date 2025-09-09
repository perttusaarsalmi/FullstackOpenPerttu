const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const body = request.body

  if (!body.user || !body.password) {
    return response.status(400).json({ error: 'Username and password are required' })
  }
  const blog = new User(body)
  const savedUser = await blog.save()
  response.status(201).json(savedUser)
})


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
