require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const PORT = process.env.PORT || 4000

// Creating express app
const app = express()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

//Routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// Connect to DB
mongoose
	.connect(process.env.DB_CONNECTION_URI)
	.then(() => {
		console.log('Connected to DB')
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`)
		})
	})
	.catch((err) => {
		console.log(err)
	})
