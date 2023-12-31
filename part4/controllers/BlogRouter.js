const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.status(200).json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    const user = request.user

    if(!user) {
        return response.status(401).json({ error: 'token is missing or invalid' })
    }

    const blog = new Blog({
        title: body.title,
        author: user.name,
        likes: body.likes || 0,
        url: body.url,
        user: user.id
    })

    if (blog.title && blog.url) {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        user.save()
        response.status(201).json(savedBlog)
    } else {
        response.status(400).end()
    }
})

blogRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    console.log(blog)

    if (!blog) {
        return response.status(204).end()
    }

    if (user.id.toString() === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).end()
    }
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
})



module.exports = blogRouter