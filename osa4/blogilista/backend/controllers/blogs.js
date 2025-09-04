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

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  const update = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, update, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedBlog) => {
      if (updatedBlog) {
        response.json(updatedBlog)
      } else {
        response.status(404).json({ error: 'blog not found' })
      }
    })
    .catch((error) => next(error))
})

module.exports = blogsRouter
