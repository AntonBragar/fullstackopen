import React from 'react'
import '@testing-library/jest-dom'
import { render, screen  } from '@testing-library/react'
import Blog from './Blog'

test('Blog renders the blog\'s title and author, but does not render its url or number of likes by default.', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog Author',
    url: 'google.com',
    likes: 3
  }
  const loggedUser = ''
  const handleBlogDelete = () => null
  const handleLike = () => null

  const component = render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      handleBlogDelete={handleBlogDelete}
      handleLike={handleLike}
    />
  )

  expect(component.container).toHaveTextContent(
    'Blog title'
  )
  expect(component.container).toHaveTextContent(
    'Blog Author'
  )
  expect(component.container).not.toHaveTextContent(
    'google.com'
  )
  expect(component.container).not.toHaveTextContent(
    3
  )
})


test('Just a test if blog container available', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog Author',
    url: 'google.com',
    likes: 3
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.blog-container')
  screen.debug(div)
  expect(div).toBeDefined()
})