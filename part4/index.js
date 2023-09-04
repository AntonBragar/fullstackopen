require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require("./controllers/BlogRouter");
const middleware = require('./utils/middleware')

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.json())
app.use(cors())
// app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

morgan.token('content', (request) =>
	request.method === 'POST' && request.body.title
		? JSON.stringify(request.body)
		: null
)

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

const PORT = config.PORT
app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`)
})