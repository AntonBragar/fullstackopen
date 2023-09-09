const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/Blog')
const User = require("../models/User");
const bcrypt = require("bcrypt");

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }

    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({username: 'root', passwordHash})

    await user.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('Canonical string reduction')
}, 10000)

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
        'Canonical string reduction'
    )
}, 10000)

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'New Blog for test',
        author: 'Anton Brahar',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 0,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain('New Blog for test')
}, 10000)

test('a blog create with missing likes property', async () => {
    const newBlog = {
        title: 'New Blog for test',
        author: 'Anton Brahar',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const likes = blogs.map(blog => Number(blog.likes))
    expect(likes).toContain(0)
}, 10000)

test('a blog created with empty title or url responds with 400 status', async () => {

    const user = await helper.usersInDb()

    const newBlog = {
        title: "",
        author: user.name,
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 42,
        user: user.id
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
}, 10000)

test('a blog without title can not be added', async () => {
    const newBlog = {
        title: '',
        author: 'Anton Brahar',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 0,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
}, 10000)

test('is ID written in `id` field instead of `_id`', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('delete post by id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const idToDelete = blogsAtStart[0].id

    await api
        .delete(`/api/blogs/${idToDelete}`)
        .expect(204)

    const blogAtEnd = await helper.blogsInDb()
    expect(blogAtEnd).toHaveLength(blogsAtStart.length - 1)
})

test('Updating likes in post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 100

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(r => r.likes)

    expect(contents).toContain(100)
}, 10000)

afterAll(async () => {
    await mongoose.connection.close()
})