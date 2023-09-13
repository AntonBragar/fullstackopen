import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.jsx'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [addNewBlog, setAddNewBlog] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      setNotification({
        text: 'Successfully LogIn',
        type: 'notification'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({
        text: 'Wrong Credentials',
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)

      setUsername('')
      setPassword('')
    }
  }

  const handleLogOut = () => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      window.localStorage.removeItem('loggedUser')
      setUser(null)
      setNotification({
        text: 'Successful exit',
        type: 'notification'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      blogService.setToken(null)
    } else {
      setNotification({
        text: 'Something went wrong',
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    const likedBlog = await blogService.like(blog)
    setBlogs(
      blogs.map(blog =>
        blog.id === likedBlog.id
          ? { ...blog, likes: likedBlog.likes }
          : blog
      )
    )
  }

  const handleBlogDelete = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog)
      setBlogs(
        blogs.filter(currentBlog => currentBlog.id !== blog.id)
      )
    }
  }

  const blogsToShow = blogs.slice().sort((blogA, blogB) => blogB.likes - blogA.likes)

  return (
    <div>
      <Notification notification={notification}/>
      <h2>blogs</h2>
      {!user ? <div>
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div> : <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h3>{user.name} logged in</h3>
          <button onClick={handleLogOut}>logout</button>
        </div>
      </div>}
      <button onClick={() => setAddNewBlog(!addNewBlog)}>add blog</button>
      {user && addNewBlog ?
        <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} addNewBlog={addNewBlog}
          setAddNewBlog={setAddNewBlog}/> : null}
      {blogsToShow.map(blog =>
        <Blog key={blog.id} blog={blog} loggedUser={user.username} handleLike={handleLike} handleBlogDelete={handleBlogDelete}/>
      )}
    </div>
  )
}

export default App