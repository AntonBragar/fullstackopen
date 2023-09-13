import React, { useState } from 'react'
import blogService from '../services/blogs.js'

const BlogForm = ({ blogs, setBlogs, setNotification, addNewBlog, setAddNewBlog }) => {

  const [newPost, setNewPost] = useState({
    title: '',
    author: '',
    url: ''
  })

  const createBlog = (event) => {
    event.preventDefault()
    if (newPost.title && newPost.author && newPost.url) {
      blogService.create(newPost).then(r => {
        setNotification({
          text: `a new blog ${r.title} by ${r.author} has been added`,
          type: 'notification'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)

        setBlogs([...blogs, r])

        setNewPost({
          title: '',
          author: '',
          url: ''
        })
      })
      setAddNewBlog(!addNewBlog)
    } else {
      setNotification({
        text: 'Some of data is missing',
        type: 'error'
      })

      setTimeout(() => {
        setNotification(null)
      }, 5000)

      setAddNewBlog(!addNewBlog)
    }
  }
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={createBlog}>
        <div>
                    title
          <input
            type="text"
            value={newPost.title}
            name="Title"
            onChange={({ target }) => setNewPost({ ...newPost, title: target.value })}
          />
        </div>
        <div>
                    author
          <input
            type="text"
            value={newPost.author}
            name="Author"
            onChange={({ target }) => setNewPost({ ...newPost, author: target.value })}
          />
        </div>
        <div>
                    url
          <input
            type="text"
            value={newPost.url}
            name="Url"
            onChange={({ target }) => setNewPost({ ...newPost, url: target.value })}
          />
        </div>
        <button>Create</button>
        <button onClick={() => setAddNewBlog(!addNewBlog)}>Cancel</button>
      </form>
    </div>
  )
}

export default BlogForm