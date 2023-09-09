const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')


userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, url: 1})
    response.json(users)
})


userRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    if (password.length < 3) {
        return response
            .status(400)
            .send({
                error: "Password is too short"
            })
    }

    try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        response.status(400).send({
            error: "Username is too short"
        })
    }

})


module.exports = userRouter