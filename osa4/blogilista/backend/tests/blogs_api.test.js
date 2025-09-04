const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert') // Import assert
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObject = helper.biggerListOfBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)
})
describe('GET blog list backend tests', () => {
  test('blogs are returned as json and the amount is corect', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, 6) // Replace 5 with the expected number of blogs
  })
  test('test that the objects from database have a correct id identifier', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      assert.ok(blog.id, 'Blog should have an "id" property')
      assert.strictEqual(
        blog._id,
        undefined,
        'Blog should not have an "_id" property'
      )
    })
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Pertun blogi',
      author: 'Perttu Saarsalmi',
      url: 'höpöhöpö2.org',
      likes: 1001,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.biggerListOfBlogs.length + 1)

    const contents = blogsAtEnd.map((n) => n.title)
    assert(contents.includes('Pertun blogi'))
  })
  test('the value of the likes is zero if not given in POST', async () => {
    const newBlog = {
      title: 'Pertun blogi 2',
      author: 'Perttu Saarsalmi',
      url: 'höpöhöpö2.org',
      likes: null,
    }
    await api.post('/api/blogs').send(newBlog)
    const addedBlog = (await helper.blogsInDb()).find(
      (blog) => blog.title === 'Pertun blogi 2'
    )
    assert.strictEqual(addedBlog.likes, 0)
  })
  test('adding a new blog without url or title throws bad request error', async () => {
    const newBlog = {
      title: '',
      author: 'Perttu Saarsalmi',
      url: 'höpöhöpö2.org',
      likes: null,
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
    const anotherBlog = {
      title: 'Pertun blogi 3',
      author: 'Perttu Saarsalmi',
      url: '',
      likes: null,
    }
    await api.post('/api/blogs').send(anotherBlog).expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})
