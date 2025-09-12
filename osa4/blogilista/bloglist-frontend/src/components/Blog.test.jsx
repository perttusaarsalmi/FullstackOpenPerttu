import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'testTitle',
    author: 'PS',
    url: 'https://fi.wikipedia.org/wiki/Ohjelmointi',
    likes: 2,
    user: {
      username: 'PerttuS',
      name: 'superUser',
      id: '68c02202ead2e43840efc74f',
    },
    id: '68c2adc9f10af560f98cf9e4',
  }

  const user = {
    username: 'PerttuS',
    name: 'superUser',
    id: '68c02202ead2e43840efc74f',
  }

  render(<Blog blog={blog} user={user} />)
  screen.debug()
  const titleElement = screen.getByText('testTitle', { exact: false })
  const authorElement = screen.getByText('PS', { exact: false })
  expect(titleElement).toBeVisible()
  expect(authorElement).toBeVisible()

  const urlElement = screen.queryByText(
    'https://fi.wikipedia.org/wiki/Ohjelmointi'
  )
  expect(urlElement).toBeNull()
  const likesElement = screen.queryByText('2')
  expect(likesElement).toBeNull()
  expect(screen.queryByText(blog.user.name)).toBeNull()
})

test('renders content', async () => {
  const blog = {
    title: 'testTitle2',
    author: 'PS',
    url: 'https://fi.wikipedia.org/wiki/Ohjelmointi',
    likes: 2,
    user: {
      username: 'PerttuS',
      name: 'superUser',
      id: '68c02202ead2e43840efc74f',
    },
    id: '68c2adc9f10af560f98cf9e4',
  }

  const user = {
    username: 'PerttuS',
    name: 'superUser',
    id: '68c02202ead2e43840efc74f',
  }

  render(<Blog blog={blog} user={user} />)

  const userMock = userEvent.setup()
  const viewButton = screen.getByText('view')
  await userMock.click(viewButton)

  expect(screen.getByText(blog.url)).toBeVisible()
  expect(screen.getByText(`${blog.likes}`)).toBeVisible()
  expect(screen.getByText(blog.user.name)).toBeVisible()
})
