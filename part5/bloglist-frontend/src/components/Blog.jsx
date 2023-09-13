import { useState } from 'react'

const Blog = ({ blog, loggedUser, handleBlogDelete, handleLike }) => {
  const blogStyle = {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 10,
  }
  const [fullInfo, setFullInfo] = useState(false)

  const deleteButton = () => {
    if (blog.user.username === loggedUser) {
      return (
        <button onClick={() => handleBlogDelete(blog)}>delete</button>
      )
    }
  }

  return (
    <div style={blogStyle}>
      {fullInfo ? (
        <div>
          <div>
            <button onClick={() => setFullInfo(!fullInfo)}>{fullInfo ? 'hide' : 'view'}</button>
            <p>Title: {blog.title}</p>
            <p>Author: {blog.author}</p>
            <p>Url: {blog.url}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <p>Likes: {blog.likes}</p>
              <button onClick={() => handleLike(blog)}>Like</button>
            </div>
          </div>
          {deleteButton()}
        </div>
      ) : (
        <div>
                    Title: {blog.title} | Author: {blog.author}
          <button onClick={() => setFullInfo(!fullInfo)}>{fullInfo ? 'hide' : 'view'}</button>
        </div>
      )}
    </div>
  )
}

export default Blog