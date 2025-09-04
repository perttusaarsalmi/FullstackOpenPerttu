const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  if (body.likes === null) {
    body.likes = 0
  }
  const blog = new Blog(body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
